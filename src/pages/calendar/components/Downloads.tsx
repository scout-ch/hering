import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronDown, faFileCsv, faFileExcel, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { downloadAsCsv } from "./download-csv";
import { downloadAsIcs } from "./download-ics";
import DropdownButton from "../../../components/dropdown-button/DropdownButton";
import { type CalendarTask } from "./CalendarForm";

type Props = {
    startDate: Date,
    tasks: CalendarTask[],
    designation: string
}

const downloadOptionStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.8em',
    justifyContent: 'space-between'
}

function Downloads({ startDate, tasks, designation }: Props) {

    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const [isGenerating, setIsGenerating] = useState(false)

    const fixedDesignation = (designation ?? '').length > 0
        ? designation
        : t('calendarPage.defaultDesignation')

    const downloadExcel = async () => {
        const filename = t('calendarPage.excel.filename', { calendarDesignation: fixedDesignation })
        // show progress, since loading exceljs can take a moment on slow (mobile) connections
        setIsGenerating(true)
        try {
            // loaded on demand, since exceljs is ~1 MB and can't be tree-shaken
            const { downloadAsExcel } = await import('./download-excel')
            await downloadAsExcel(startDate, tasks, filename)
        } finally {
            setIsGenerating(false)
        }
    }

    return <DropdownButton
        buttonContent={<span>{t('calendarPage.download')} <FontAwesomeIcon icon={isGenerating ? faSpinner : faChevronDown} spin={isGenerating}/></span>}>
        <div
            onClick={() => downloadAsIcs(tasks, lang, fixedDesignation, t('calendarPage.ics.filename', { calendarDesignation: fixedDesignation }))}
            style={downloadOptionStyle}>
            {t('calendarPage.ics.download')} (.ics)
            <FontAwesomeIcon icon={faCalendarDays} fixedWidth={true}/>
        </div>
        <div
            onClick={downloadExcel}
            style={downloadOptionStyle}>
            {t('calendarPage.excel.download')} (.xlsx)
            <FontAwesomeIcon icon={faFileExcel} fixedWidth={true}/>
        </div>
        <div
            onClick={() => downloadAsCsv(tasks, lang, t('calendarPage.csv.filename', { calendarDesignation: fixedDesignation }))}
            style={downloadOptionStyle}>
            {t('calendarPage.csv.download')} (.csv)
            <FontAwesomeIcon icon={faFileCsv} fixedWidth={true}/>
        </div>
    </DropdownButton>
}

export default Downloads
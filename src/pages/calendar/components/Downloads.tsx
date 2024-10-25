import { useTranslation } from "react-i18next";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronDown, faFileCsv, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { downloadAsExcel } from "./download-excel";
import { downloadAsCsv } from "./download-csv";
import { downloadAsIcs } from "./download-ics";
import DropdownButton from "../../../components/dropdown-button/DropdownButton";
import { TaskT } from "./Task";

type Props = {
    startDate: Date,
    tasks: TaskT[],
    calendarTitlePrefix: string
}

const downloadOptionStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.8em',
    justifyContent: 'space-between'
}

function Downloads({ startDate, tasks, calendarTitlePrefix }: Props) {

    const { t } = useTranslation()

    const spacedCalendarPrefix = (calendarTitlePrefix ?? '').length > 0
        ? calendarTitlePrefix + ' '
        : ''

    return <DropdownButton
        buttonContent={<span>{t('calendarPage.download')} <FontAwesomeIcon icon={faChevronDown}/></span>}>
        <div
            onClick={() => downloadAsIcs(tasks, calendarTitlePrefix, t('calendarPage.ics.filename', { calendarTitlePrefix: spacedCalendarPrefix }))}
            style={downloadOptionStyle}>
            {t('calendarPage.ics.download')} (.ics)
            <FontAwesomeIcon icon={faCalendarDays} fixedWidth={true}/>
        </div>
        <div
            onClick={() => downloadAsExcel(startDate, tasks, t('calendarPage.excel.filename', { calendarTitlePrefix: spacedCalendarPrefix }))}
            style={downloadOptionStyle}>
            {t('calendarPage.excel.download')} (.xlsx)
            <FontAwesomeIcon icon={faFileExcel} fixedWidth={true}/>
        </div>
        <div
            onClick={() => downloadAsCsv(tasks, t('calendarPage.csv.filename', { calendarTitlePrefix: spacedCalendarPrefix }))}
            style={downloadOptionStyle}>
            {t('calendarPage.csv.download')} (.csv)
            <FontAwesomeIcon icon={faFileCsv} fixedWidth={true}/>
        </div>
    </DropdownButton>
}

export default Downloads
import { type ChangeEvent, lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { type Canton, swissHolidaysProvider } from "./swiss-holidays-provider";
import Loading from "../../../components/loading/Loading";
import { useModal } from "../../../components/modal/useModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { format } from "date-fns";
import { sessionCache } from "../../../shared/session-cache";
import './holiday-select-modal.less'
import DOMPurify from 'dompurify';
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const Error = lazy(() => import('../../../components/error/Error.tsx'));

export interface HolidayModalResultData {
    selectedDate: string;
}

const selectedCantonCodeCacheKey = 'selected-canton'
const selectedYearCacheKey = 'selected-year'

const getSuggestedYear = (): number => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Months are 0-based...

    // Assume that in and after October, the next year is more relevant to the user
    return currentMonth < 9
        ? currentYear
        : currentYear + 1;
}

function HolidaySelectModal() {

    const suggestedYear = getSuggestedYear();
    const maxYear = suggestedYear + 10;
    const minYear = 2020; // OpenHolidays API provides Swiss data from 2020 onwards

    const { t } = useTranslation()
    const { close, cancel } = useModal()

    const [selectedCanton, setSelectedCanton] = useState<Canton | null>(null)
    const [selectedYear, setSelectedYear] = useState<number>(suggestedYear)

    const cantons = useQuery({
        queryKey: ['openholidays:cantons'],
        queryFn: async () => await swissHolidaysProvider.loadCantons()
    })

    const holidays = useQuery({
        queryKey: ['openholidays:holidays', selectedYear, selectedCanton],
        queryFn: async () => await swissHolidaysProvider.loadHolidays(selectedYear, selectedCanton),
        enabled: !!selectedCanton && selectedYear >= minYear && selectedYear <= maxYear,
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (!cantons.isSuccess) {
            return;
        }

        const cachedCantonCode = sessionCache.get<string>(selectedCantonCodeCacheKey)
        if (cachedCantonCode) {
            const cachedCanton = cantons.data.find(canton => canton.code === cachedCantonCode)
            if (cachedCanton) {
                setSelectedCanton(cachedCanton)
            }
        }

        const cachedYear = sessionCache.get<number>(selectedYearCacheKey)
        if (cachedYear) {
            setSelectedYear(cachedYear)
        }
    }, [cantons.isSuccess])

    useEffect(() => {
        if (!selectedCanton
            || selectedYear < minYear
            || selectedYear > maxYear) {
            return
        }

        sessionCache.set(selectedCantonCodeCacheKey, selectedCanton?.code);
        sessionCache.set(selectedYearCacheKey, selectedYear);
    }, [selectedYear, selectedCanton]);

    const onCantonChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!cantons.isSuccess) {
            return;
        }

        const newResponsible = e.currentTarget.value
        const selectedCanton = cantons.data.find(canton => canton.code === newResponsible) || null
        setSelectedCanton(selectedCanton)
    }

    const onYearChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newYear = parseInt(e.currentTarget.value) || suggestedYear;
        setSelectedYear(newYear)
    }

    const selectDate = (selectedDate: string) => {
        close<HolidayModalResultData>({ selectedDate })
    }

    if (cantons.isPending) {
        return <Loading/>
    }

    if (cantons.isError) {
        return <Suspense><Error error={cantons.error}/></Suspense>
    }

    return <>
        <div className="md-header">
            <h3>{t('holidaysModal.title')}</h3>
        </div>
        <div className="md-content">
            <div className="holiday-selection">
                <div>{t('holidaysModal.description')}</div>

                <div className="filter">
                    <div className='form-entry'>
                        <label htmlFor={"responsible"}>{t('holidaysModal.canton')}</label>
                        <select name="responsible" id="responsible"
                                value={selectedCanton?.code ?? "DEFAULT"}
                                onChange={onCantonChanged}>
                            <option disabled value="DEFAULT">{t('holidaysModal.selectCanton')}</option>
                            {cantons.data.map(canton => (
                                <option key={canton.code}
                                        value={canton.code}>
                                    {canton.name} ({canton.shortName})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-entry'>
                        <label htmlFor={"responsible"}>{t('holidaysModal.year')}</label>
                        <input type="number" id="year" name="year" value={selectedYear} min={minYear}
                               max={maxYear}
                               onChange={onYearChanged}/>
                    </div>
                </div>

                {selectedCanton && holidays.isSuccess && (
                    <div className="table-overflow">
                        <table className="holidays">
                            <thead>
                            <tr>
                                <th className="date">{t('holidaysModal.from')}</th>
                                <th className="date">{t('holidaysModal.to')}</th>
                                <th>{t('holidaysModal.type')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {holidays.data.map(holiday => (
                                <tr key={holiday.id}>
                                    <td>
                                        <a className="cursor-pointer" onClick={() => selectDate(holiday.startDate)}>
                                            {format(holiday.startDate, 'EEEEEE, dd.MM.yyyy')}
                                        </a>
                                    </td>
                                    <td>
                                        <a className="cursor-pointer" onClick={() => selectDate(holiday.endDate)}>
                                            {format(holiday.endDate, 'EEEEEE, dd.MM.yyyy')}
                                        </a>
                                    </td>
                                    <td className="type">
                                        <span>{holiday.name}</span>
                                        {holiday.comment.length > 0 &&
                                            <span className="icon">
                                                <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id={holiday.id}/>
                                                <Tooltip id={holiday.id}>
                                                    {holiday.comment}
                                                </Tooltip>
                                            </span>
                                        }
                                    </td>
                                </tr>
                            ))}
                            {holidays.data.length === 0 && (
                                <tr>
                                    <td colSpan={3}>{t('holidaysModal.noResults')}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}

                {holidays.isLoading && <Loading subtext="Ferien werden geladen..."/>}
                {holidays.isError && <Suspense><Error error={holidays.error}/></Suspense>}
            </div>
        </div>
        <div className="md-footer">
            <button className="btn" onClick={cancel}>{t('holidaysModal.close')}</button>

            <div className="data-hint"
                 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t('holidaysModal.dataHint')) }}></div>
        </div>
    </>;
}

export default HolidaySelectModal
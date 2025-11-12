import { type ChangeEvent, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CalendarTable from './CalendarTable';
import { addDays, format, isValid, parse, startOfDay } from "date-fns";
import Loading from "../../../components/loading/Loading";
import { type HApiRole, type HApiTask, type HApiTaskChapter, loadTasks } from "../../../apis/hering-api";
import i18n from "i18next";
import './calendar-form.less'
import { Tooltip } from 'react-tooltip'
import { sessionCache } from "../../../shared/session-cache";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContext } from "../../../components/modal/ModalContext";
import HolidaySelectModal, { type HolidayModalResultData } from "./HolidaySelectModal";
import { useQuery } from "@tanstack/react-query";

const Downloads = lazy(() => import('./Downloads'));

const dateFormat = 'yyyy-MM-dd'
const initialStartDate = format(Date.now(), dateFormat)
const initialResponsible = 'all'
const initialPuffer = 0;

const startDateCacheKey = 'start-date'
const responsibleCacheKey = 'responsible'
const bufferCacheKey = 'buffer'
const calendarDesignationCacheKey = 'calendar-designation'

export type CalendarTask = {
    id: string
    title: string
    deadline: Date
    targets: HApiRole[]
    responsible: HApiRole[]
    chapter: HApiTaskChapter
}

function CalendarForm() {

    const lang = i18n.language
    const { t } = useTranslation()
    const { openModal } = useContext(ModalContext);

    const defaultCalendarDesignation = t('calendarPage.defaultDesignation');

    const isFirstRender = useRef(true);
    const [isUpdatingTasks, setIsUpdatingTasks] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<string>(initialStartDate)
    const [parsedStartDate, setParsedStartDate] = useState<Date>(new Date())
    const [responsible, setResponsible] = useState<string>(initialResponsible)
    const [puffer, setPuffer] = useState<number>(initialPuffer)
    const [designation, setDesignation] = useState<string>(defaultCalendarDesignation)
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([])

    const taskList = useQuery({
        queryKey: ['tasks', lang],
        queryFn: async () => await loadTasks(lang)
    })

    const onStartDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.currentTarget.value
        updateStartDate(newStartDate)
    }

    const updateStartDate = (newStartDate: string) => {
        setStartDate(newStartDate)
        sessionCache.set(startDateCacheKey, newStartDate)
    }

    const onResponsibleeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        updateResponsible(e.currentTarget.value)
    }

    const updateResponsible = (newResponsible: string) => {
        setResponsible(newResponsible)
        sessionCache.set(responsibleCacheKey, newResponsible);

        const reponsibleSelect = document.getElementById('responsible')
        if (newResponsible === 'all') {
            reponsibleSelect?.classList.remove('highlight')
        } else {
            reponsibleSelect?.classList.add('highlight')
        }
    }

    const onBufferChanged = (e: ChangeEvent<HTMLInputElement>) => {
        updatePuffer(parseInt(e.currentTarget.value) || initialPuffer)
    }

    const updatePuffer = (newPuffer: number) => {
        setPuffer(newPuffer)
        sessionCache.set(bufferCacheKey, newPuffer);

        const pufferInput = document.getElementById('puffer')
        if (newPuffer === 0) {
            pufferInput?.classList.remove('highlight')
        } else {
            pufferInput?.classList.add('highlight')
        }
    }

    const onDesignationChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrefix = e.currentTarget.value
        setDesignation(newPrefix)
        sessionCache.set(calendarDesignationCacheKey, newPrefix);
    }

    const openHolidaysModal = async () => {
        const result = await openModal<HolidayModalResultData>(HolidaySelectModal, {}, { isWide: true });
        if (result.isCancelled || !result.data?.selectedDate) {
            return
        }

        updateStartDate(result.data.selectedDate)
    };

    useEffect(() => {
        const parsedStartDate = parse(startDate, dateFormat, Date.now())
        const isValidDate = isValid(parsedStartDate)
        if (isValidDate) {
            setParsedStartDate(parsedStartDate)
        }
    }, [startDate])

    useEffect(() => {
        const isValidDate = isValid(parsedStartDate)
        if (!isValidDate || !taskList.isSuccess) {
            return
        }

        // Introduce artificial loading time so that the user sees that something is updating
        setIsUpdatingTasks(true);

        const filteredTasks = (taskList.data || []).filter((task: HApiTask) =>
            responsible === 'all'
            || task.responsible.some(r => r.abbreviation === responsible))

        const tasks = filteredTasks
            .map((task: HApiTask) => {
                const dayOffsetFromStartDate = task.daysOffset < 0
                    ? task.daysOffset - puffer
                    : task.daysOffset

                const deadline = task.daysOffset !== -1000
                    ? startOfDay(addDays(parsedStartDate, dayOffsetFromStartDate))
                    : new Date(parsedStartDate.getFullYear(), 0, 1)

                return {
                    id: task.documentId,
                    deadline: deadline,
                    title: task.title,
                    targets: task.targets,
                    responsible: task.responsible,
                    chapter: task.chapter
                } as CalendarTask
            })
            .sort((a: CalendarTask, b: CalendarTask) => a.deadline.getTime() - b.deadline.getTime())

        // Update calendarTasks after the pseudo loading time
        const delay = isFirstRender.current ? 0 : 500;
        isFirstRender.current = false;
        setTimeout(() => {
            setCalendarTasks(tasks)
            setIsUpdatingTasks(false)
        }, delay)
    }, [parsedStartDate, responsible, puffer, taskList.isSuccess]);

    useEffect(() => {
        const startDate = sessionCache.get<string>(startDateCacheKey);
        setStartDate(startDate || initialStartDate)

        const responsible = sessionCache.get<string>(responsibleCacheKey);
        updateResponsible(responsible || initialResponsible)

        const buffer = sessionCache.get<number>(bufferCacheKey);
        updatePuffer(buffer || 0)

        const calendarPrefix = sessionCache.get<string>(calendarDesignationCacheKey);
        setDesignation(calendarPrefix || t('calendarPage.defaultDesignation'))

        return () => {
            isFirstRender.current = true;
        }
    }, []);

    return (
        <div className="calendar-form">
            <div className="filter">
                <form className="filter-inputs">
                    <div className="form-entry">
                        <label htmlFor="startDate">
                            {t('calendarPage.startDate')}
                        </label>
                        <input id="startDate" type="date" name="startDate" value={startDate}
                               onChange={onStartDateChanged}/>
                        <a className="cursor-pointer" onClick={openHolidaysModal}>
                            {t('calendarPage.viewHolidays')}
                        </a>
                    </div>

                    <div className="form-entry">
                        <label htmlFor={"responsible"}>
                            {t('calendarPage.responsible')}
                        </label>
                        <select id="responsible" name="responsible" value={responsible}
                                onChange={onResponsibleeChanged}>
                            <option value="all">{t('calendarPage.responsibleOptions.all')}</option>
                            <option value="LL">{t('calendarPage.responsibleOptions.ll')}</option>
                            <option value="AL">{t('calendarPage.responsibleOptions.al')}</option>
                            <option value="C">{t('calendarPage.responsibleOptions.c')}</option>
                        </select>
                    </div>

                    <div className="form-entry">
                        <div className="label-with-icon">
                            <label htmlFor={"puffer"}>
                                {t('calendarPage.puffer')}
                            </label>
                            <div>
                                <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id="buffer-tooltip"/>
                                <Tooltip id="buffer-tooltip">
                                    <div style={{ maxWidth: '200px' }}>
                                        {t('calendarPage.pufferDescription')}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <input id="puffer" type="number" name="puffer" value={puffer.toString()} min="0"
                               onChange={onBufferChanged}/>
                    </div>

                    <div className="form-entry">
                        <div className="label-with-icon">
                            <label htmlFor="calendar-designation">
                                {t('calendarPage.designation')}
                            </label>
                            <div>
                                <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id="designation-tooltip"/>
                                <Tooltip id="designation-tooltip">
                                    <div style={{
                                        maxWidth: '200px'
                                    }}>
                                        {t('calendarPage.designationDescription')}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="input">
                            <input type='text' name='calendar-designation' id="calendar-designation"
                                   value={designation}
                                   onChange={onDesignationChanged}/>
                        </div>
                    </div>
                </form>
            </div>

            <div className='download'>
                <Suspense fallback={<></>}>
                    <Downloads startDate={parsedStartDate} tasks={calendarTasks} designation={designation}/>
                </Suspense>
            </div>

            {taskList.isSuccess
                ? <CalendarTable tasks={calendarTasks} prefix={designation} isUpdating={isUpdatingTasks}/>
                : <Loading/>
            }
        </div>
    );
}

export default CalendarForm
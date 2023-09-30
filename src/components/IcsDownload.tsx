import React from 'react'
import styled from '@emotion/styled';
import { withTranslation } from 'react-i18next'
import { TaskT } from './Task'
import { ChapterT } from './Chapter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const A = styled.a`
  border: none;
  color: white;
  background: var(--color-primary-light);
  padding: 0.3em;
  border-radius: 4px;
  
  &:hover {
    color: white;
    opacity: 0.5;
  }
`

type Props = {
  t: any
  tasks: Array<TaskT>
  calendarTitlePrefix: string
}

function buildDescription(task: TaskT): string {
  return task.chapters.map((chapter: ChapterT) => {
    return chapter.slug_with_section
  }).join(',')
}
function buildLinks(task: TaskT): string {
  return task.chapters.map((chapter: ChapterT) => {
    return 'http://hering.scout.ch/hering/#/' + chapter.slug_with_section
  }).join(',')
}

function generateIcs(tasks: Array<TaskT>, calendarTitlePrefix: string) {
  const ics = require('ics')

  const events = tasks.map(function (task) {
    const deadline = task.deadline
    const alarms = []
    alarms.push({
      action: 'display',
      description: buildDescription(task),
      trigger: { hours: 1, before: true },
    })

    return {
      start: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
      end: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
      title: `${calendarTitlePrefix} ${task.title}`,
      description: buildLinks(task),
      url: buildLinks(task),
      status: 'CONFIRMED',
      busyStatus: 'FREE',
      alarms: alarms
    }
  })

  return ics.createEvents(events, (error: any, value: any) => {
    if (error) {
      console.log(error)
      return
    }
    return value
  })
}

function downloadIcs(mouseClickEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>, tasks: TaskT[], calendarTitlePrefix: string) {
  const value = generateIcs(tasks, calendarTitlePrefix)
  const data = new Blob([value], { type: 'text/calendar' });
  const link = window.URL.createObjectURL(data);

  mouseClickEvent.currentTarget.href = link;
}

function IcsDownload(props: Props) {
  const { t } = props;

  if (props.tasks[0]) {
    return (
      <div className='calendar-ics'>
        <A className="ics_download" id="link" download={t('calendarPage.ics.filename')} onClick={e => downloadIcs(e, props.tasks, props.calendarTitlePrefix)}>
          <i><FontAwesomeIcon icon="calendar" /> </i> 
          {t('calendarPage.ics.download')}
        </A>
      </div>
    );
  }
  return <div></div>
}

export default withTranslation()(IcsDownload)
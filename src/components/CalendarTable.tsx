import React from 'react'
import { withTranslation } from 'react-i18next';
import IcsDownload from './IcsDownload';
import Task, { TaskT } from './Task';

type Props = {
  t: any
  tasks: Array<TaskT>
}

function CalendarTable(props: Props) {
  const { t, tasks } = props;
  const taskList = tasks.map(function (task) {
    return <Task deadline={task.deadline} key={task.title} title={task.title}
      targets={task.targets} responsible={task.responsible} chapters={task.chapters}></Task>
  })
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>{t('calendarPage.table.when')}</td>
            <td>{t('calendarPage.table.what')}</td>
            <td>{t('calendarPage.table.who')}</td>
            <td>{t('calendarPage.table.target')}</td>
            <td>{t('calendarPage.table.chapters')}</td>
          </tr>
        </thead>
        <tbody>
          {taskList}
        </tbody>
      </table>
      <IcsDownload tasks={tasks}></IcsDownload>
    </div>
  );
}

export default withTranslation()(CalendarTable)
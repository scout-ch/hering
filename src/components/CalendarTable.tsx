import React from 'react'
import { withTranslation } from 'react-i18next';
import IcsDownload from './IcsDownload';
import Todo, { TodoT } from './Todo';

type Props = {
  t: any
  todos: Array<TodoT>
}

function CalendarTable(props: Props) {
  const { t, todos } = props;
  const todoList = todos.map(function (todo) {
    return <Todo deadline={todo.deadline} key={todo.title} title={todo.title}
      targets={todo.targets} responsible={todo.responsible} chapters={todo.chapters}></Todo>
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
          {todoList}
        </tbody>
      </table>
      <IcsDownload todos={todos}></IcsDownload>
    </div>
  );
}

export default withTranslation()(CalendarTable)
import React from 'react'
import { withTranslation } from 'react-i18next'
import { TodoT } from './Todo'

type Props = {
  t: any
  todos: Array<TodoT>
}

function generateIcs(todos: Array<TodoT>) {
  const ics = require('ics')

  const events = todos.map(function (todo) {
    const deadline = todo.deadline
    return {
      start: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
      end: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
      title: todo.title,
      status: 'CONFIRMED',
      busyStatus: 'FREE'
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


function IcsDownload(props: Props) {

  if (props.todos[0]) {
    const value = generateIcs(props.todos)
    console.log(value)
    const data = new Blob([value], { type: 'text/calendar' });
    const link = window.URL.createObjectURL(data);
    return (
      <div>
        <a id="link" href={link}>blaaa</a>
      </div>
    );
  }
  return <div></div>
}

export default withTranslation()(IcsDownload)
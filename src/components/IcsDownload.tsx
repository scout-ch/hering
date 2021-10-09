import React from 'react'
import styled from '@emotion/styled';
import { withTranslation } from 'react-i18next'
import { TodoT } from './Todo'

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

const Container = styled.div`
  margin: 1em 0;
`

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
  const { t } = props;

  if (props.todos[0]) {
    const value = generateIcs(props.todos)
    console.log(value)
    const data = new Blob([value], { type: 'text/calendar' });
    const link = window.URL.createObjectURL(data);
    return (
      <Container>
        <A className="ics_download" id="link" href={link}>{t('calendarPage.download')}</A>
      </Container>
    );
  }
  return <div></div>
}

export default withTranslation()(IcsDownload)
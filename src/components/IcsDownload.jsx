import React from 'react'


class IcsDownload extends React.Component {

  generateIcs(todos) {
    const ics = require('ics')

    const events = todos.map(function (todo) {
      const props = todo.props
      const deadline = props.deadline
      return {
        start: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
        end: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
        title: props.task.title.de,
        status: 'CONFIRMED',
        busyStatus: 'FREE'
      }
    })

    return ics.createEvents(events, (error, value) => {
      if (error) {
        console.log(error)
        return
      }
      return value
    })
  }

  render() {
    if (this.props.todos[0]) {
      const value = this.generateIcs(this.props.todos)
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
}

export default IcsDownload
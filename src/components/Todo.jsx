import React from 'react'

class Todo extends React.Component {

  render() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const todo = this.props.task
    const deadline = this.props.deadline.toLocaleDateString('de-DE', options)
    const targets = todo.targets.map((target) => target['label'].toUpperCase()).join(', ')
    const responsible = todo.Verantwortlich.map((responsible) => responsible['label'].toUpperCase()).join(', ')
    return <tr>
        <td>[ ]</td>
        <td>{deadline}</td>
        <td>{todo.title}</td>
        <td>{responsible}</td>
        <td>{targets}</td>
      </tr>

  }
}

export default Todo
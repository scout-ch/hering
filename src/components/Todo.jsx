import React from 'react'

class Todo extends React.Component {

  render() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const todo = this.props.task
    const targets = todo.targets.map((target) => target.toUpperCase()).join(', ')
    const responsible = todo.responsible.map((responsible) => responsible.toUpperCase()).join(', ')
    return <tbody>
      <tr>
        <td>[ ]</td>
        <td>{this.props.deadline.toLocaleDateString('de-DE', options)}</td>
        <td>{todo.title.de}</td>
        <td>{responsible}</td>
        <td>{targets}</td>
      </tr>
    </tbody>

  }
}

export default Todo
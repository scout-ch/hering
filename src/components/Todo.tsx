import React from 'react'
import { Role } from './Chapter';

export type TodoT = {
  deadline: Date
  title: string
  targets: Array<Role>
  responsible: Array<Role>
}

function Todo(props: TodoT) {

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  // @ts-ignore
  const deadline = props.deadline.toLocaleDateString('de-DE', options)
  const targets = props.targets.map((target) => target['rolle'].toUpperCase()).join(', ')
  const responsible = props.responsible.map((responsible) => responsible['rolle'].toUpperCase()).join(', ')
  return <tr>
    <td>[ ]</td>
    <td>{deadline}</td>
    <td>{props.title}</td>
    <td>{responsible}</td>
    <td>{targets}</td>
  </tr>
}

export default Todo
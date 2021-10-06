import React from 'react'
import { Responsible } from './Chapter';

export type TodoT = {
  deadline: Date
  title: string
  targets: Array<Responsible>
  responsible: Array<Responsible>
}

function Todo(props: TodoT) {

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  // @ts-ignore
  const deadline = props.deadline.toLocaleDateString('de-DE', options)
  const targets = props.targets.map((target) => target['label'].toUpperCase()).join(', ')
  const responsible = props.responsible.map((responsible) => responsible['label'].toUpperCase()).join(', ')
  return <tr>
    <td>[ ]</td>
    <td>{deadline}</td>
    <td>{props.title}</td>
    <td>{responsible}</td>
    <td>{targets}</td>
  </tr>
}

export default Todo
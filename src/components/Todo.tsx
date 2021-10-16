import React from 'react'
import { HashLink } from 'react-router-hash-link';
import { ChapterT, Role } from './Chapter';

export type TodoT = {
  deadline: Date
  title: string
  targets: Array<Role>
  responsible: Array<Role>
  chapters: Array<ChapterT>
}

function Todo(props: TodoT) {

  var options = { year: 'numeric', month: 'numeric', day: 'numeric' }

  // @ts-ignore
  const deadline = props.deadline.toLocaleDateString('de-DE', options)
  const targets = props.targets.map((target) => target['rolle']).join(', ')
  const responsible = props.responsible.map((responsible) => responsible['rolle'].toUpperCase()).join(', ')
  const chapters = props.chapters.map(function(chapter) {
      return <li key={chapter.slug}><HashLink to={chapter.section.slug + '#' + chapter.slug}>{chapter.title}</HashLink></li>
  })
  return <tr>
    <td>{deadline}</td>
    <td>{props.title}</td>
    <td>{responsible}</td>
    <td>{targets}</td>
    <td><ul>{chapters}</ul></td>
  </tr>
}

export default Todo
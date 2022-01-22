import React from 'react'
import { withTranslation } from 'react-i18next';
import client from '../client'
import i18n from '../i18n';
import CalendarTable from './CalendarTable';
import { ChapterT } from './Chapter';
import { TodoT } from './Todo';

type Props = {
  t: any
}
type Roles = {
  rolle: string
}

type ApiDates = {
  id: number
  title: string
  days: number
  responsible: Array<Roles>
  targets: Array<Roles>
  chapters: Array<ChapterT>
}

type MyState = {
  startDate: string
  responsible: string
  dateList: Array<ApiDates>,
  todos: Array<TodoT>
}

class CalendarForm extends React.Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      startDate: new Date().toISOString().slice(0, 10),
      responsible: 'all',
      dateList: [],
      todos: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    client.get('/tasks?_locale=' + i18n.language).then((response) => {
      this.setState({ dateList: response.data })
    })
  }

  onChangeStartDate = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ startDate: e.currentTarget.value });
  };

  onChangeResponsible = (e: React.FormEvent<HTMLSelectElement>): void => {
    this.setState({ responsible: e.currentTarget.value });
  };

  handleSubmit(event: any) {
    event.preventDefault();
    const startDate = new Date(this.state.startDate)
    const responsible = this.state.responsible
    
    const filteredDates = this.state.dateList.filter(function (todo) {
      const rollen = todo.responsible.map((resp) => resp.rolle)
      return responsible === 'all' ? true : rollen.includes(responsible)
    });

    const todos = filteredDates.map(function (todo) {
      let deadline = new Date(startDate.getTime() + todo.days * 86400000)
      return {'deadline': deadline, 'key': todo.title, title: todo.title, 'targets': todo.targets, 'responsible': todo.responsible, chapters: todo.chapters}
      // return <Todo deadline={deadline} key={todo.title} title={todo.title} targets={todo.targets} responsible={todo.responsible}></Todo>
    })
    this.setState({ todos: todos })
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            {t('calendarPage.startDate')}
            <input type="date" name="startDate" value={this.state.startDate} onChange={this.onChangeStartDate} />
          </label><br />
          <label>
            {t('calendarPage.responsible')}
            <select name="responsible" value={this.state.responsible} onChange={this.onChangeResponsible}>
              <option value="all">{t('calendarPage.responsibleOptions.all')}</option>
              <option value="LL">{t('calendarPage.responsibleOptions.ll')}</option>
              <option value="AL">{t('calendarPage.responsibleOptions.al')}</option>
              <option value="C">{t('calendarPage.responsibleOptions.c')}</option>
            </select>
          </label>
          <br />
          <button type="submit"> {t('calendarPage.generate')}</button>
        </form>
        <CalendarTable todos={this.state.todos} />
      </div>
    );
  }
}

export default withTranslation()(CalendarForm)
import React from 'react'
import { withTranslation } from 'react-i18next';
// import client from '../client'
import i18n from '../i18n';
import CalendarTable from './CalendarTable';
import { ChapterT } from './Chapter';
import { TaskT } from './Task';
import tasksFR from './../data/tasks/fr.json'
import tasksDE from './../data/tasks/de.json'
import tasksIT from './../data/tasks/it.json'

type Props = {
  t: any
}
type Roles = {
  rolle: string
}

type ApiTask = {
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
  puffer: number
  taskList: Array<ApiTask>,
  tasks: Array<TaskT>
}

class CalendarForm extends React.Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      startDate: new Date().toISOString().slice(0, 10),
      responsible: 'all',
      puffer: 0,
      taskList: [],
      tasks: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // client.get('/tasks?_locale=' + i18n.language).then((response) => {
    //   this.setState({ taskList: response.data })
    // })
    switch (i18n.language) {
      case 'fr':
        // @ts-ignore
        return this.setState({ taskList:  tasksFR})
      case 'de':
        // @ts-ignore
        return this.setState({ taskList:  tasksDE})
      case 'it':
        // @ts-ignore
        return this.setState({ taskList:  tasksIT})
      default:
        // @ts-ignore
        this.setState({ taskList:  tasksDE})
    }
  }

  onChangeStartDate = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ startDate: e.currentTarget.value });
  };

  onChangeResponsible = (e: React.FormEvent<HTMLSelectElement>): void => {
    this.setState({ responsible: e.currentTarget.value });
  };

  onChangePuffer = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ puffer: parseInt(e.currentTarget.value) });
  };

  taskSort = (a: TaskT, b: TaskT) => {
    let aDate = a.deadline
    let bDate = b.deadline
    if (aDate < bDate) {
      return -1
    }
    if (aDate > bDate) {
      return 1
    }

    return 0
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const startDate = new Date(this.state.startDate)
    const responsible = this.state.responsible
    let pufferDays = this.state.puffer || 0

    const filteredDates = this.state.taskList.filter(function (task) {
      const rollen = task.responsible.map((resp) => resp.rolle)
      return responsible === 'all' ? true : rollen.includes(responsible)
    });

    const tasks = filteredDates.map(function (task) {

      let deadline = new Date(startDate.getTime() + (task.days - pufferDays) * 86400000)
      if (task.days === -1000) {
        deadline = startDate
        deadline.setMonth(0)
        deadline.setDate(1)
      }
      return { 'deadline': deadline, 'key': task.title, title: task.title, 
        'targets': task.targets, 'responsible': task.responsible, chapters: task.chapters, t: '' }
    })
    this.setState({ tasks: tasks })
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <div className='calendar-form-container'>
          <form onSubmit={this.handleSubmit}>
            <ul className='calendar-form'>
              <li>
                <label>
                  {t('calendarPage.startDate')}
                </label>
                <input type="date" name="startDate" value={this.state.startDate} onChange={this.onChangeStartDate} />
              </li>
              <li>
                <label>
                  {t('calendarPage.puffer')}
                </label>
                <input type="number" id="puffer" name="puffer" value={this.state.puffer} onChange={this.onChangePuffer} />
              </li>
              <li>
                <label>
                  {t('calendarPage.responsible')}
                </label>
                <select name="responsible" id="responsible" value={this.state.responsible} onChange={this.onChangeResponsible}>
                  <option value="all">{t('calendarPage.responsibleOptions.all')}</option>
                  <option value="LL">{t('calendarPage.responsibleOptions.ll')}</option>
                  <option value="AL">{t('calendarPage.responsibleOptions.al')}</option>
                  <option value="C">{t('calendarPage.responsibleOptions.c')}</option>
                </select>
              </li>
              <li>
                <button type="submit"> {t('calendarPage.generate')}</button>
              </li>
            </ul>
          </form>
        </div>
        <CalendarTable tasks={this.state.tasks.sort(this.taskSort)} />
      </div>
    );
  }
}

export default withTranslation()(CalendarForm)
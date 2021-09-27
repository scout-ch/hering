import React from 'react'
import heringDates from "../data/dates.json";
import Todo from './Todo';
import IcsDownload from './IcsDownload';


class TodoCalculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      responsible: 'all',
      todos: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const startDate = new Date(this.state.startDate)
    const responsible = this.state.responsible

    if (!isNaN(startDate)) {
      const filteredDates = heringDates.filter(function(todo) {
        return responsible === 'all' ? true : todo.responsible.includes(responsible)
      });

      const todos = filteredDates.map(function (todo) {
        let deadline = new Date(startDate.setTime(startDate.getTime() + todo.days * 86400000))
        return <Todo task={todo} deadline={deadline} key={todo.title.de}></Todo>
      })
      this.setState({ todos: todos })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Stardatum:
            <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleInputChange} />
          </label><br />
          <label>
            Verantwortlich:
            <select name="responsible" value={this.state.responsible} onChange={this.handleInputChange}>
              <option value="all">Alle</option>
              <option value="ll">Lagerleitung</option>
              <option value="c">Coach</option>
              <option value="al">Abteilungsleitung</option>
            </select>
          </label>
          <br/>
          <button type="submit" value="Generieren">Generieren</button>
        </form>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Wann</td>
              <td>Was</td>
              <td>Wer</td>
              <td>An wen</td>
            </tr>
          </thead>
          <tbody>
            {this.state.todos}
          </tbody>
        </table>
        <IcsDownload todos={this.state.todos}></IcsDownload>
      </div>
    );
  }
}

export default TodoCalculation
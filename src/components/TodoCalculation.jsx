import React from 'react'
import heringDates from "../data/dates.json";
import Todo from './Todo';


class TodoCalculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      todos: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ startDate: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const startDate = new Date(this.state.startDate)

    if (!isNaN(startDate)) {
      const todos = heringDates.map(function (todo) {
        let deadline = new Date(startDate.setTime(startDate.getTime() + todo.days * 86400000))
        return <Todo task={todo} deadline={deadline}></Todo>
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
            <input type="date" value={this.state.startDate} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
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
          {this.state.todos}
        </table>
      </div>
    );
  }
}

export default TodoCalculation
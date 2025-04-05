import React, { Component } from "react";
import arrayTask from "./TodoTask";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayTask: arrayTask,
      newTask: "",
    };
  }

//   changeHandler = ({ target: { value, name } }) => {
//     this.setState({
//       newTask: value,
//     });
//   };

  render() {
    const { text } = arrayTask;
    return (
      <div>
        <h1>Todo list</h1>

        <input
          type="text"
          placeholder="Add your task"
        //   value={newTask}
        //   onChange={this.changeHandler}
        />

        <ol>
          {this.state.arrayTask.map(({ id, text }) => {
            return <li key={id}>{text}</li>;
          })}
        </ol>
      </div>
    );
  }
}

export default TodoList;

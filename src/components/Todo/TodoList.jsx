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

      changeHandler = ({ target: { value, name } }) => {
      this.setState({
        [name]: value,
      });
    };

  removeTask = (taskToRemove) => {
    const { arrayTask } = this.state;
    const arrayTaskFilter = arrayTask.filter((task) => {
      return task.id !== taskToRemove;
    });
    this.setState({
      arrayTask: arrayTaskFilter,
    });
  };



  render() {
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
            return (
              <form key={id}>
                <li >{text}</li>
                <button
                  onClick={() => this.removeTask(id)}
                >
                  Delete
                </button>
              </form>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default TodoList;

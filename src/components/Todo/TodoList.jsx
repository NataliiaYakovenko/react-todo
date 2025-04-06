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

  submitHandler=(event)=>{
    event.preventDefault()
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

  addTask = () => {
    const { arrayTask, newTask } = this.state;

    if (!newTask.trim()) return;

    const newObjectTask = {
      id: arrayTask.length + 1,
      text: newTask,
    };

    this.setState({
      arrayTask: [...arrayTask, newObjectTask],
      newTask: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>Todo list</h1>

        <input
          type="text"
          placeholder="Add your task"
          name="newTask"
          value={this.state.newTask}
          onChange={this.changeHandler}
        />
        <button onClick={this.addTask}>Add</button>

        <ol>
          {this.state.arrayTask.map(({ id, text }) => {
            return (
              <div key={id}>
                <li>{text}</li>
                <button onClick={() => this.removeTask(id)}>Delete</button>
              </div>
            );
          })}
        </ol>
      </form>
    );
  }
}

export default TodoList;

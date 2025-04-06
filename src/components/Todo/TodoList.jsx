import React, { Component } from "react";
import styles from "./TodoListStyle.module.scss";
import cx from "classnames";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayTasks: [],
      newTask: "",
      isInputValid: true,
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  changeHandler = ({ target: { value, name } }) => {
    if(value.includes('*')){
      this.setState({
        isInputValid: false
      })
    } else{
      this.setState({
        [name]: value,
        isInputValid: true,
      });

    }
  };

  addTask = () => {
    const { arrayTasks, newTask } = this.state;
    if (!newTask) {
      return;
    }

    const newObjectTask = {
      id: arrayTasks.length + 1,
      text: newTask,
      completed: false,
    };

    this.setState({
      arrayTasks: [...arrayTasks, newObjectTask],
      newTask: "",
    });
  };

  completedTask = (id) => {
    const updatedTasks = this.state.arrayTasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.setState({
      arrayTasks: updatedTasks,
    });
  };

  removeTask = (taskToRemove) => {
    const { arrayTasks } = this.state;
    const arrayTaskFilter = arrayTasks.filter((task) => {
      return task.id !== taskToRemove;
    });
    this.setState({
      arrayTasks: arrayTaskFilter,
    });
  };

  render() {
    const { isInputValid } = this.state;

    const classNameInput = cx({
      [styles.input]: true,
      [styles.inValidInput]: !isInputValid,
    });

    return (
      <form onSubmit={this.submitHandler} className={styles.container}>
        <h1>Todo list</h1>

        <input className={classNameInput}
          type="text"
          placeholder="Add your task"
          name="newTask"
          value={this.state.newTask}
          onChange={this.changeHandler}
        />
        <button onClick={this.addTask}>Add</button>

        <ol>
          {this.state.arrayTasks.map(({ id, text, completed }) => {
            return (
              <div key={id}>
                <li
                  onClick={() => {
                    return this.completedTask(id);
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: completed ? "underline" : "none",
                    color: completed ? "green" : "black",
                  }}
                >
                  {text}
                </li>
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

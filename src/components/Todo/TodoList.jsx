import React, { Component } from "react";
import styles from "./TodoListStyle.module.scss";
import cx from "classnames";
import * as yup from "yup";

const initiaState = {
  arrayTasks: [],
  newTask: "",
  error: "",
};

const ADD_TASK_SHEMA = yup.object({
  newTask: yup.string().required(),
});

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initiaState,
    };
  }

  submitHandler = (event) => {
    const{newTask}=this.state
    event.preventDefault();
    ADD_TASK_SHEMA.validate({ newTask: newTask })
      .then(() => {
        this.addTask();
        this.setState({
          error: "",
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  changeHandler = ({ target: { value } }) => {
    this.setState({
      newTask: value,
    });
    ADD_TASK_SHEMA.validate({ newTask: value })
      .then(() => {
        this.setState({
          error: "",
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  addTask = () => {
    const { arrayTasks, newTask } = this.state;

    const newObjectTask = {
      id: arrayTasks.length + 1,
      text: newTask,
      completed: false,
    };

    this.setState({
      arrayTasks: [...arrayTasks, newObjectTask],
      newTask: "",
      error: "",
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
    const { error } = this.state;

    const classNameInput = cx({
      [styles.input]: true,
      [styles.inValidInput]: !!error,
    });

    return (
      <form onSubmit={this.submitHandler} className={styles.container}>
        <h1 className={styles.title}>To do list</h1>

        <div className={styles.boxTask}>
          <input
            className={classNameInput}
            type="text"
            placeholder="Add your task"
            name="newTask"
            value={this.state.newTask}
            onChange={this.changeHandler}
          />
          <button className={styles.btnAdd} onClick={this.submitHandler}>
            Add
          </button>
        </div>

        <div>
          {this.state.arrayTasks.map(({ id, text, completed }) => {
            return (
              <div key={id} className={styles.listTasks}>
                <textarea
                  className={styles.listText}
                  onClick={() => {
                    return this.completedTask(id);
                  }}
                  style={{
                    cursor: "pointer",
                    backgroundColor: completed ?'green': 'rgb(104, 2, 82)',
                    textDecoration: completed ? "underline" : "none",
                    color: completed ? "orange" : "white",
                  }}
                >
                  {text}
                </textarea>

                <button
                  className={styles.btnList}
                  onClick={() => this.removeTask(id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </form>
    );
  }
}
export default TodoList;

// This file has the barebones functionality, but won't be used in the production build
// Just to demonstrate a Class component
import React, { Component } from "react";
import "./KB.css";

export default class KBClass extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { name: "1", stage: 0 },
        { name: "2", stage: 0 }
      ],
      newTaskField: ""
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  updateNewTaskField(e) {
    this.setState({ newTaskField: e.target.value });
  }

  createTask() {
    if (this.state.newTaskField) {
      this.setState((prevState) => {
        return {
          tasks: [
            ...prevState.tasks,
            { name: prevState.newTaskField, stage: 0 }
          ],
          newTaskField: ""
        };
      });
    }
  }

  handleMoveBack(name, stage) {
    if (stage > 0) {
      this.setState((prevState) => {
        return {
          tasks: prevState.tasks.map((task) => {
            if (task.name === name) {
              return { name: name, stage: stage - 1 };
            } else {
              return task;
            }
          })
        };
      });
    }
  }

  handleMoveForward(name, stage) {
    if (stage < this.stagesNames.length - 1)
      this.setState((prevState) => {
        return {
          tasks: prevState.tasks.map((task) => {
            if (task.name === name) {
              return { name: name, stage: stage + 1 };
            } else {
              return task;
            }
          })
        };
      });
  }

  handleDelete(name) {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.filter((task) => {
          return task.name !== name;
        })
      };
    });
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div>
        <section>
          <input
            id="create-task-input"
            type="text"
            placeholder="New task name"
            value={this.state.newTaskField}
            onChange={(e) => this.updateNewTaskField(e)}
          />
          <button type="submit" onClick={() => this.createTask()}>
            Create task
          </button>
        </section>

        <div>
          {stagesTasks.map((tasks, i) => {
            return (
              <div key={`${i}`}>
                <div>
                  <h4>{this.stagesNames[i]}</h4>
                  <ul>
                    {tasks.map((task, index) => {
                      return (
                        <li key={`${i}${index}`}>
                          <div>
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div>
                              <button
                                onClick={() =>
                                  this.handleMoveBack(task.name, task.stage)
                                }
                              >
                                <i>arrow_back</i>
                              </button>
                              <button
                                onClick={() =>
                                  this.handleMoveForward(task.name, task.stage)
                                }
                              >
                                <i>arrow_forward</i>
                              </button>
                              <button
                                onClick={() => this.handleDelete(task.name)}
                              >
                                <i>delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

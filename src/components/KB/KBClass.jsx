// This file has the barebones functionality, but won't be used in the production build
// Just to demonstrate a Class component
import React, { Component } from "react";
import BoardInput from "../BoardInput/BoardInput.jsx";
import Stage from "../Stage/Stage.jsx"
import "./KBBoard.css";

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
    this.updateNewTaskField = this.updateNewTaskField.bind(this);
    this.createTask = this.createTask.bind(this);
    this.handleMoveForward = this.handleMoveForward.bind(this);
    this.handleMoveBack = this.handleMoveBack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
    this.stages = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  updateNewTaskField(e) {
    this.setState({ newTaskField: e.target.value });
  }

  createTask(e) {
    e.preventDefault();

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
              return task.name === name ? { name: name, stage: stage - 1 } : task;
          })
        };
      });
    }
  }

  handleMoveForward(name, stage) {
    if (stage < this.stages.length - 1)
      this.setState((prevState) => {
        return {
          tasks: prevState.tasks.map((task) => {
              return task.name === name ? { name: name, stage: stage + 1 } : task;
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

    const stagesTasks = Array.from({ length: this.stages.length }, () => []);
    for (let task of tasks) {
      const stage = task.stage;
      stagesTasks[stage].push(task);
    }

    return (
      <div>
        <BoardInput
          newTaskField={this.state.newTaskField}
          updateNewTaskField={this.updateNewTaskField}
          createTask={this.createTask}
        />
        <div className="container">
          <div className="stage-container">
            {stagesTasks.map((tasks, i) => {
              return (
                <Stage 
                  stages={this.stages} 
                  tasks={tasks} 
                  i={i} 
                  handleMoveBack={this.handleMoveBack}
                  handleMoveForward={this.handleMoveForward} 
                  handleDelete={this.handleDelete} 
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}


{/* <div>
          {stagesTasks.map((tasks, i) => {
            return (
              <div key={`${i}`}>
                <div>
                  <h4>{this.stages[i]}</h4>
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
        </div> */}
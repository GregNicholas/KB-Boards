import React, { Component } from "react";
import BoardInput from "../BoardInput/BoardInput";
import Stage from "../Stage/Stage";
// @ts-ignore
import { Task } from "../types";
import "./KBBoard.css";

type KBState = {
  tasks: Task[];
  newTaskField: string;
};

export default class KBClass extends Component<{}, KBState> {
  stages: string[];
  constructor(props: {}) {
    super(props);
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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.stages = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  updateNewTaskField(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTaskField: e.target.value });
  }

  createTask(e: React.FormEvent<HTMLFormElement>) {
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

  handleMoveBack(name: string, stage: number) {
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

  handleMoveForward(name: string, stage: number) {
    if (stage < this.stages.length - 1)
      this.setState((prevState) => {
        return {
          tasks: prevState.tasks.map((task) => {
            return task.name === name ? { name: name, stage: stage + 1 } : task;
          })
        };
      });
  }

  handleEdit(name: string, newName: string) {
    console.log(newName);

    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.map((task) => {
          return task.name === name
            ? { name: newName, stage: task.stage }
            : task;
        })
      };
    });
  }

  handleDelete(name: string) {
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

    const stagesTasks: Task[][] = Array.from(
      { length: this.stages.length },
      () => []
    );
    for (let task of tasks) {
      const stage = task.stage;
      stagesTasks[stage].push(task);
    }

    return (
      <div>
        <h1>Greg's KB Board</h1>
        <BoardInput
          newTaskField={this.state.newTaskField}
          updateNewTaskField={this.updateNewTaskField}
          createTask={this.createTask}
          hasButton={true}
        />
        <div className="container">
          <div className="stage-container">
            {stagesTasks.map((tasks, i) => {
              return (
                <Stage
                  key={`${i}`}
                  stages={this.stages}
                  tasks={tasks}
                  i={i}
                  handleMoveBack={this.handleMoveBack}
                  handleMoveForward={this.handleMoveForward}
                  handleEdit={this.handleEdit}
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

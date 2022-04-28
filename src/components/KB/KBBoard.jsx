import React, { useState } from "react";
import BoardInput from "../BoardInput/BoardInput.jsx";
import "./KBBoard.css";

const KBBoard = () => {
  const [newTaskField, setNewTaskField] = useState("");
  const [tasks, setTasks] = useState([{ name: "task1", stage: 0 }]);
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];

  const stagesTasks = Array.from({ length: stages.length }, () => []);
  for (let task of tasks) {
    const stage = task.stage;
    stagesTasks[stage].push(task);
  }

  const updateNewTaskField = (e) => {
    setNewTaskField(e.target.value);
  };

  const createTask = (e) => {
    e.preventDefault();
    if (newTaskField) {
      setTasks((prev) => [{ name: newTaskField, stage: 0 }, ...prev]);
      setNewTaskField("");
    }
  };

  const handleDelete = (name) => {
    setTasks((prev) => prev.filter((t) => t.name !== name));
  };

  const handleMoveBack = (name, stage) => {
    if (stage > 0) {
      setTasks((prev) => {
        return prev.map((task) => {
          return task.name === name ? { name: name, stage: stage - 1 } : task;
        });
      });
    }
  };

  const handleMoveForward = (name, stage) => {
    if (stage < stages.length - 1) {
      setTasks((prev) => {
        return prev.map((task) => {
          if (task.name === name) {
            return { name: name, stage: stage + 1 };
          } else {
            return task;
          }
        });
      });
    }
  };

  return (
    <div>
      <BoardInput
        newTaskField={newTaskField}
        updateNewTaskField={updateNewTaskField}
        createTask={createTask}
      />

      <div>
        {stagesTasks.map((tasks, i) => {
          return (
            <div key={`${i}`}>
              <div>
                <h4>{stages[i]}</h4>
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
                            {task.stage > 0 && (
                              <button
                                onClick={() =>
                                  handleMoveBack(task.name, task.stage)
                                }
                                disabled={task.stage < 1}
                              >
                                <i>arrow_back</i>
                              </button>
                            )}
                            {task.stage < stages.length - 1 && (
                              <button
                                onClick={() =>
                                  handleMoveForward(task.name, task.stage)
                                }
                                disabled={task.stage >= stages.length - 1}
                              >
                                <i>arrow_forward</i>
                              </button>
                            )}
                            <button onClick={() => handleDelete(task.name)}>
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
};

export default KBBoard;

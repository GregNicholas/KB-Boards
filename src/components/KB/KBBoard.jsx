import React, { useState } from "react";
import BoardInput from "../BoardInput/BoardInput.jsx";
import Stage from "../Stage/Stage.jsx"
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
      <div className="container">
        <div className="stage-container">
          {stagesTasks.map((tasks, i) => {
            return (
              <Stage 
                stages={stages} 
                tasks={tasks} i={i} 
                handleMoveForward={handleMoveForward} 
                handleDelete={handleDelete} 
                handleMoveBack={handleMoveBack}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KBBoard;

import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./Stage.css";

interface StageProps {
  tasks: Task[];
  i: number;
  stages: string[];
  handleMoveBack: (name: string, stage: number) => void;
  handleMoveForward: (name: string, stage: number) => void;
  handleEdit: (name: string, newName: string) => void;
  handleDelete: (name: string) => void;
}

const Stage = ({
  tasks,
  i,
  stages,
  handleMoveBack,
  handleMoveForward,
  handleEdit,
  handleDelete
}: StageProps) => {
  return (
    <div className="stage">
      <div>
        <h4>{stages[i]}</h4>
        <ul>
          {tasks.map((task, index) => {
            return (
              <TaskCard
                key={index}
                i={i}
                index={index}
                task={task}
                stages={stages}
                handleMoveBack={handleMoveBack}
                handleMoveForward={handleMoveForward}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Stage;

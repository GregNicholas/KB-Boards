import React from "react";
// @ts-ignore
import TaskCard from "../TaskCard/TaskCard.tsx"
// @ts-ignore
import "./Stage.css"

interface StageProps {
  tasks: Task[];
  i: number;
  stages: string[];
  handleMoveBack: (name: string, stage: number) => void;
  handleMoveForward: (name: string, stage: number) => void;
  handleDelete: (name: string) => void;
}
 
const Stage = ({ tasks, i, stages, handleMoveBack, handleMoveForward, handleDelete }: StageProps) => {

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
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
    )
}

export default Stage
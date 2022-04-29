import React from "react";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti'

interface TaskCardProps {
    i: number;
    index: number;
    task: Task;
    stages: string[];
    handleMoveBack: (name: string, stage: number) => void;
    handleMoveForward: (name: string, stage: number) => void;
    handleDelete: (name: string) => void;
  }

const TaskCard = ({ 
    i, 
    index, 
    task, 
    stages, 
    handleMoveBack, 
    handleMoveForward, 
    handleDelete 
}: TaskCardProps) => {

    return (
        <li className="task-card" key={`${i}${index}`}>
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
                className="move-btn"
                onClick={() =>
                    handleMoveBack(task.name, task.stage)
                }
                disabled={task.stage < 1}
                >
                <i><FaArrowLeft /></i>
                </button>
            )}
            {task.stage < stages.length - 1 && (
                <button
                className="move-btn"
                onClick={() =>
                    handleMoveForward(task.name, task.stage)
                }
                disabled={task.stage >= stages.length - 1}
                >
                <i><FaArrowRight /></i>
                </button>
            )}
            <button className="delete-btn" onClick={() => handleDelete(task.name)}>
                <i><TiDelete /></i>
            </button>
            </div>
        </li>
    )
}

export default TaskCard
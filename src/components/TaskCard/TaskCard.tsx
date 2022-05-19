import React, { useState } from "react";
import BoardInput from "../BoardInput/BoardInput";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { MdEditNote } from "react-icons/md";

interface TaskCardProps {
  i: number;
  index: number;
  task: Task;
  stages: string[];
  handleMoveBack: (name: string, stage: number) => void;
  handleMoveForward: (name: string, stage: number) => void;
  handleEdit: (name: string, newName: string) => void;
  handleDelete: (name: string) => void;
}

const TaskCard = ({
  i,
  index,
  task,
  stages,
  handleMoveBack,
  handleMoveForward,
  handleEdit,
  handleDelete
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskEditValue, setTaskEditValue] = useState(task.name);

  const updateEditTaskField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskEditValue(e.target.value);
  };

  const editTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskEditValue) {
      handleEdit(task.name, taskEditValue);
    }
    setIsEditing(false);
  };

  return (
    <li className="task-card" key={`${i}${index}`}>
      {isEditing ? (
        <BoardInput
          newTaskField={taskEditValue}
          updateNewTaskField={updateEditTaskField}
          createTask={editTask}
          hasButton={false}
        />
      ) : (
        <span data-testid={`${task.name.split(" ").join("-")}-name`}>
          {task.name}
        </span>
      )}

      <div>
        <button
          className="edit-btn"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <i>
            <MdEditNote />
          </i>
        </button>
        {task.stage > 0 && (
          <button
            className="move-btn"
            onClick={() => {
              handleMoveBack(task.name, task.stage);
              setIsEditing(false);
            }}
            disabled={task.stage < 1}
          >
            <i>
              <FaArrowLeft />
            </i>
          </button>
        )}
        {task.stage < stages.length - 1 && (
          <button
            className="move-btn"
            onClick={() => {
              handleMoveForward(task.name, task.stage);
              setIsEditing(false);
            }}
            disabled={task.stage >= stages.length - 1}
          >
            <i>
              <FaArrowRight />
            </i>
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => {
            handleDelete(task.name);
            setIsEditing(false);
          }}
        >
          <i>
            <TiDelete />
          </i>
        </button>
      </div>
    </li>
  );
};

export default TaskCard;

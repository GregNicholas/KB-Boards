import React from "react";
import "./BoardInput.css";

interface InputProps {
  newTaskField: string;
  updateNewTaskField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createTask: (e: React.FormEvent<HTMLFormElement>) => void;
  hasButton: boolean;
}

const BoardInput = ({
  newTaskField,
  updateNewTaskField,
  createTask,
  hasButton
}: InputProps) => {
  return (
    <section>
      <form onSubmit={createTask}>
        <input
          id="create-task-input"
          type="text"
          placeholder="New task name"
          value={newTaskField}
          onChange={updateNewTaskField}
        />
        {hasButton && (
          <button type="submit" className="btn-create" disabled={!newTaskField}>
            Create task
          </button>
        )}
      </form>
    </section>
  );
};

export default BoardInput;

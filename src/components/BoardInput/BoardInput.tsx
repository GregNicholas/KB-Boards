import React from "react";
import "./BoardInput.css"

interface InputProps {
  newTaskField: string;
  updateNewTaskField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createTask: (e: React.FormEvent<HTMLFormElement>) => void;
}

const BoardInput = ({ newTaskField, updateNewTaskField, createTask }: InputProps ) => {
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
          <button type="submit" className="btn-create" disabled={!newTaskField}>
            Create task
          </button>
        </form>
      </section>
    );
  };
  
  export default BoardInput;
  
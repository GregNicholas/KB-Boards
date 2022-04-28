import "./Stage.css"
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti'

const Stage = ({ tasks, i, stages, handleMoveBack, handleMoveForward, handleDelete }) => {

    return (
        <div key={`${i}`} className="stage">
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
                                <i><FaArrowLeft /></i>
                              </button>
                            )}
                            {task.stage < stages.length - 1 && (
                              <button
                                onClick={() =>
                                  handleMoveForward(task.name, task.stage)
                                }
                                disabled={task.stage >= stages.length - 1}
                              >
                                <i><FaArrowRight /></i>
                              </button>
                            )}
                            <button onClick={() => handleDelete(task.name)}>
                              <i><TiDelete /></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
    )
}

export default Stage
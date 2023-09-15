import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/Context";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ShowList = () => {
  const { users, setusers, ActiveHandler } =
    useContext(UserContext);

  const [checkboxStates, setCheckboxStates] = useState(users.map(() => false));

  useEffect(() => {
    setCheckboxStates(users.map(() => false));
  }, [users]);

  const DeleteHandler = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const copyUsers = [...users];
        copyUsers.splice(index, 1);
        setusers(copyUsers);
        toast.error("Task deleted successfully!");
      }
    });
  };

  const ToggleCheckbox = (index) => {
    setCheckboxStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    toast.info("Task status updated!");
  };

  const pendingTasks = users.filter((user, i) => !checkboxStates[i]);
  const completedTasks = users.filter((user, i) => checkboxStates[i]);

  const [filter, setFilter] = useState("all");

  const filterTasks = (filterValue) => {
    setFilter(filterValue);
  };

  let filteredTasks = [];

  switch (filter) {
    case "all":
      filteredTasks = users;
      break;
    case "complete":
      filteredTasks = completedTasks;
      break;
    case "pending":
      filteredTasks = pendingTasks;
      break;
    default:
      filteredTasks = users;
  }

  const allTasksCount = users.length;
  const completedTasksCount = completedTasks.length;
  const pendingTasksCount = pendingTasks.length;

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const reorderedTasks = [...filteredTasks];
    const [movedTask] = reorderedTasks.splice(startIndex, 1);
    reorderedTasks.splice(endIndex, 0, movedTask);
    setFilteredTasks(reorderedTasks);
  };

  return (
    <div className="show Create">
      <h3>Your Task</h3>
      <div className="show-bottom">
        {users.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <div>
            <div className="show-button">
              <button
                onClick={() => filterTasks("all")}
                className={filter === "all" ? "active-filter" : "filter-button"}
              >
                All ({allTasksCount})
              </button>
              <button
                onClick={() => filterTasks("complete")}
                className={
                  filter === "complete" ? "active-filter" : "filter-button"
                }
              >
                Complete ({completedTasksCount})
              </button>
              <button
                onClick={() => filterTasks("pending")}
                className={
                  filter === "pending" ? "active-filter" : "filter-button"
                }
              >
                Pending ({pendingTasksCount})
              </button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <ul>
                <Droppable droppableId="tasks">
                  {(provided) => (
                    <div
                      className="ul"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {filteredTasks.reverse().map((e, i) => (
                        <Draggable key={i} draggableId={`task-${i}`} index={i}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div>
                                <span>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={`flexCheckDefault-${i}`}
                                    checked={checkboxStates[i]}
                                    onChange={() => ToggleCheckbox(i)}
                                  />
                                  <h6>
                                    {e.taskname} <sup>{e.dueDate}</sup>
                                  </h6>
                                </span>
                                <span>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => DeleteHandler(i)}
                                  >
                                    <i className="ri-delete-bin-fill"></i>
                                    &nbsp;Delete
                                  </button>
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => ActiveHandler(i)}
                                  >
                                    <i className="ri-edit-2-line"></i>&nbsp;Edit
                                  </button>
                                  {checkboxStates[i] && (
                                    <i className="ri-checkbox-circle-fill"></i>
                                  )}
                                </span>
                              </div>
                              <p>{e.taskdis}</p>
                            </li>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </ul>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowList;

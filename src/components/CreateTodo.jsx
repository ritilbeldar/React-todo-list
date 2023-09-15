import React, { useState, useContext } from "react";
import { UserContext } from "../utils/Context";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CreateTodo = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const {
    users,
    setusers,
    taskname,
    settaskname,
    taskdis,
    settaskdis,
    active,
    setActive,
    currentDate,
    dueDate,
    setDueDate,
  } = useContext(UserContext);

  const isEditing = active !== null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { taskname, taskdis, dueDate };
    if (isEditing) {
      Swal.fire({
        title: "Update Task",
        text: "Are you sure you want to update this task?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const copyUsers = [...users];
          copyUsers[active] = { ...copyUsers[active], ...user };
          setusers(copyUsers);
          setActive(null);
          toast.success("Task updated successfully!");
          settaskname("");
          settaskdis("");
          setDueDate("");
        }
      });
    } else {
      setusers([...users, user]);
      toast.success("Task added successfully!");
      settaskname("");
      settaskdis("");
      setDueDate("");
    }
  };

  return (
    <div className="Create">
      <h3>Create Your Task</h3>
      <div className="create-top">
        <h4>
          Today <sup>{currentDate()}</sup>
        </h4>
        {isFormVisible ? (
          <button onClick={toggleForm}>
            <i className="ri-close-line"></i> Close
          </button>
        ) : (
          <button onClick={toggleForm}>
            <i className="ri-add-line"></i>{" "}
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        )}
      </div>
      {isFormVisible && (
        <form>
          <div>
            <input
              type="text"
              placeholder="Task name"
              value={taskname}
              onChange={(e) => settaskname(e.target.value)}
            />
            <input
              id="taskd"
              type="text"
              placeholder="Task Description"
              onChange={(e) => settaskdis(e.target.value)}
              value={taskdis}
            />
            <input
              id="date"
              type="date"
              placeholder="Due Date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={!taskname}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTodo;

import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

const Context = (props) => {
  const currentDate = () => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Date().toLocaleDateString(undefined, options);
  };

  const [users, setusers] = useState([
    {
      taskname: "ritik beldar",
      taskdis: "task completed",
      dueDate: "2023-09-16",
    },
  ]);

  const [taskname, settaskname] = useState("");
  const [taskdis, settaskdis] = useState("");

  const [active, setActive] = useState(null);

  const { children } = props;

  const ActiveHandler = (index) => {
    setActive(index);
    settaskname(users[index].taskname);
    settaskdis(users[index].taskdis);
    setFormVisible(true);
  };

  const [dueDate, setDueDate] = useState("");
  const setDueDateHandler = (date) => {
    setDueDate(date);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setusers,
        taskname,
        settaskname,
        taskdis,
        settaskdis,
        active,
        setActive,
        currentDate,
        ActiveHandler,
        dueDate,
        setDueDate: setDueDateHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;

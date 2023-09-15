import React, { useState, useContext } from "react";
import CreateTodo from "../components/CreateTodo";
import ShowList from "../components/ShowList";
import { UserContext } from "../utils/Context";

const Home = () => {
  const [isListVisible, setListVisible] = useState(false);
  const { users } = useContext(UserContext);

  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <div className="home">
      <CreateTodo />
      <span className="number">
        <button onClick={toggleListVisibility} disabled={users.length === 0}>
          <i className="ri-file-list-3-fill"></i>
        </button>
        <p>{users.length}</p>
      </span>
      {isListVisible && <ShowList />}
    </div>
  );
};

export default Home;

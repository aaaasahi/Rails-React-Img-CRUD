import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    retrieveTodos();
  }, []);

  const retrieveTodos = () => {
    axios
      .get("http://localhost:8000/todos")
      .then((response) => {
        setTodos(response.data);
        setImage(response.data)
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-10">
        <h4>Todo List</h4>

        <ul className="list-group">
          {image &&
            todos.map((todo, key) => (
              <Link to={`/todos/${todo.id}`} key={key}>
                <li className={"list-group-item "}>
                  {todo.title}
                  <img
                    src={`http://localhost:8000/${todo.file.url}`}
                    height="80px"
                  />
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};

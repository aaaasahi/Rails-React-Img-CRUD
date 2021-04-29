import React from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "./components/auth/Header";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { CreateTodo } from "./components/CreateTodo";
import { ShowTodo } from "./components/ShowTodo";
import { TodoList } from "./components/TodoList";

const currentUser = function () {
  const user = localStorage.getItem("user");
  console.log(user);
  return user;
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-secondary">
          <a href="/todos" className="navbar-brand">
            Todo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todo List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                AddTodo
              </Link>
            </li>
            <li><Header/></li>
          </div>
        </nav>
  
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todos"]} component={TodoList} />
            <Route exact path="/add" component={CreateTodo} />
            <Route path="/todos/:id" component={ShowTodo} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

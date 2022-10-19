import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
}
from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Navbar from "./components/Navbar";


const App = () => {
  let routes = useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/create", element: <Create /> },
    { path: "/edit/:slug", element: <Edit /> },

    // ...
  ]);
  return routes;
};

const AppWrapper = () => {
  return (

    <Router>
      <Navbar />
      <App />
    </Router>
  );
};

export default AppWrapper;

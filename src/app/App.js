import React from "react";
import "./app.sass";
import Routes from "./routes/Routes";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cities">Cities</Link>
        </li>
      </ul>
      <Routes />
    </div>
  );
}

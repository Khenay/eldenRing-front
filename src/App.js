
// import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter, Link, Navigate } from "react-router-dom";
import MainComponent from "./components/Main";

import './App.css';
import Register from "./pages/Register";
import './pages/Register.css';
// import Register from './pages/Register';



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {/* <Navigate to={"/register"}/> */}
          {/* <Register /> */}
          {/* <Link to={"/register"}>About</Link>
          <Link to={"/login"}>List</Link> */}
          <MainComponent />
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
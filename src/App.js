import React, {useState} from 'react';
import axios from 'axios';
import qs from 'qs';
import './Assets/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./Pages/homepage";
import About from "./Pages/about";

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/About" component={About}></Route>
      </Router>
    </div>
  );
}

export default App;

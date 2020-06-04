import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

export default function About(){
return (
    <body>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="homepage">Food Finder</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="About">About</a>
                </li>
            </ul>
        </div>
      </nav>

      {/* container */}
      <div className="container" id="About">
            <div>
                <h1>Food Finder</h1>
                <p>Rizal Faturrahman 140810170009</p>
                <p>Raihan Luthfiandi Muhammad 140810170029</p>
                <p>Haris Putratama 140810170059</p>
            </div>
        </div>
    </body>
    )
}
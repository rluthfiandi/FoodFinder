import React from 'react';

import { Link } from "react-router-dom";
export default function App(){
    return (
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <title>FoodFinder</title>
        
        <div id="wrapper">
          <div id="header">
            <ul>
              <li><a className="a" href="#">Home</a></li>
              <li><a className="a" href="#">About</a></li>
              <li><a className="a" href="#">Contact</a></li>
              <li><a className="a" href="#">Lokasi</a></li>
              <li><a className="a" href="#">Jenis</a></li>
              <li><a className="a" href="#">Trend</a></li>
              
            </ul>
          </div>
        </div>
        {/* 	<i style="color:#DC143C;">hi</i> */}
        <div id="content">
          <center> <h1>Food Finder</h1> 
            <form action="./search.php" method="get">
              <input className="boxin" type="text" name="k" size={50} />
              <br />
              <b>Sort by</b>
              <select className="box " name="by">
                <option value>Sort</option>
                <option value="Lokasi">Lokasi</option>
                <option value="Jenis">Jenis</option>
                <option value="Trend">Trend</option>
              </select>
              <select className="box" name="sort">
                <option value>None</option>
                <option value="Asc">Asc</option>
                <option value="Desc">Desc</option>
              </select>
              <input type="submit" className="button" defaultValue="Search" />
            </form>
          </center>
          {/* bikin paragraf sebanyak mungkin sampai halaman bisa discroll kebawah */}
        </div>
      </div>
    );
  };

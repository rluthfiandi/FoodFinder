import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

export default function Homepage(){
  
  const [value, setValue] = useState({
    mp : [],
    item : '',
    daerah: '',
    jenis:'',
    trend :''
  });

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/foodfinder/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const queryData = {
    query:
    `PREFIX mp: <http://www.foodfinder.org/ns/makanan#>

SELECT ?item ?daerah ?jenis ?trend
WHERE
{
 ?c   mp:item  ?item ;
         mp:daerah ?daerah ;
           mp:jenis ?jenis ;
             mp:trend ?trend ;
              FILTER contains(lcase(str(?item)), lcase(str("${value.item ? value.item : ''}")))
              FILTER contains(lcase(str(?daerah)), lcase(str("${value.daerah ? value.daerah : ''}")))
              FILTER contains(lcase(str(?jenis)), lcase(str("${value.jenis ? value.jenis : ''}")))
              FILTER contains(lcase(str(?trend)), lcase(str("${value.trend ? value.trend : ''}")))
}`
};


  try {
    const { data } = await axios(BASE_URL, {
      method: 'POST',
      headers,
      data: qs.stringify(queryData)
    });
    console.log(data);

    // Convert Data
    const formatted_data = data.results.bindings.map((mp, index) => formatter(mp, index));
    console.log(formatted_data)

    setValue({
      ...value,
      mp: formatted_data
    });
  } catch (err) {
    console.error(err);
  }
}

const formatter = (mp, index) => {
  return {
    "id": index,
    "item": mp.item.value,
    "daerah": mp.daerah.value,
    "jenis": mp.jenis.value,
    "trend": mp.trend.value
  }
}

const handleChangeTitle = event => {
  setValue({
    ...value,
    'judul': event.target.value,  
  });
}

const handleChangeNpm = event => {
  setValue({
    ...value,
    'npm': event.target.value,  
  });
}

const handleChangeName = event => {
  setValue({
    ...value,
    'nama': event.target.value,  
  });
}

const handleChangeYear = event => {
  setValue({
    ...value,
    'tahun': event.target.value,
  });
}

const handleChangeMajor = event => {
  setValue({
    ...value,
    'peminatan': event.target.value,
  });
}

const content = value.mp.map((mp) =>
  <div className="container">
    <div key={mp.id}>
      <div className="col-md-10">
        <div className="item"><a href="Item">{mp.item}</a></div>
        <div class="row">
          <div class="col-md-5">
            <a>Lokasi : {mp.daerah}</a>
          </div>
          <div class="col-md-2">
            <a>Trend : {mp.trend}</a>  
          </div>
        </div>  
      </div>
    </div>
  </div>
)

// Layout
return (
    <body>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Food Finder</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="Login">Login</a>
                </li>
            </ul>
        </div>
      </nav>

      <div className="header">
        <h1>
            Food Finder
        </h1>
        <p id="desc">Food Finder adalah Website<b> Pencarian Makanan dan Minuman </b>Mahasiswa Teknik Informatika Unpad</p>

        {/* Search Form  */}
        <form>
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  setValue={value.item}
                  placeholder="Nama Makanan atau Minuman"
                  type="text"
                  id="titleBar"
                  onChange={handleChangeTitle}
                />
              </div>
            </div>
            <div className="grid-container">
              <div className="row">
                <div className="col">
                  <input
                    setValue={value.daerah}
                    placeholder="Lokasi Pencarian"
                    type="text"
                    id="nameBar"
                    onChange={handleChangeName}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Jenis */}
          <div className="row">
            <select setValue={value.jenis} className="dropdown" id="tahun" onChange={handleChangeYear}>
              <option value="">Jenis</option>
              <option value="Makanan Berat">Makanan Berat</option>
              <option value="Makanan Ringan">Makanan Ringan</option>
              <option value="Minuman">Minuman </option>
            </select>
          </div>

           {/* Filter Trend */}
           <div className="row">
            <select setValue={value.trend} className="dropdown" id="trend" onChange={handleChangeYear}>
              <option value="">Trend</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Button */}
          <div className="row">
            <input
                type="button"
                className="button"
                id="search"
                value="Search"
                onClick={getData}
            />
          </div>
        </form>
      </div>
        
      {/* Hasil Pencarian */}
      <div class="result">
        <h5>
            Hasil Pencarian
        </h5>
        <div>
          {content}
        </div>
      </div>

      {/* Footer */}
        <footer>
          <div className="footer-copyright">&copy; 2020 FoodFinder</div>
        </footer>
    </body>
    );
}

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
              FILTER contains(lcase(str(?item)), lcase(str("${value.item}")))
              FILTER contains(lcase(str(?daerah)), lcase(str("${value.daerah}")))
              FILTER contains(lcase(str(?jenis)), lcase(str("${value.jenis}")))
              FILTER contains(lcase(str(?trend)), lcase(str("${value.trend}")))
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

const handleChangeItem = event => {
  setValue({
    ...value,
    'item': event.target.value,  
  });
}

const handleChangeNpm = event => {
  setValue({
    ...value,
    'npm': event.target.value,  
  });
}

const handleChangeDaerah = event => {
  setValue({
    ...value,
    'daerah': event.target.value,  
  });
}

const handleChangeJenis = event => {
  setValue({
    ...value,
    'jenis': event.target.value,
  });
}

const handleChangeTrend = event => {
  setValue({
    ...value,
    'trend': event.target.value,
  });
}

const content = value.mp.map((mp) =>
  <div className="container hasil">
    <div key={mp.id}>
      <div className="col-md-10">
        <div className="item"><a href="Item">{mp.item}</a></div>
        <div>
          <div>
            <a>Jenis : {mp.jenis}</a>
          </div>
          <div>
            <a>Lokasi : {mp.daerah}</a>  
          </div>
          <div>
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
        <a className="navbar-brand" href="#"></a>
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
      <div className="header">
        <h1>
            What Food You Love?
        </h1>
        <p id="desc">Search it! Find it!</p>

        {/* Search Form  */}
        <form>
            <div className="lokasi">
              <div>
                <input
                  setValue={value.item}
                  placeholder="Search Food or Drink"
                  type="text"
                  id="nameBar"
                  onChange={handleChangeItem}
                />
              </div>
            </div>
            <div className="lokasi">
              <input
                    setValue={value.daerah}
                    placeholder="Location"
                    type="text"
                    id="nameBar"
                    onChange={handleChangeDaerah}
                  />
            </div>
          

          {/* Filter Jenis */}
          <div className="jenis">
            <select setValue={value.jenis} className="dropdown" id="tahun" onChange={handleChangeJenis}>
              <option value="">Type</option>
              <option value="Makanan Berat">Heavy Meal</option>
              <option value="Makanan Ringan">Snack</option>
              <option value="Minuman">Drink </option>
            </select>
          </div>

           {/* Filter Trend */}
          <div className="trend">
            <select setValue={value.trend} className="dropdown" id="trend" onChange={handleChangeTrend}>
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
            Here it is!
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

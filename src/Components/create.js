// create.js

import { useState } from "react";
import Movies from "./movies";
import axios from 'axios';



function Create() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
    
    const movie = {
      title: title,
      year: year,
      poster: poster
    };
    
    axios.post('http://localhost:4000/api/movies', movie)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));

      console.log(Movies);
  };

  return (
    <div>
      <h2>This is my Create Component.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Movie Title: </label>
          <input type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}/>
        </div>


        <div className="form-group">
          <label>Movie Year: </label>
          <input type="text"
            className="form-control"
            value={year}
            onChange={(e) => { setYear(e.target.value) }}/>
        </div>

        <div className="form-group">
          <label>Movie Poster: </label>
          <input type="url"
            className="form-control"
            value={poster}
            onChange={(e) => { setPoster(e.target.value) }}/>
        </div>


        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
}

export default Create;
import { useState } from "react";
import axios from 'axios';



function Create() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [photos, setPhotos] = useState('');

   // Handle photo file changes
   const handleFileChange = (e) => {
    setPhotos(e.target.files); 
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      // Log form data to console
      console.log('Title: ${title}, Location: ${location}, Start Date: ${startDate}, End Date: ${endDate}, Photos: ${photos}');

    
      
      // Prepare the trip object to send to the backend
    const formData = new FormData();
      formData.append('title', title);
      formData.append('location', location);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
    
      // Append photos (if any)
      for (let i = 0; i < photos.length; i++) {
        formData.append('photos', photos[i]); 
      }


    
    // Send the data to the backend via POST request
    axios.post('http://localhost:4000/api/trips', formData)
      .then((res) => {
        console.log("Response:", res.data);
      })
      .catch((err) => {
        console.log("Error:", err.response || err.message);
      });
  };

  return (
    <div>
      <h2>Add a New Trip</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Trip Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}/>
        </div>


        <div className="form-group">
          <label>Location: </label>
          <input type="text"
            className="form-control"
            value={location}
            onChange={(e) => { setLocation(e.target.value) }}/>
        </div>

        <div className="form-group">
          <label>Start Date: </label>
          <input type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value) }}/>
        </div>


        <div className="form-group">
          <label>End Date:</label>
          <input type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}/>
        </div>


        <div className="form-group">
          <label>Photos (select one or more):</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleFileChange} 
          />
        </div>


        <input type="submit" value="Add Trip" />
      </form>
    </div>
  );
}

export default Create;
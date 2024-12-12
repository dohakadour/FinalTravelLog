import { useState } from "react";

import axios from 'axios';



function create() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activities, setActivities] = useState('');
  const [photos, setPhotos] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();

      // Log form data to console
      console.log(`Title: ${title}, Location: ${location}, Start Date: ${startDate}, End Date: ${endDate}, Activities: ${activities}, Photos: ${photos}`);

    
      
      // Prepare the trip object to send to the backend
      const trip = {
        title: title,
        location: location,
        startDate: startDate,
        endDate: endDate,
        activities: activities.split(',').map(activity => activity.trim()),
        photos: photos.split(',').map(photo => photo.trim())
    };

    
    axios.post('http://localhost:4000/api/trips', trip)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));

      
  };

  return (
    <div>
      <h2>Add a New Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Trip Title: </label>
          <input type="text"
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
          <label>Photos (comma-separated URLs):</label>
          <input type="text"
            className="form-control"
            value={photos}
            onChange={(e) => setPhotos(e.target.value)}/>
        </div>


        <input type="submit" value="Add Trip" />
      </form>
    </div>
  );
}

export default create;
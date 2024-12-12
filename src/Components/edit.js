
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function EditTrip() {
    const { id } = useParams(); // Extract the trip ID from the URL
    const navigate = useNavigate();

    // State variables for trip data
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [photos, setPhotos] = useState("");


useEffect(() => {
    axios.get('http://localhost:4000/api/trip/' + id)
        .then((response) => {
            const trip = response.data;
                setTitle(trip.title);
                setLocation(trip.location);
                setStartDate(trip.startDate.slice(0, 10)); // Format date
                setEndDate(trip.endDate.slice(0, 10)); // Format date
                setPhotos(trip.photos.join(', ')); // Convert array to string
            })
        .catch((error) => {
            console.log(error);
        });
}, [id]);

const handleSubmit = (event) => {
    event.preventDefault();
     // Create the updated trip object
     const updatedTrip = {
        title,
        location,
        startDate,
        endDate,
        photos: photos.split(',').map((photo) => photo.trim()), 
    };
    axios.put('http://localhost:4000/api/trip/' + id, updatedTrip)
        .then((res) => {
            console.log("Trip updated successfully:", res.data);
            navigate('/view-trips');
        })
        
        .catch((error) => {
            console.error("Error updating trip:", error);
        });


}

return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Trip Title: </label>
                <input type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Location:</label>
                <input type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div className="form-group">
               <label>Start Date:</label>
                <input type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}/>
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


            <div className="form-group">
                <input type="submit" value=" Save Changes" className="btn btn-primary" />
            </div>
        </form>
    </div>
);
}
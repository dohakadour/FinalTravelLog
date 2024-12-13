import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";


function TripItem(props) {
  const handleDelete = (e) => {
      e.preventDefault();
      axios.delete('http://localhost:4000/api/trip/' + props.trip._id)
          .then(() => {
              props.Reload(); // Refresh the trip list after deletion
          })
          .catch((error) => {
              console.error("Error deleting trip:", error);
          });
  
  }

  // Log the trip details when they change
  useEffect(() => {
    console.log("Trip Item:", props.trip);
  }, [props.trip]); // Only run this effect when the mymovie prop changes

  return (
    <div>
      <Card>
        <Card.Header>{props.trip.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
          <p><strong>Location:</strong> {props.trip.location}</p>
          <p><strong>Start Date:</strong> {new Date(props.trip.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(props.trip.endDate).toLocaleDateString()}</p>
          {props.trip.photo && <img src={'http://localhost:4000${props.trip.photo}'} alt={props.trip.title} className="img-fluid" />}
          <footer className="blockquote-footer" />
          </blockquote>
        </Card.Body>
        <Link className="btn btn.primary" to={"/edit/"+props.trip._id}>Update</Link>
        <Button variant="danger" onClick={handleDelete} className="ms-2">Delete</Button>
        </Card>
    </div>
  );
}

export default TripItem;
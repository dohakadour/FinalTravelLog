import TripItem from "./TripItem";

function Trips(props) {
    return (
        <>
            {props.trips.map((trip) => (
                <TripItem
                    trip={trip}
                    key={trip._id}  // Make sure `trip._id` exists in the backend data
                    Reload={props.ReloadData}  // Pass down the Reload function to each TripItem
                />
            ))}
        </>
    );
}

export default Trips;

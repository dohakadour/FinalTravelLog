import TripItem from "./TripItem";

function Trips(props) {
    return (
        <>
            {props.trips.map((trip) => (
                <TripItem
                    trip={trip}
                    key={trip._id} 
                    Reload={props.ReloadData}  // Pass down the Reload function to each TripItem
                />
            ))}
        </>
    );
}

export default Trips;

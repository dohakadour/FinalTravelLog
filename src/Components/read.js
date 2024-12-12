import axios from "axios";
import { useState, useEffect } from "react";
import Trips from "./Trips";

function Read() {
    const [data, setData] = useState([]);

    const Reload = () => {
        console.log("Reloading trip data...");
        axios.get('http://localhost:4000/api/trips')
            .then((response) => {
                setData(response.data.trips);
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    useEffect(() => {
        Reload();
    }, []);

    return (
        <div>
            <h2>Trip List</h2>
            <Trips trips={data} ReloadData={Reload} />
        </div>
    );
}

export default Read;
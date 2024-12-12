// Import the necessary modules
const express = require('express');
const app = express();
const port = 4000;



const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DohaKadour:Douha@cluster0.6acyn.mongodb.net/');

// Define the Trip schema
const tripSchema = new mongoose.Schema({
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  activities: [String],
  photos: [String],
});

  // Create the Trip model
const Trip = mongoose.model('trips', tripSchema);
 

// Get all trips
app.get('/api/trips', async (req, res) => {
  try {
      const trips = await Trip.find({});
      res.status(200).json({ trips });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



    // Delete a trip
app.delete('/api/trip/:id', async (req, res) => {
  try {
      const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
      if (!deletedTrip) {
          return res.status(404).json({ message: 'Trip not found' });
      }
      res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

    
    // Update a trip
app.put('/api/trip/:id', async (req, res) => {
  try {
      const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTrip) {
          return res.status(404).json({ message: 'Trip not found' });
      }
      res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


    // Get a single trip by ID
app.get('/api/trip/:id', async (req, res) => {
  try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
          return res.status(404).json({ message: 'Trip not found' });
      }
      res.status(200).json(trip);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


  // Create a new trip
app.post('/api/trips', async (req, res) => {
  try {
      const { title, location, startDate, endDate, activities, photos } = req.body;
      const newTrip = new Trip({ title, location, startDate, endDate, activities, photos });
      await newTrip.save();
      res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Basic route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Travel Log API');
});

// app.get('/api/movies',(req, res)=>{
//     const myMovies = [
//         {
//             "Title": "Avengers: Infinity War",
//             "Year": "2018",
//             "imdbID": "tt4154756",
//             "Type": "movie",
//             "Poster": "https://example.com/poster1.jpg"
//         },
//         {
//             "Title": "Captain America: Civil War",
//             "Year": "2016",
//             "imdbID": "tt3498820",
//             "Type": "movie",
//             "Poster": "https://example.com/poster2.jpg"
//         },
//         {
//             "Title": "World War Z",
//             "Year": "2013",
//             "imdbID": "tt0816711",
//             "Type": "movie",
//             "Poster": "https://example.com/poster3.jpg"
//         }
//     ];

//     res.status(200).json({ myMovies });
// })

app.post('/api/trips', (req, res)=>{
    console.log(req.body);
})


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

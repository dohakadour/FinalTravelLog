const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// Set headers for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


mongoose.connect('mongodb+srv://DohaKadour:Douha@cluster0.6acyn.mongodb.net/');

// Define the Trip schema
const tripSchema = new mongoose.Schema({
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  photos: [String],
});

  // Create the Trip model
const Trip = mongoose.model('trips', tripSchema);
 

// Multer setup to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// create a trip
app.post('/api/trips', upload.array('photos', 5), async (req, res) => {
  try {
    const { title, location, startDate, endDate } = req.body;
    const photoPaths = req.files ? req.files.map(file => '/uploads/${file.filename}') : [];

    const newTrip = new Trip({
      title,
      location,
      startDate,
      endDate,
      photos: photoPaths, // Store photo paths in the database
    });

    await newTrip.save();
    res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
  } catch (err) {
    console.error(err); // Log the error to help debugging
    res.status(500).json({ error: 'Error creating trip', details: err.message });
  }
});

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



// Basic route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Travel Log API');
});


app.post('/api/trips', (req, res)=>{
    console.log(req.body);
})


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});

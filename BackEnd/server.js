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
mongoose.connect('mongodb+srv://DohaKadour:Douha2001@cluster0.6acyn.mongodb.net/');

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
  });

  const Movie = new mongoose.model('myMovies',movieSchema);
 

  app.get ('/api/movies', async (rea, res) => {
    const movies = await Movie.find({});
    res.status(200).json({movies})
    }) ;



    app.delete('/api/movie/:id', async (req, res) =>{
      const movie = await movie.findByIdAndDelete(req.params.id);
      res.status(200).send("Deleted: "+movie);
    })

    
    app.put('/api/movie/:id', async (req, res) => {
        let movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(movie);
    });

    app.get ('/api/movie/:id', async (req, res)=>{
    const movie = await Movie. findById(req.params.id);
    res. json (movie);

    });


  app.post('/api/movies', async (req, res)=>{
console.log(req.body)
    const { title, year, poster } = req.body;
   console.log(title)
    const newMovie = new Movie({ title, year, poster });
    await newMovie.save();
   
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    })


// Basic route to display a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying');
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

app.post('/api/movies', (req, res)=>{
    console.log(req.body);
})


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//setup this is silmilar to when we use our default tags in html

const express = require("express")
//we have to use cors in order to use a frontend and backend on the same device
var cors = require('cors')
//activate or t ell this pp variable to be an ewpress server
const app = express()
//const bodyParser = require('body-parser')
const Song = require("./models/songs")

app.use(cors())
//Middleware that parses HTTP request with json body
app.use(express.json())

const router = express.Router()

//grab all the songs in the db
router.get("/songs", async (req, res) => {
    try {
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err) {
        console.log(err)
    }
}
)

router.post("/songs", async (req, res) => {
    try {
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//grab a single song in database
router.get("/songs/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err) {
        res.status(400).send(err)
    }
})



//to find all songs ina database yhou just use the find() that isa built into mongoose
/*
Song.find(query, function (err, songs) {
    if (err) {
        res.status(400).send(err)
    } else {
        res.json(songs)
    }
})
*/

//start the web server... app.listen(portnumber, function)
/*app.listen(3000, function () {
    console.log("Listening on port 3000")
})*/

//making api using routes
//routes are ued to handle browser requests. they look likeurls. the difference is that
// when a browser rewquests a route, it is dynamically handled by using a function

//GET or a regular request when someone goes to http://localhost:3000/hello. when using a function a
//route almost always have a parameter or handle a response and reuqest

/*app.get("/hello", function (req, res) {
    res.send("<h1>Hello Express</h1>")
})

app.get("/goodbye", function (req, res) {
    res.send("<h1>Goodbye Express</h1>")
})
    

router.get("/songs", function (req, res) {
    const songs = [{
        title: "Uptown Funk",
        artist: "Bruno Mars",
        popularity: 10,
        releaseDate: new Date(2011, 9, 22),
        genre: ["funk", "boogie"]
    },
    {
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 10,
        releaseDate: new Date(2013, 11, 21),
        genre: ["funk", "boogie"]
    }
    ]
    res.json(songs)
})
*/



//all requests that usually use an api start with /api... so the url would be loacalhost:3000/api/songs
app.use("/api", router)
app.listen(3000)
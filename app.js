//setup this is silmilar to when we use our default tags in html

const express = require("express")
//we have to use cors in order to use a frontend and backend on the same device
var cors = require('cors')
//activate or t ell this pp variable to be an ewpress server
const app = express()
//const bodyParser = require('body-parser')
const Song = require("./models/songs")
const jwt = require('jwt-simple')
const User = require("./models/users")

app.use(cors())
//Middleware that parses HTTP request with json body
app.use(express.json())

const router = express.Router()
const secret = "supersecret"

//creating a new user
router.post("/user", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username or password" })
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    console.log(newUser)
    try {
        await newUser.save()
        res.sendStatus(201)//creqted
    }
    catch (err) {
    }
})

//authenticate or login
//post request - reason why is because wehn you login you are creatng what we call a new 'session'
router.post("/auth", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username or password" })
        return
    }
    //try to find the usernme in the database, then see if it matches with a username and password
    //await finding user
    let user = await User.findOne({ username: req.body.username })
    //connection or server error

    if (!user) {
        res.status(401).json({ error: "Bad Username" })
    }
    else {
        //check to see if the users pasoword matches the requests password
        if (user.password != req.body.password) {
            res.status(401).json({ error: "Bad Password" })
        }
        else {
            //succesfull login
            //create a token that is encoded with the jwt library, and send back the username.. this willbe 
            //we also will send back qs part of the token that you are current authorized
            //we could do this with a boolean or aq number value ii.e if auth = 0 you are not authorized, if auth =1
            //you are authorized

            username2 = user.username
            const token = jwt.encode({ username: user.username }, secret)
            const auth = 1

            //respond with the token
            res.json({
                username2,
                token: token,
                auth: auth
            })
        }
    }
})

//check status of ;user with a valid token, see if ti matches the front end token
router.get("/status", async (req, res) => {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth" })
    }

    //if x-auth contains the toekn (it should)
    const token = req.headers["x-auth"]
    try {
        const decoded = jwt.decode(token, secret)
        //send back all username adn staus fiedls to the user or front end
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch (ex) {
        res.status(401).json({ error: "invalid jwt" })
    }
})

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

//up[date is toupdate an existing rexord
router.put("/songs/:id", async (req, res) => {
    //first we need to find andupdqate the song the fron tnd wans us to updte
    //to do this we need to request the id fo the song form request
    //and the find it in the dtabese update it
    try {
        const song = req.body
        await Song.updateOne({ _id: req.params.id }, song)
    }
    catch (err) {
        res.status(400).send(err)
    }
}
)

router.delete("/songs/:id", async (req, res) => {
    //methjod or fufnciton in mongoose to delete a single instance of  song or object
    try {
        const song = await Song.findById(req.params.id)
        await Song.deleteOne({ _id: song._id })
        res.sendStatus(200)
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
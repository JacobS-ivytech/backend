//setup this is silmilar to when we use our default tags in html

const express = require("express")
//activate or t ell this pp variable to be an ewpress server
const app = express()
const router = express.Router()

//start the web server... app.listen(portnumber, function)
app.listen(3000, function () {
    console.log("Listening on port 3000")
})

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
    */
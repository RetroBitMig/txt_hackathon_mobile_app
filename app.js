var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mijiisan:dogs1234@ds139994.mlab.com:39994/scla-demo");

// try settings the schema for the json
var appSchema = new mongoose.Schema({
    name: String,
    grades: String,
    school: String,
    numberType: String,
    number: String,
    teacher: String,
    counselor: String
   });
 
var SCLA = mongoose.model("SCLA", appSchema);


app.use("/img", express.static(__dirname + '/img'));

app.use(express.static("www"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });
 

app.post("/submit", (req, res) => {
    var newApp = new SCLA(req.body);
    newApp.save()
    .then(item => {
        res.send("Application saved to database!");
        console.log(JSON.stringify(newApp));
    })
    .catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});
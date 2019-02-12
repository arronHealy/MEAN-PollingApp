
//required vars & mongo connection
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDb = 'mongodb://arronHealy:<EnterPassword>@ds137913.mlab.com:37913/learning-mongo-db';

mongoose.connect(mongoDb);

//------------------------------------------------------------------

//define mongoose schema
var Schema = mongoose.Schema;

//define schema for poll options
var PollOptionSchema = new Schema({
    answer: String,
    numVotes: Number
});

//define schema for poll takes poll option schema array
var PollSchema = new Schema({
    question: String,
    options: [PollOptionSchema],
    totalVotes: Number
});

//mongoose model
var PollModel = mongoose.model('PollModel', PollSchema);

//------------------------------------------------------------------

//use body parser for data access

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handle cross origin errors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//------------------------------------------------------------------

//post poll to Mongo DB

app.post('/api/polls', function(req, res) {
    
//create poll in DB
    PollModel.create({
        question: req.body.question,
        options: req.body.options,
        totalVotes: req.body.totalVotes
    });

    res.status(201).json({message: "POST - Poll Created Successfully"});

});

//------------------------------------------------------------------

//get polls from Mongo DB

app.get('/api/polls', function(req, res) {
    
    PollModel.find(function(err, polls) {
        if(err){
            res.status(404).json({message: "Error GET Failed Polls not found"});
        }
        else{
            res.status(201).json(polls);
        }
    });
});

//------------------------------------------------------------------

//get specific poll by ID

app.get('/api/polls/:id', function(req, res) {

//use find method to match poll 
    PollModel.find( {_id: req.params.id}, function(err, data) {
        if(err){

            res.status(404).json({message: "Error GET Failed Poll Not Found"});

            return handleError(err);
        }
        else{
            res.status(201).json(data);
        }
    });
});

//------------------------------------------------------------------

//delete poll from DB by ID

app.delete('/api/polls/:id', function(req, res) {
    console.log('server delete id: ' + req.params.id);

    PollModel.deleteOne({ _id: req.params.id }, function(err) {
        if(err){
            res.status(404).json({message: "DELETE - Not Deleted Poll Not Found"})
        }
        else{
            res.status(200).json({message: "Poll Successfully Deleted"});
        }        
    });
});

//------------------------------------------------------------------

//edit existing poll find by ID

app.put('/api/polls/:id', function(req, res){
    
//find by ID and update poll
    PollModel.findByIdAndUpdate(req.params.id, req.body, function(err, poll) {
        if(err){
            res.status(404).json({message: "PUT - No Update Poll Not Found"});

            return next(err);
        }
        else{
            res.status(201).json(poll);
        }
    });
    
});

//------------------------------------------------------------------

//launch app on local host 8081 from angular folder

app.use("/", express.static(path.join(__dirname, "AngularPollingApp")));


app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "AngularPollingApp", "index.html"));
});

//------------------------------------------------------------------

//configure server

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Polling app listening at http://%s:%s', host, port)
});

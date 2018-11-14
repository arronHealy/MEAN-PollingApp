var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
//const url = 'mongodb://arronHealy:IrksDory15@ds137913.mlab.com:37913/learning-mongo-db';
var mongoDb = 'mongodb://arronHealy:IrksDory15@ds137913.mlab.com:37913/learning-mongo-db';
mongoose.connect(mongoDb);

var Schema = mongoose.Schema;

var PollOptionSchema = new Schema({
    answer: String,
    numVotes: Number
});

var PollSchema = new Schema({
    question: String,
    options: [PollOptionSchema],
    totalVotes: Number
});

var PollModel = mongoose.model('PollModel', PollSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/api/polls', function(req, res) {
    console.log(req.body.question);
    console.log(req.body.options);
    console.log(req.body.totalVotes);

    PollModel.create({
        question: req.body.question,
        options: req.body.options,
        totalVotes: req.body.totalVotes
    });
    console.log('Inserting item');
    res.send("Polls added successfully");

});

app.get('/api/polls', function(req, res) {
    
    PollModel.find(function(err, polls) {
        if(err){
            res.send(err);
        }
        else{
            res.json(polls);
        }
    });
});


app.get('/api/polls/:id', function(req, res) {

    PollModel.find( {_id: req.params.id}, function(err, data) {
        if(err){
            return handleError(err);
        }
        else{
            res.json(data);
        }
    });
});

app.delete('/api/polls/:id', function(req, res) {
    console.log('server delete id: ' + req.params.id);

    PollModel.deleteOne({ _id: req.params.id }, function(err) {});
});


app.put('/api/polls/:id', function(req, res){
    
    
    PollModel.findByIdAndUpdate(req.params.id, req.body, function(err, poll) {
        if(err){
            return next(err);
        }
        else{
            res.json(poll);
        }
    });
    
});

/*
app.put('/api/polls/:id', function(req, res) {

    PollModel.findByIdAndUpdate(req.params.id, req.body, function(err, poll) {
        if(err){
            return next(err);
        }
        else{
            res.json(poll);
        }
    })
});
*/

app.listen(8080);

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});
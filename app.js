var express = require('express');
var	mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://jarrad:jarrad@ds045021.mongolab.com:45021/api-demo');

var Book = require('./models/booksModel.js')

var app = express();

var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var bookRouter = require('./routes/books.js')(Book)

app.use('/api/books', bookRouter)



app.listen(port, function() {
	console.log('Running on port ' + port)
})
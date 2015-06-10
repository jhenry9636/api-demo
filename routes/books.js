var express = require('express');
var bookRouter = express.Router();

var routes = function(Book) {
	bookRouter.route('/')
		.get(function(req, res) {
			Book.find(req.query, function(err, books) {
				if(err) {
					res.status(500).send(err)
				}
				else {
					res.json(books)
				}
			})
		})
		.post(function(req, res) {
			console.log(req.body)
			var book = new Book(req.body);
			book.save();
			res.status(200).send(book)
		})

	bookRouter.use('/:bookId', function(req, res, next) {
		Book.findById(req.params.bookId, function(err, book) {
			if(err) {
				throw err
			}
			else if(book) {
				req.book = book
				next()
			}
			else {
				res.status(404).send('No book found!')
			}
		})
	})

	bookRouter.route('/:bookId')
		.get(function(req, res) {
			res.json(req.book)
		})
		.put(function(req, res) {
			Book.findById(req.params.bookId, function(err, book) {
				if(err) {
					throw err
				}
				else {
					req.book.title = req.body.title
					req.book.author = req.body.author
					req.book.genre = req.body.genre
					req.book.read = req.body.read
					req.book.save();
					res.json(req.book)
				}
			})
		})
		.delete(function(req, res) {
			req.book.remove(function(err) {
				if(err)
					throw err
				else {
					res.status(204).send('Removed')
				}
			})
		})

	return bookRouter
}


module.exports = routes
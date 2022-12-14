const Book = require("../models/bookmodel");

exports.getOneBook = (req, res, next) => {
    Book.findById(req.params, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.getAllBooks = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.redirectView = (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
}

exports.delete = (req, res, next) => {
    let _id = req.params.id;
    Book.findByIdAndRemove(_id)
      .then(() => {
        res.locals.redirect = "/admin";
        next();
      })};

exports.edit = (req, res, next) => {
    let _id = req.params.id;
    Book.findByIdAndUpdate(_id)
        .then(() => {
        res.locals.redirect = "/admin";
        next();
        })};

exports.save = (req, res, next) => {
   console.log (req)
    let id = {
        _id: req.body.ID
    }
    let userParams = {
        Name: req.body.Name,
        Author: req.body.Author,
    };
    books.findByIdAndUpdate(id, userParams)
    .then(()=> {
        res.locals.redirect = "/admin";
        next();
    })
    .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
    }); 
    }

exports.createNewBook = (req, res, next) => {
        let bookParams = new Book({
          name: req.title,
          authorname: req.author,
        });
        bookParams.save((error, savedBook) => {
          if (error) next(error);
          res.locals.redirect = "/admin";
          next();
        });
    }
const port = 3000,
  express = require("express"),
  app = express();
const path = require('path')
const mongoose = require ("mongoose");
const Book = require("./models/bookmodel");
const booksController = require('./controllers/book');
const dbURI = 'mongodb+srv://johnny4737:bomber09@cluster0.qgwa115.mongodb.net/books?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err)
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Ah! connected to MongoDB using Mongoose!!");
});

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use('/public/images', express.static('./public/images'))



  app
    .get("/", (req, res) => {
      res.render("home")
      })
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//admin
  app
  .get("/admin", booksController.getAllBooks, (req, res) => {
    res.render("admin", {books: req.data})
    });
///////////////////////////////////////////////////////////////////////
//delete
  app.get("/delete/:id", booksController.delete, booksController.redirectView);
////////////////////////////////////////////////////////
//edit
  app.post("/edit/save", booksController.save, booksController.redirectView);
save: (req, res, next) => {
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
},
  app.get(
    //"/books/:_id/edit", booksController.getOneBook,
    "/edit/:_id", booksController.getOneBook,
    (req, res) => {
      res.render('editpage', {bookmodel: req.data});
    }
  );
////////////////////////////////////////////////////////////////////////////////
//create new book
  app.get("/addnewbook", (req, res) => {
     res.render("addnew");
      })

  app.post("/addnewbook/save", booksController.createNewBook, booksController.redirectView)
  
  
  app.get("/book1", (req, res) => {
     res.render("book1");
      })

  app
    .get("/bookslist", (req, res) => {
      res.render("bookslist");
      })

  app.get(
    "/books", booksController.getAllBooks,
    (req, res) => {
      res.send(req.data);
    }
  );
  
  app.get(
    "/books/:_id", booksController.getOneBook,
    (req, res) => {
      res.render('book1', {bookmodel: req.data});
    }
  );




app.get("*", (req,res) => {
  res.render("error")
    })




  .listen(port, () => {
    console.log(
      `The Express.js server has started and is listening ➥ on port number: ${port}`
    );
  }); 
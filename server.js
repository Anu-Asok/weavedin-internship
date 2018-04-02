var express = require('express');
const app = express();
// var morgan = require('morgan');
// app.use(morgan('combined'));
var path = require('path');
var mysql = require('mysql');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
var pool  = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "library"
});


function createBooksTemplate(data){
  var cards = '';
  for(var i=0; i<data.length; i++)
    cards += (
      `<div class="card">
        <div class="card-header">
          <div class="book-icon">
            <img src="/img/book_icon.svg" alt="book_icon">
          </div>
          <div class="book-details">
            <a href="/books/${data[i].id}"><span class="title">${data[i].title}</span></a>
            <span class="isbn">ISBN: ${data[i].isbn}</span>
            <br>
            by: <a href="/authors/${data[i].author_id}"><span class="author">${data[i].name}</span></a>
            <p class="card-content">
              ${data[i].description}
            </p>
          </div>
        </div>
      </div>`
    );
  var booksTemplate = (
    `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Library | Books</title>
          <link rel="stylesheet" href="/css/roboto-font.css">
          <link rel="stylesheet" href="/css/semantic.min.css">
          <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
          <div id="header">
            <div id="header-title">
              <a href="/">Library.</a>
            </div>
            <div id="header-options">
              <a href="#" class="option selected">
                Books
                <div>-</div>
              </a>
              <a href="/authors" class="option">
                Authors
                <div>-</div>
              </a>
            </div>
          </div>
          <div id="content">
            <div class="cards">
              <div class="stat">
                Books
                <span id="count">
                  ${data.length} book(s)
                </span>
              </div>
              ${cards}
            </div>
            <div class="add-btn">
              <button type="button" id="add-books" class="ui button primary add">Add Books</button>
            </div>
          </div>
          <div class="ui modal">
            <div class="content">
              <div class="modal-header">ADD BOOK</div>
              <div class="ui form">
                <div class="ui field">
                  <input type="text" placeholder="Book Name" id="book-title">
                </div>
                <div class="ui field">
                  <select class="ui search dropdown" id="book-author">
                  </select>
                </div>
                <div class="ui field">
                  <input type="text" id="book-isbn" placeholder="ISBN">
                </div>
                <div class="field">
                  <textarea placeholder="Description of content" rows="6" id="description"></textarea>
                </div>
                <div class="fields">
                  <div class="eight wide field cancel">
                    <button type="button" name="button" class="ui button fluid primary">Cancel</button>
                  </div>
                  <div class="eight wide field">
                    <button type="button" id="save-book" name="button" class="ui button fluid primary">Save Book</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <script src="/js/jquery.min.js"></script>
          <script src="/js/semantic.min.js"></script>
          <script src="/js/book.js"></script>
        </body>
      </html>`
  );
  return booksTemplate;
}
app.get('/', (req,res) => {
  var query = "SELECT book.*, author.name FROM author, book WHERE book.author_id = author.id";
  pool.query(query, function (err, result) {
    if (err) console.log(err);
    else
      res.send(createBooksTemplate(result));
  });
});


function createBookTemplate(data){
  var template = (
    `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Library | Books</title>
          <link rel="stylesheet" href="/css/roboto-font.css">
          <link rel="stylesheet" href="/css/semantic.min.css">
          <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
          <div id="header">
            <div id="header-title">
              <a href="/">Library.</a>
            </div>
            <div id="header-options">
              <a href="/" class="option">
                Books
                <div>-</div>
              </a>
              <a href="/authors" class="option">
                Authors
                <div>-</div>
              </a>
            </div>
          </div>
          <div id="content">
            <div id="breadcrumb">
              Books / <span id="breadcrumb-title"> Details</span>
            </div>
            <br>
            <div id="book-description">
              <div class="card-header">
                <div class="book-icon">
                  <img src="/img/book_icon.svg" alt="book_icon">
                </div>
                <div class="book-details">
                  <span class="title">${data.title}</span>
                  <span class="isbn">ISBN: ${data.isbn}</span>
                  <br>
                  by: <a href="#"><span class="author">${data.name}</span></a>
                  <p class="card-content">
                    ${data.description}
                  </p>
                </div>
              </div>
            </div>
            <div id="prev-next">
              <div id="arrow-options">
                <a id="prev-icon">
                  <img src="/img/prev_icon.svg" alt="">
                </a>
                <a id="next-icon">
                  <img src="/img/next_icon.svg" alt="">
                </a>
              </div>
              <br>
            </div>
          </div>
          <script src="/js/jquery.min.js"></script>
          <script src="/js/semantic.min.js"></script>
          <script src="/js/options-book.js"></script>
        </body>
      </html>`
  );
  return template;
}
app.get('/books/:id', (req,res) => {
  var id = req.params.id;
  var query = "SELECT book.*, author.name FROM book, author WHERE book.id='"+id+"' AND book.author_id=author.id";
  pool.query(query, function (err, result) {
      if (err) console.log(err);
    else{
      if(result.length == 1)
        res.send(createBookTemplate(result[0]));
      else
        res.send("Sorry! We coudn't find any book with this id.");
    }
  });
});

function createAuthorsTemplate(data){
  var cards = '', obj;
  for(var i=0; i<data.length; i++){
    obj=data[i];
    var card = `
      <div class="card">
        <div class="card-header">
          <div class="author-icon">
            <img src="img/author_icon.svg" alt="book_icon">
          </div>
          <div class="author-details">
            <a href="/authors/${obj.id}"><span class="author">${obj.name}</span></a>
            <span class="birth-place">Born in ${obj.born_in}</span>
            <br>
            <span class="age-gender">Age ${obj.age} / ${obj.gender}</span>
          </div>
        </div>
      </div>
    `;
    cards += card;
  }
  var template = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Library | Books</title>
      <link rel="stylesheet" href="css/roboto-font.css">
      <link rel="stylesheet" href="css/semantic.min.css">
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <div id="header">
        <div id="header-title">
          <a href="/">Library.</a>
        </div>
        <div id="header-options">
          <a href="/" class="option">
            Books
            <div>-</div>
          </a>
          <a href="/authors" class="option selected">
            Authors
            <div>-</div>
          </a>
        </div>
      </div>
      <div id="content">
        <div class="cards">
          ${cards}
        </div>
        <div class="add-btn">
          <button type="button" id="add-authors" class="ui button primary add">Add Authors</button>
        </div>
      </div>
      <div class="ui modal">
        <div class="content">
          <div class="modal-header">ADD AUTHOR</div>
          <div class="ui form">
            <div class="ui field">
              <input type="text" placeholder="Author Name" id="author-name">
            </div>
            <div class="fields">
              <div class="eight wide field">
                <input type="number" placeholder="Age" id="author-age">
              </div>
              <div class="eight wide field">
                <select class="ui search dropdown" id="author-gender">
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>
            <div class="ui field">
              <input type="text" placeholder="Born in" id="author-birth-place">
            </div>
            <div class="field">
              <textarea placeholder="About Author" rows="6" id="about-author"></textarea>
            </div>
            <div class="fields">
              <div class="eight wide field cancel">
                <button type="button" name="button" class="ui button fluid primary">Cancel</button>
              </div>
              <div class="eight wide field">
                <button type="button" name="button" id="save-author" class="ui button fluid primary">Save Author</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="js/jquery.min.js"></script>
      <script src="js/semantic.min.js"></script>
      <script src="js/author.js"></script>
    </body>
  </html>
  `;
  return template;
}
app.get('/authors', (req,res) => {
  var query = "SELECT * FROM author", data;
  pool.query(query, function (err, result) {
    if (err) console.log(err);
    else{
      res.send(createAuthorsTemplate(result));
    }
  });
});


function createAuthorTemplate(obj){
  var cards = '';
  for(var i=0; i<obj.books.length; i++)
    cards += (
      `<div class="card">
        <div class="card-header">
          <div class="book-icon">
            <img src="/img/book_icon.svg" alt="book_icon">
          </div>
          <div class="book-details">
            <span class="title">${obj.books[i].title}</span>
            <span class="isbn">ISBN: ${obj.books[i].isbn}</span>
            <br>
            <p class="card-content">
              ${obj.books[i].description}
            </p>
          </div>
        </div>
      </div>`
    );
  var template = (
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Library | Books</title>
        <link rel="stylesheet" href="/css/roboto-font.css">
        <link rel="stylesheet" href="/css/semantic.min.css">
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <div id="header">
          <div id="header-title">
            <a href="/">Library.</a>
          </div>
          <div id="header-options">
            <a href="/" class="option">
              Books
              <div>-</div>
            </a>
            <a href="/authors" class="option">
              Authors
              <div>-</div>
            </a>
          </div>
        </div>
        <div id="content">
          <div id="breadcrumb">
            Authors / <span id="breadcrumb-title"> Details</span>
          </div>
          <br>
          <div id="author-description">
            <div class="card-header">
              <div class="book-icon">
                <img src="/img/author_icon.svg" alt="book_icon">
              </div>
              <div class="author-details">
                <span class="author">${obj.author.name}</span>
                <span class="birth-place">Born in ${obj.author.born_in}</span>
                <br>
                <span class="age-gender">Age ${obj.author.age} / ${obj.author.gender}</span>
                <p class="card-content">
                  Lorem ipsum dolor sit amet
                </p>
                <span id="books-written">BOOKS WRITTEN ${obj.books.length}</span>
              </div>
            </div>
            <div class="cards">
              ${cards}
            </div>
          </div>
          <div id="prev-next">
            <div id="arrow-options">
              <a href="#" id="prev-icon">
                <img src="/img/prev_icon.svg" alt="">
              </a>
              <a href="#" id="next-icon">
                <img src="/img/next_icon.svg" alt="">
              </a>
            </div>
          </div>
        </div>
        <script src="/js/jquery.min.js"></script>
        <script src="/js/semantic.min.js"></script>
        <script src="/js/options-author.js"></script>
      </body>
    </html>`
  );
  return template;
}
app.get('/authors/:id', (req,res) => {
  var id = req.params.id, data={};
  pool.query("SELECT * FROM author WHERE id='"+id+"'", function (err, result) {
    if (err) console.log(err);
    else{
      data['author'] = result[0];
      pool.query("SELECT * FROM book WHERE author_id='"+id+"'", function (err, result) {
        if (err) console.log(err);
        else{
          data['books'] = result;
          res.send(createAuthorTemplate(data));
        }
      });
    }
  });
});

app.post('/add-author', (req,res) => {
  var obj = req.body;
  var values = `'${obj.name}','${obj.age}','${obj.gender}','${obj.birthPlace}','${obj.about}'`;
  var query = "INSERT INTO author (name, age, gender, born_in, about) VALUES ("+values+")";
  pool.query(query, function (err, result) {
    if (err) res.status(500).send(err.toString());
    else{
      res.send('Added successfully!');
    }
  });
});

app.post('/add-book', (req,res) => {
  var obj = req.body;
  var values = `'${obj.title}','${obj.author_id}','${obj.isbn}','${obj.description}'`;
  var query = "INSERT INTO book (title, author_id, isbn, description  ) VALUES ("+values+")";
  pool.query(query, function (err, result) {
    if (err) res.status(500).send(err.toString());
    else{
      res.send('Added successfully!');
    }
  });
});

app.get('/prev/:table/:curId', (req,res) => {
  var curId = req.params.curId, table = req.params.table;
  pool.query("SELECT id FROM " + table + " WHERE id < '" + curId + "' ORDER BY id DESC LIMIT 1", (err, result) => {
    if(err)
      res.status(500).send(JSON.stringify(err));
    else
      if (result.length == 1)
        res.send((result[0].id).toString());
      else
        res.send('#');
  });
});

app.get('/next/:table/:curId', (req,res) => {
  var curId = req.params.curId, table = req.params.table;
  pool.query("SELECT id FROM " + table + " WHERE id > '" + curId + "' ORDER BY id ASC LIMIT 1", (err, result) => {
    if(err)
      res.status(500).send(JSON.stringify(err));
    else
      if (result.length == 1)
        res.send((result[0].id).toString());
      else
        res.send('#');
  });
});

app.get('/get-authors', (req,res) => {
  var query = "SELECT id,name FROM author;", options='';
  pool.query(query, function (err, result) {
    if (err) console.log(err);
    else{
      for(var i=0; i<result.length; i++)
        options += `<option value="${result[i].id}">${result[i].name}</option>`;
      res.send(options);
    }
  });
});

app.get('/:folder/:fileName', (req,res) => {
  var folder = req.params.folder, fileName = req.params.fileName;
  res.sendFile(path.join(__dirname,'ui',folder,fileName));
});


app.listen(8080, () => console.log('App running at port 8080'));

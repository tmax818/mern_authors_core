# mern_authors_core


## solution branch


## create `server`:

```bash
mkdir -p server/config server/controllers server/models server/routes
touch server/config/mongoose.config.js server/controllers/author.controller.js server/models/author.model.js server/routes/author.routes.js server.js .env
npm init -y
npm i cors dotenv express mongoose nodemon
```

[server.js](server.js)

```js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
require('./server/config/mongoose.config'); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// TODO: change to the correct routes file:
require('./server/routes/author.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
```

[.env](.env)

```dotenv
PORT=8000
DB=setup
# mongo atlas connection
ATLAS_USERNAME=root
ATLAS_PASSWORD=root
CONNECTION_STRING=cluster0.cri5yzp.mongodb.net
```

[mongoose.config.js](./server/config/mongoose.config.js)

```js
const mongoose= require('mongoose');
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;
const connection_string = process.env.CONNECTION_STRING
const uri = `mongodb+srv://${username}:${pw}@${connection_string}/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => console.log(`Established a connection to the ${dbName} database`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
```


[author.controller.js](./server/controllers/author.controller.js)
```js
const { Author } = require('../models/author.model');
const {res} = require("express");
module.exports.index = (req, res) => {
    res.json({
        message: "Hello World"
    });
}

module.exports.createAuthor = (req, res) => {
    const { firstName, lastName } = req.body;
    Author.create({
        firstName,
        lastName
    })
        .then(author => res.json(author))
        .catch(err => res.json(err));
}

module.exports.getAllPeople = (req, res) => {
    Author.find({})
        .then(authors => res.json(authors))
        .catch(err => res.json(err))
}

module.exports.getAuthor = (req, res) => {
    Author.findOne({_id:req.params.id})
        .then(author => res.json(author))
        .catch(err => res.json(err))
}

module.exports.updateAuthor = (request, response) => {
    Author.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedAuthor => response.json(updatedAuthor))
        .catch(err => response.json(err))
}

module.exports.deleteAuthor = (request, response) => {
    Author.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation =>response.json(deleteConfirmation))
        .catch(err =>response.json(err))
}
```
[author.model.js](./server/models/author.model.js)

```js
const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema({  // TODO rename schema
    // TODO add attributes and validaations
    firstName: { type: String },
    lastName: { type: String }
}, { timestamps: true });
module.exports.Author = mongoose.model('Author', AuthorSchema);
```
[author.routes.js](./server/routes/author.routes.js)

```js
// TODO rename controller file
const AuthorController = require('../controllers/author.controller');

module.exports = function(app){
    app.get('/api', AuthorController.index);
    app.post('/api/authors', AuthorController.createAuthor);
    app.get('/api/authors', AuthorController.getAllPeople); // add route to get all authors
    app.get('/api/authors/:id', AuthorController.getAuthor); // get one
    app.patch('/api/authors/:id', AuthorController.updateAuthor); //update
    app.delete('/api/authors/:id', AuthorController.deleteAuthor);
}

```
## create `client`:

```bash
npx create-react-app client

```

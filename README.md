# mern_authors_core


## solution branch


# create `server`:

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
# create `client`:

```bash
npx create-react-app client
cd client
```

## install dependencies

```bash
npm i react-router-dom axios 
```
modify [index.js](./client/src/index.js)

```html
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";  <!--TODO -->

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <BrowserRouter> <!--TODO -->
        <App />
    </BrowserRouter> <!--TODO -->
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

add [Main.jsx](./client/src/views/Main.jsx)

```jsx
import React, { useEffect, useState } from 'react'
import AuthorForm from '../components/AuthorForm';
import AuthorList from '../components/AuthorList';
import axios from "axios";

const Main = (props) => {
    const [authors, setAuthors] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/authors')
            .then(res=>{
                setAuthors(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[authors]);

    return (
        <div>
            <AuthorForm/>
            <hr/>
            {loaded && <AuthorList authors={authors}/>}
        </div>
    )
}

export default Main;
```

add [AuthorForm.jsx](./client/src/components/AuthorForm.jsx)

```jsx
import {useState} from "react";
import axios from "axios";


const AuthorForm = () => {
    //keep track of what is being typed via useState hook
    // TODO modify state variables as appropriate
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of submit
        e.preventDefault();
        //make a post request to create a new author
        axios.post('http://localhost:8000/api/authors', {
                firstName,
                lastName
            }
        )
            .then(res=>console.log(res))
            .catch(err=>console.log(err))

        setFirstName("");
        setLastName("");
    }
    //onChange to update firstName and lastName
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>First Name</label><br/>
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
            </p>
            <input type="submit"/>
        </form>
    )
}

export default AuthorForm;
```

add [AuthorList.jsx](./client/src/components/AuthorList.jsx)

```jsx
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthorList = (props) => {
    const { removeFromDom } = props;

    const deleteAuthor = (authorId) => {
        axios.delete('http://localhost:8000/api/authors/' + authorId)
            .then(res => {
                removeFromDom(authorId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            {props.authors.map((author, idx) => {
                return <p key={idx}>
                    <Link to={"/people/" + author._id}>
                        {author.lastName}, {author.firstName}
                    </Link>
                    |
                    <button onClick={(e)=>{deleteAuthor(author._id)}}>
                        Delete
                    </button>
                </p>
            })}
        </div>
    )
}

export default AuthorList;

```
const AuthorController = require('../controllers/author.controller');

module.exports = function(app){
    app.get('/api', AuthorController.index);
    app.post('/api/authors', AuthorController.createAuthor);
    app.get('/api/authors', AuthorController.getAllPeople); // add route to get all authors
    app.get('/api/authors/:id', AuthorController.getAuthor); // get one
    app.patch('/api/authors/:id', AuthorController.updateAuthor); //update
    app.delete('/api/authors/:id', AuthorController.deleteAuthor);
}
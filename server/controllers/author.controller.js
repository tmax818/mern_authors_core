const { Author } = require('../models/author.model');
const {res} = require("express");
module.exports.index = (req, res) => {
    res.json({
        message: "Hello World"
    });
}
// The method below is new
module.exports.createAuthor = (req, res) => {
    const { firstName, lastName } = req.body;
    Author.create({
        firstName,
        lastName
    })
        .then(author => res.json(author))
        .catch(err => res.json(err));
}
// add in list and detail
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


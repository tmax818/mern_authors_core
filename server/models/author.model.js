const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Name is required"
        ],
        minLength: [3, 'Name should be at least three characters']
    },
}, { timestamps: true });
module.exports.Author = mongoose.model('Author', AuthorSchema);


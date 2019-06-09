const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);

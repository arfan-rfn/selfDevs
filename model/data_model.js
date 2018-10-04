'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    DOB: Date
});

module.exports = {
    test: mongoose.model('Test', dataSchema),
    user: mongoose.model('User', userSchema)
};


'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    username: {type: String, unique: true, lowercase: true, trim: true},
    password: String,
    email: String,
    mobile: Number,
    enroll: [ObjectId],
    teach: [ObjectId],
    comments: [ObjectId],
    profile: String,
    ratings: {},
    dob: {type: Date},
    date: {type: Date, default: Date.now()},
});

var courseSchema = new Schema({
    author: [ObjectId],
    title: String,
    desc: String,
    topic: [String],
    tags: [String],
    lectures: [ObjectId],
    enrollment: Number,
    score: Number,
    voters: Number,
    date: {type: Date, default: Date.now()},
});

var lectureSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var commentSchema = new Schema({
    desc: String,
    type: String,
    parent: ObjectId,
    author: ObjectId,
    child: [ObjectId],
    date: {type: Date, default: Date.now()},
});

module.exports = {
    user: mongoose.model('User', userSchema),
    course: mongoose.model('Courses', courseSchema),    
    lecture: mongoose.model('Lectures', lectureSchema),
    comment: mongoose.model('Comments', commentSchema),
};


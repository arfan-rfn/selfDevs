'use strict';

var commentTypeEnum = {
    QUESTION: "question",
    ANSWER: "answer",
    REVIEW: "review",
    COMMENT: "comment"
};

var schemaEnum = {
    USER: 'user',
    COURSE: 'course',
    LECTURE: 'lecture',
    COMMENT: 'comment'
}
module.exports = {
    commentType: Object.freeze(commentTypeEnum), // for mongo schema
    schemaType: Object.freeze(schemaEnum), 
};
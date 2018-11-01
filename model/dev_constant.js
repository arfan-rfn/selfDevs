var commentTypeEnum = {
    QUESTION: "question",
    ANSWER: "answer",
    REVIEW: "review",
    COMMENT: "comment"
};

module.exports = {
    commentType: Object.freeze(commentTypeEnum), // for mongo schema
};
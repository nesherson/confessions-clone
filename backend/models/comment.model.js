const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      required: true,
    },
    dislike: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

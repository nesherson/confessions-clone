const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
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
    comment_num: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

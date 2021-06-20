const router = require('express').Router();

const Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .then((posts) => {
      return res.json(posts);
    })
    .catch((err) => {
      return res.status(404).json(`Error: ${err}`);
    });
});

router.route('/add-post').post((req, res) => {
  const body = req.body.body;
  const likes = Number(req.body.likes);
  const dislikes = Number(req.body.dislikes);
  const comments = req.body.comments;
  const date = Date.parse(req.body.date);

  const newPost = new Post({ body, likes, dislikes, comments, date });
  newPost
    .save()
    .then(() => {
      return res.json('Post added!');
    })
    .catch((err) => {
      return res.json(`Error: ${err}`);
    });
});

router.route('/post/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      return res.json(post);
    })
    .catch((err) => {
      return res.status(404).json(`Error: ${err}`);
    });
});

router.route('/post/delete/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.json('Post Deleted!');
    })
    .catch((err) => {
      return res.status(404).json(`Error: ${err}`);
    });
});

router.route('/post/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.query.like) {
        const newLikes = post.likes + 1;
        post.likes = newLikes;
      } else if (req.query.dislike) {
        const newDislikes = post.dislikes + 1;
        post.dislikes = newDislikes;
      } else if (req.query.comment) {
        const body = req.body.body;
        const likes = Number(req.body.likes);
        const dislikes = Number(req.body.dislikes);
        const date = Date.parse(req.body.date);
        const newComment = {
          body: body,
          likes: likes,
          dislikes: dislikes,
          date: date,
        };

        post.comments.push(newComment);
      }

      post
        .save()
        .then(() => {
          return res.json('Post Updated!');
        })
        .catch((err) => {
          return res.status(404).json(`Error: ${err}`);
        });
    })
    .catch((err) => {
      return res.status(404).json(`Error: ${err}`);
    });
});

module.exports = router;

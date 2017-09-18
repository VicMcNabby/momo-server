const express = require('express');
const queries = require('../db/queries')
const bcrypt = require('bcrypt');
const valid = require('./validate');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();


router.get('/moms', (req, res, next) => {
  queries.getAllMoms().then(moms => {
    res.json(moms);
  });
});

router.get('/moms/:id', (req, res, next) => {
  queries.getMomById(req.params.id).then(mom => {
    res.json(mom);
  });
});

router.get('/posts', (req, res, next) => {
  queries.getPosts().then(posts => {
    res.json(posts);
  });
});

router.get('/comments/:id', (req, res, next) => {
  queries.getCommentsByPostId(req.params.id).then(comments => {
    res.json(comments);
  });
});

router.get('/posts/comments', (req, res, next) => {
  queries.getCommentsAndPosts(req.params.id).then(posts => {
    res.json(posts);
  });
});

router.get('/posts/:id', (req, res, next) => {
  queries.getPostById(req.params.id).then(post => {
    res.json(post);
  });
});

router.post('/posts', (req, res, next) => {
  queries.createPost(req.body).then(response => {
    res.json(response[0]);
  });
});

router.post('/comments', (req, res, next) => {
  queries.createComment(req.body).then(response => {
    res.json(response[0]);
  });
});

router.post('/auth/login', (req, res, next) => {
  if (valid.user(req.body)) {
    queries.getUserByEmail(req.body.email).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            jwt.sign({
              id: user.id
            }, process.env.TOKEN_SECRET, (err, token) => {
              console.log('err and token: ', err, token);
              res.json({
                message: `Logged in`,
                token,
                id: user.id
              });
            });
          } else {
            next(new Error("Invalid Email/Password 1"))
          }
        });
      } else {
        next(new Error("Invalid Email/Password 2"))
      }
    });
  } else {
    next(new Error("Invalid Email/Password 3"))
  }
});

router.post('/users', (req, res, next) => {
  if (valid.user(req.body)) {
    queries.getUserByEmail(req.body.email).then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            let user = {
              name: req.body.name,
              email: req.body.email,
              password: hash
            };
            queries.createUser(user).then(user => {
              res.json({
                message: "Success",
                user
              });
            });
          });
      } else {
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid Password"));
  }
});

module.exports = router

const posts = require('./seeds-data/posts')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE posts RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('posts').insert(posts);
    });
};

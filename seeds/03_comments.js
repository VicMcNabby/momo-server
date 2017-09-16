const comments = require('./seeds-data/comments')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE comments RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('comments').insert(comments);
    });
};

const mom = require('./seeds-data/mom')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE mom RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('mom').insert(mom);
    });
};

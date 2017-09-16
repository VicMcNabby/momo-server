exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('mom', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.text('location');
      table.text('interests');
      table.text('children');
      table.text('image');
    });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mom')
};

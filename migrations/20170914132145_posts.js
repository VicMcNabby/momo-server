exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.text('post').notNullable();
    table.integer('mom_id').references('mom.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('posts');
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('comment').notNullable();
    table.integer('posts_id').references('posts.id').unsigned().onDelete('cascade');
    table.integer('mom_id').references('mom.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('comments');
};

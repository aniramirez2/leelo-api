
exports.up = function(knex) {
  return knex.schema.createTable('book', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.string('genre').notNullable();
    table.string('status').notNullable();
    table.string('pages');
    table.string('language');
    table.string('review');
    table.float('score');
    table.string('editorial');
    table.string('bookLayer');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('book');
};

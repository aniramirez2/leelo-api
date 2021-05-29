
exports.up = function(knex) {
  return knex.schema.createTable('user_books', function (table) {
    table.increments('id').primary()
    table.date('date_rented').notNullable();
    table.date('date_returned').notNullable();

    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user');

    table.string('book_id').notNullable();
    table.foreign('book_id').references('id').inTable('book');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('user_books');
};

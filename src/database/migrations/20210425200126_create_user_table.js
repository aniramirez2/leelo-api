
exports.up = function(knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('address').notNullable();
    table.string('phone').notNullable();
    table.string('status').notNullable();
    table.string('role').notNullable();
    table.string('description');
    table.string('type');
    table.int('objective');
    /* Add password */
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('user');
};

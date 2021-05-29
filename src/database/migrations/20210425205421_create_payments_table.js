
exports.up = function(knex) {
    return knex.schema.createTable('payments', function (table) {
      /* de todas formas revisar wompi de nuevo*/
      table.increments('id').primary();
      table.string('creditCard').notNullable();
      table.string('cvc').notNullable();
      table.string('value').notNullable();
      table.string('brand');
      table.string('name');
      table.string('hash');
      table.date('date').notNullable();

      table.string('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('payments');
};

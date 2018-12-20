exports.up = function(knex, Promise) {
  return knex.schema.createTable("Users", table => {
    table.increments("id").primary();
    table.string("username").index();
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table.text("bio");
    table.string("link");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Users");
};

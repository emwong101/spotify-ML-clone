/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('spotify_id').notNullable();
      // table.string("access_token").notNullable();
      // table.string("refresh_token").notNullable();
      table.string('first_name').nullable();
      table.string('last_name').nullable();
      table.string('profile_picture').notNullable();
      table.string('email').notNullable();
      // table.timestamps(true, true)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};

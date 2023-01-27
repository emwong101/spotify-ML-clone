/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('playlist')
    .createTable('playlist', (table) => {
      table.increments('playlist_id').primary();
      table.json('data').notNullable();
      table.string('spotify_playlist_id').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('playlist');
};

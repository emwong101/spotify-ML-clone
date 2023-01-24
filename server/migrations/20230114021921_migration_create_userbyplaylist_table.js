/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('userbyplaylist')
    .createTable('userbyplaylist', (table) => {
      table.increments('userplaylist_id');
      table
        .integer('fk_user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('fk_playlist_id')
        .unsigned()
        .references('playlist.playlist_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('userbyplaylist');
};

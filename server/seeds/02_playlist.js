/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("playlist").del();
  await knex("playlist").insert([
    {
      playlist_id: 1,
      fk_user_id: 1,
      data: [{ song_id: 1 }, { song_id: 2 }, { song_id: 3 }],
    },
  ]);
};

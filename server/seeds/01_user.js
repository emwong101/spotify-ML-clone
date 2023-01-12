/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      spotify_id: 'spotifytoken',
      first_name: 'Allan',
      last_name: 'Somera',
      email: 'fakeemail@email.com',
    },
  ]);
};

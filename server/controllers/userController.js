const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
  knex('users')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving user ${err}`));
};

exports.singleUser = (req, res) => {
  knex('users')
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving user ${req.params.id} ${err}`)
    );
};

exports.getUserPlaylist = (req, res) => {
  const { id, playlist_id } = req.params;
  knex
    .select(
      'u.id as user_id',
      'p.playlist_id as playlist_id',
      'ubp.userbyplaylist_id as userbyplaylist_id',
      'ubp.fk_user_id',
      'ubp.fk_playlist_id',
      'p.data'
    )
    .from('users as u')
    .leftJoin('userbyplaylist as ubp', 'u.id', '=', 'ubp.fk_user_id')
    .where('u.id', parseInt(id))
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving user ${req.params.id} ${err}`)
    );
};

exports.getSpotifyToken = (req, res) => {
  const { id } = req.params;
  knex
    .select('u.spotify_id as spotify_id')
    .from('users as u')
    .where('u.id', parseInt(id))
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} spotify_id not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving user ${req.params.id} ${err}`)
    );
};

exports.saveUserPlaylist = (req, res) => {
  // console.log(req.body);
  // res.status(201).json(req.body);
  const { id, current_pl } = req.body;
  // let track_ids = [];
  // req.body.tracks.forEach((i) => track_ids.push({ track_id: i.id }));

  let insert_to_pl = [];
  insert_to_pl.push(
    knex('playlist')
      .insert({ data: current_pl })
      // .then((d) => res.status(201).json(d[0]))
      .then((d) => {
        console.log('after inserting to playlist table', d);
        // res.status(201).json(d[0]);
        return knex('userbyplaylist')
          .insert({
            fk_user_id: id,
            fk_playlist_id: d[0],
          })
          .then((r) => res.status(201).json(r));
      })
      .catch((err) =>
        res
          .status(400)
          .send(`Error saving playlist for user ${req.params.id} ${err}`)
      )
  );
  return Promise.all(insert_to_pl);
};

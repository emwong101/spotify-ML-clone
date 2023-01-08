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
    .select('u.id as user_id', 'p.playlist_id as playlist_id', 'p.data')
    .from('users as u')
    .leftJoin('playlist as p', 'u.id', '=', 'p.fk_user_id')
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
  const { id, playlist_id } = req.params;
  let track_ids = [];
  req.body.tracks.forEach((i) => track_ids.push({ track_id: i.id }));
  knex('playlist')
    .insert({ fk_user_id: id, data: track_ids })
    .then((d) => res.status(201).json(d[0]))
    .catch((err) =>
      res
        .status(400)
        .send(`Error saving playlist for user ${req.params.id} ${err}`)
    );
};

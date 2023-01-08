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

const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/').get(userController.index);

router.route('/:id').get(userController.singleUser);

router.route('/:id/playlist/:playlist_id').get(userController.getUserPlaylist);
module.exports = router;

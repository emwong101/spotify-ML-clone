const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/').get(userController.index);

router.route('/:id').get(userController.singleUser);
router.route('/:id/getspotifytoken').get(userController.getSpotifyToken);

router.route('/:id/playlist/:playlist_id').get(userController.getUserPlaylist);

router.route('/saveplaylist').post(userController.saveUserPlaylist);
module.exports = router;

const router = require('express').Router();

const userController = require('../controllers/userController');

// router.route('/').get(userController.index);

// router.route('/:id').get(userController.singleUser);
// router.route('/:id/getspotifytoken').get(userController.getSpotifyToken);

router.route('/:id/saveplaylist').post(userController.saveUserPlaylist);
router.route('/:id/getuserplaylists').get(userController.getUserPlaylists);
module.exports = router;

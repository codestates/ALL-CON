const router = require('express').Router();
const { concertComment } = require('../controllers');

// Concert Comment
router.get('/', concertComment.comment.get);
router.post('/', concertComment.comment.post);
router.patch('/:commentid', concertComment.detail.patch);
router.delete('/:commentid', concertComment.detail.delete);

module.exports = router;
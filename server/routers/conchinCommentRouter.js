const router = require('express').Router();
const { conchinComment } = require('../controllers');

// Con-Chin Comment
router.get('/', conchinComment.comment.get);
router.post('/', conchinComment.comment.post);
router.patch('/:commentid', conchinComment.detail.patch);
router.delete('/:commentid', conchinComment.detail.delete);

module.exports = router;
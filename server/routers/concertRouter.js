const { concert } = require('../controllers');
const { concertComment } = require('../controllers');
const { conchin } = require('../controllers');
const { conchinComment } = require('../controllers');
const router = require('express').Router();

// Con-Chin
router.get('/article', conchin.all.get);
router.get('/:concertid/article', conchin.article.get);
router.post('/:concertid/article', conchin.article.post);
router.get('/:concertid/article/:articleid', conchin.detail.get);
router.patch('/:concertid/article/:articleid', conchin.detail.patch);
router.delete('/:concertid/article/:articleid', conchin.detail.delete);

// Con-Chin Comment
router.get(
  '/:concertid/article/:articleid/comment',
  conchinComment.comment.get,
);
router.post(
  '/:concertid/article/:articleid/comment',
  conchinComment.comment.post,
);
router.patch(
  '/:concertid/article/:articleid/comment/:commentid',
  conchinComment.detail.patch,
);
router.delete(
  '/:concertid/article/:articleid/comment/:commentid',
  conchinComment.detail.delete,
);

// Concert
router.get('/alarm', concert.all.get);
router.get('/', concert.concert.get);
router.get('/:concertid', concert.detail.get);
router.post('/:concertid/alarm', concert.alarm.post);
router.delete('/:concertid/alarm', concert.alarm.delete);

// Concert Comment
router.get('/:concertid/comment', concertComment.comment.get);
router.post('/:concertid/comment', concertComment.comment.post);
router.patch('/:concertid/comment/:commentid', concertComment.detail.patch);
router.delete('/:concertid/comment/:commentid', concertComment.detail.delete);

module.exports = router;

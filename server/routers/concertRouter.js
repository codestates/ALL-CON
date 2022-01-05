const router = require('express').Router();
const { concert } = require('../controllers');
const { conchin } = require('../controllers');

// Con-Chin
router.get('/article', conchin.all.get);
router.get('/:concertid/article', conchin.article.get);
router.post('/:concertid/article', conchin.article.post);
router.get('/:concertid/article/:articleid', conchin.detail.get);
router.patch('/:concertid/article/:articleid', conchin.detail.patch);
router.delete('/:concertid/article/:articleid', conchin.detail.delete);

// Concert
router.get('/', concert.concert.get);
router.get('/:concertid', concert.detail.get);
router.post('/:concertid/alarm', concert.alarm.post);
router.delete('/:concertid/alarm', concert.alarm.delete);

module.exports = router;
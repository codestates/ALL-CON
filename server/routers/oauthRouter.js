const router = require('express').Router();
const { oauth } = require('../controllers');

// Auth
router.post('/google', oauth.google.post);
router.post('/kakao', oauth.kakao.post);

module.exports = router;
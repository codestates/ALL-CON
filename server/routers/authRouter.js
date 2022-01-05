const router = require('express').Router();
const { authentication } = require('../controllers');

// Auth
router.post('/login', authentication.login.post);
router.post('/logout', authentication.logout.post);
router.post('/signup', authentication.signup.post);
router.post('/password', authentication.password.post);
router.post('/password/confirm', authentication.confirm.post);
router.patch('/password/confirm', authentication.confirm.patch);
router.post('/username', authentication.username.post);

module.exports = router;
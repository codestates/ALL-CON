const router = require('express').Router();
const { user } = require('../controllers');

// User
router.get('/me', user.me.get);
router.patch('/me', user.me.patch);
router.delete('/me', user.me.delete);
router.patch('/picture', user.picture.patch);
router.get('/myarticle', user.myarticle.get);
router.get('/mycomment', user.mycomment.get);
router.patch('/safe', user.safe.patch);
router.post('/safe', user.safe.post);
router.post('/safe/confirm', user.confirm.post);
router.get('/other/:userid', user.other.get);
router.post('/username', user.username.post);

module.exports = router;
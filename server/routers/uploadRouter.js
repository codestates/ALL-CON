const { upload } = require('../controllers');
const { imgUpload } = require('../middlewares/upload/imgUpload')
const router = require('express').Router();

// 이미지 조회 및 업로드
router.get('/:key', upload.upload.get);
router.post('/', imgUpload.single('img'), upload.upload.post);

module.exports = router;

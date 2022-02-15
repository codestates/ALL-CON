const multer = require('multer');

const imgUpload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    // destination: (req, file, cb) => {
    //   // console.log('***** destination *******', file)
    //   cb(null, 'uploads/');
    // },
    // convert a file name
    filename: (req, file, cb) => {
      // console.log('***** filename *******', req, file)
      cb(null, file.originalname);
    },
  }),
});

module.exports = {
  imgUpload
};
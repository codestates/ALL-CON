const { uploadFile, getFileStream } = require('../../middlewares/upload/s3');

module.exports = {
  get: async (req, res) => {
    try {
      
      const key = req.params.key;
      const readStream = getFileStream(key);
      
      readStream.pipe(res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {

      const file = req.file;
      // s3 bucket에 이미지 업로드
      const result = await uploadFile(file);
      
      res.status(201).json({ message: 'imagePath', imagePath: `${result.key}` });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};


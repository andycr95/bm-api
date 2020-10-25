const express = require('express');
const uploadController  = require('../../controllers/uploadController');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function trackApi(app) { 
    const router = new express.Router();
    app.use('/api/upload', router)

    router.post('/image', uploadImage.single('image'), uploadController.uploadImage);
    router.post('/track', uploadController.uploadTrack);
    router.post('/yoump3', uploadController.fromYoutube);
 }

 var uploadImage = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'pacificodeweb',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, 'music/images/'+file.originalname);
      }
    })
});

module.exports = trackApi;

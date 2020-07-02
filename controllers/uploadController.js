const uploadCtrl = {};
const download = require('download-file');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const fs = require('fs');

uploadCtrl.uploadImage = async (req, res, next) => {
  try {
    res.status(200).json({
        uri:req.file.location,
        message: 'Image uploaded'
    });
  } catch (error) {
    next(error);
  }
}

uploadCtrl.uploadTrack = async (req, res, next) => {
  const { body: track } = req;
  const uri = track.uri;
  var options = {
    directory: "./utils/temp/",
    filename: track.name+'.mp3'
  }
  try {
    download(uri, options, async function(err){
      if (err) throw err
      const file = fs.readFileSync(options.directory+options.filename);
      s3.upload({
        Bucket: 'pacificodeweb',
        Key: 'music/tracks/'+options.filename,
        Body: file,
        ContentType: "audio/mp3",
        ACL: 'public-read',
      }, function(err, data) {
        if (err) throw err;
        res.status(200).json({
          track: data.Location,
          message: 'Track uploaded'
        });
      });
    });
  } catch (error) {
    next(error);
  }
}

module.exports = uploadCtrl
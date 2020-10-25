const uploadCtrl = {};
const download = require('download');
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
const youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');

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
  var title = track.name;
  title = title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
  try {
    fs.writeFileSync(__dirname+"/utils/temp/"+title+".mp3", await download(uri));
    const file = fs.readFileSync(__dirname+"/utils/temp/"+title+".mp3");
      s3.upload({
        Bucket: "pacificodeweb",
        Key: "music/tracks/"+title+".mp3",
        Body: file,
        ContentType: "audio/mp3",
        ACL: 'public-read',
      }, function(err, data) {
        if (err) throw err;
        setTimeout(function(){
          fs.unlink(__dirname+"/utils/temp/"+title+".mp3", function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
        },2000);
        res.status(200).json({
          track: "https://cloud.pacificode.co/music/tracks/"+title+".mp3",
          message: 'Track uploaded'
        });
      });
  } catch (error) {
    next(error);
  }
}

uploadCtrl.fromYoutube = async (req, res, next) => {
  const { body: ytVideo } = req;
  var title = ytVideo.name;
  title = title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
  const output = __dirname+"/utils/temp/"+title+".mp4"
  const outputAu = __dirname+"/utils/temp/"+title+".mp3"
  let downloaded = 0
  if (fs.existsSync(output)) {
    downloaded = fs.statSync(output).size
  }
  try {
    const video = youtubedl(ytVideo.uri,
    ['--format=18'],
    { start: downloaded, cwd: __dirname })
    video.on('info', function(info) {
      console.log('Download started')
      console.log('filename: ' + info._filename)
      let total = info.size + downloaded
      console.log('size: ' + total)
      if (downloaded > 0) {
        console.log('resuming from: ' + downloaded)
        console.log('remaining bytes: ' + info.size)
      }
    })
    video.pipe(fs.createWriteStream(output, { flags: 'a' }))
    video.on('complete', function complete(info) {
      'use strict'
      console.log('filename: ' + info._filename + ' already downloaded.')
    })
    
    video.on('end', async function() {
      await ffmpeg(output).output(outputAu).on('end', async function() {                    
        console.log('conversion ended');
        const file = fs.readFileSync(__dirname+"/utils/temp/"+title+".mp3");
      await s3.upload({
          Bucket: "pacificodeweb",
          Key: "music/tracks/"+title+".mp3",
          Body: file,
          ContentType: "audio/mp3",
          ACL: 'public-read',
        }, function(err, data) {
          res.status(200).json({
            track: "https://cloud.pacificode.co/music/tracks/"+title+".mp3",
            message: 'Track uploaded'
          });
        });
      }).on('error', function(e){
        console.log('error: ', e,e.code, e.msg);
      }).run();
    })
    setTimeout(function(){
      fs.unlink(outputAu, function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
      fs.unlink(output, function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
    },100000);
  } catch (error) {
    next(error);
  }
}



module.exports = uploadCtrl

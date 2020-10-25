var youtubedl = require('youtube-dl');
var request = require('request');
const fs = require('fs');
const Config = require('../Config.js');
var converter = require('./videoConverter.js');

class VideoDownloader {
    doRequest(_query,call) {
        request(_query,call );
    }
  
    donwloadVideo( data,downloadNext ){
        var video = youtubedl('https://www.youtube.com/watch?v='+data.videoId,
    ['--format=18'],
    { cwd: __dirname });
        video.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
        });
        video.pipe(fs.createWriteStream(Config.projectPath+Config.outPath+data.videoId+'.mp4'));
        video.on('complete', function complete(info) { 
            console.log('filename: ' + info._filename + ' already downloaded.');
        });
        video.on('end', function() {
            console.log('finished downloading!');
            converter.ConvertVideo(data,downloadNext)
        });
    }
}
module.exports = new VideoDownloader();
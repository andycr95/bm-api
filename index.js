const express = require('express')
const { config } = require('./config/index')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan');
const admin = require('./routes/admin');
const musicApi = require('./routes/api/track');
const albumApi = require('./routes/api/album');
const artistApi = require('./routes/api/artist');
const genreApi = require('./routes/api/genre');
const playlistApi = require('./routes/api/playlist');
const uploadApi = require('./routes/api/upload');
const path = require('path');
const cors = require('cors')
const http = require("http").Server(app);
const { errorHandler, logError, wrapError } = require('./utils/middlewares/errorHandlers')
const notFoundHandlers = require('./utils/middlewares/notFoundHandlers');
const so = require('os');
const { mongoose } = require("./lib/mongo");

//settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

//Routes
admin(app)
musicApi(app)
albumApi(app)
artistApi(app)
genreApi(app)
uploadApi(app)
playlistApi(app)

//Errors middlewares
app.use(notFoundHandlers)
app.use(wrapError)
app.use(errorHandler)
app.use(logError)




http.listen(config.port, () => {
    host = so.networkInterfaces();

    Object.keys(host).forEach(function (ifname) {
        var alias = 0;
      
        host[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
          }
      
          if (alias >= 1) {
            console.log(`App listening on ${iface.address} with port ${config.port}!`)
          } else {
            console.log(`App listening on ${iface.address} with port ${config.port}!`)
          }
          ++alias;
        });
      });
    
})
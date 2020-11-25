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
const searchApi = require('./routes/api/search');
const suggestionApi = require('./routes/api/suggestion');
const playlistApi = require('./routes/api/playlist');
const uploadApi = require('./routes/api/upload');
const userApi = require('./routes/api/user');
const path = require('path');
const cors = require('cors')
const http = require("http").Server(app);
const { errorHandler, logError, wrapError } = require('./utils/middlewares/errorHandlers')
const notFoundHandlers = require('./utils/middlewares/notFoundHandlers');
const so = require('os');
const flash = require('connect-flash');
const session = require('express-session');
const { mongoose } = require("./lib/mongo");

//settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

//middlewares
app.use(cors({origin: '*'}))
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next();
})

app.get('/', (req, res) =>{
  res.status(200).send("Hello Bm-Api");
})

//Routes
admin(app)
musicApi(app)
albumApi(app)
artistApi(app)
searchApi(app)
suggestionApi(app)
genreApi(app)
userApi(app)
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
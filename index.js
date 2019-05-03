const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const exphbs = require("express-handlebars");
const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const cors          = require('cors');
// Constants
const config = require('./app/config/config.js')
const router = require('./app/routes/index.js');
require('./app/config/passport');


// App
app.use(cors());

//For BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: config.secrectKey,resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");
app.use(express.static("public"));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(router);

// Check database
var models = require("./app/models");
require('./app/config/passport.js')(passport, models.user);
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err);
    console.log("Something went wrong with the Database Update!");
});

app.listen(config.PORT);
console.log(`Running on http://localhost:${config.PORT}`);
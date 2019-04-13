const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require("express-handlebars");
const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

// Constants
const config = require('./config/config.js')
const router = require('./routes/index.js');


// App
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
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

app.listen(config.PORT);
console.log("ok")
console.log(`Running on http://localhost:${config.PORT}`);
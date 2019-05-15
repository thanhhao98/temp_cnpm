const express = require('express')
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const exphbs = require('express-handlebars')
// const passport     = require('passport')
// const flash        = require('connect-flash')
// const cookieParser = require('cookie-parser')
const session      = require('express-session')
// const cors          = require('cors')

// Constants
const config = require('./app/config/config')
const router = require('./app/routes/index')
const userRoutes = require('./app/routes/user')
const adminRoutes = require('./app/routes/admin')

// Initial app
const app = express()
// Static
app.use('/documents', express.static('./app/media/document'))


//For BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// For session
app.use(session({ secret: config.secrectKey,resave: true, saveUninitialized:true}))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
      return res.status(200).json({})
    }
    next()
})
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
// })

// For router
app.use('/api/v1',router)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)


// Check database
var models = require('./app/models')
models.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err)
    console.log('Something went wrong with the Database Update!')
})

app.listen(config.PORT)
console.log(`Running on http://localhost:${config.PORT}`)
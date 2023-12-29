const express = require('express')

const app = express();

const session = require('express-session')
const passport = require('passport');
const bodyParser = require('body-parser')

require('./strategies/discord');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    name:'typebold-oauth2',
    secret: 'some secret',
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize())
app.use(passport.session())

const dbConnection = require('./db');

const config = {
    MONGO_DB_URI: process.env.MONGODB_CONNECT
}


// Connect to database
dbConnection(config.MONGO_DB_URI);

// Global variables
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
})

// Middlewares
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/bot', require('./routes/bot.routes'))
app.use('/user', require('./routes/user.routes'))


module.exports = app;
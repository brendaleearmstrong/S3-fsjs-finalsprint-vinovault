if( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;
global.DEBUG = true;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
const myEventEmitter = require('./services/logEvents.js');

app.listen(PORT, (err) => {
    if (err) console.log(err);
    myEventEmitter.emit('event', 'app.listen', 'SUCCESS', 'http search site successfully started.');
    console.log(`Simple app running on port ${PORT}.`)
});

app.get('/', async (req, res) => {
    myEventEmitter.emit('event', 'app.get', 'INFO', 'landing page (index.ejs) was displayed.');
    res.render('index', {status: req.session.status});
});

app.get('/about', async (req, res) => {
    myEventEmitter.emit('event', 'app.get /about', 'INFO', 'about page (about.ejs) was displayed.');
    res.render('about', {status: req.session.status});
});

const searchRouter = require('./routes/search');
app.use('/search', searchRouter);

const authRouter = require('./routes/auth');
app.use("/auth", authRouter);

// anything beginning with "/api" will go into this
const apiRouter = require('./routes/api')
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).render('404', {status: req.session.status});
});


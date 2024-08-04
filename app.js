import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { myEventEmitter } from './services/logEvents.js';
import searchRouter from './routes/search.js';
import authRouter from './routes/auth.js';
import apiRouter from './routes/api.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;
global.DEBUG = true;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Log each request
app.use((req, res, next) => {
    myEventEmitter.emit('event', `HTTP ${req.method}`, 'INFO', `${req.url}`);
    next();
});

app.get('/', async (req, res) => {
    myEventEmitter.emit('event', 'app.get /', 'INFO', 'Home page (index.ejs) was displayed.');
    res.render('index', { status: req.session.status });
});

app.get('/about', async (req, res) => {
    myEventEmitter.emit('event', 'app.get /about', 'INFO', 'About page (about.ejs) was displayed.');
    res.render('about', { status: req.session.status });
});

app.get('/contact', async (req, res) => {
    myEventEmitter.emit('event', 'app.get /contact', 'INFO', 'Contact Us page (contact.ejs) was displayed.');
    res.render('contact', { status: req.session.status });
});

// Log router types
console.log('searchRouter:', typeof searchRouter);
console.log('authRouter:', typeof authRouter);
console.log('apiRouter:', typeof apiRouter);

app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// Log 404 errors
app.use((req, res) => {
    myEventEmitter.emit('event', 'app.use 404', 'ERROR', `Page not found: ${req.url}`);
    res.status(404).render('404', { status: req.session.status });
});

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Server start error:', err);
        myEventEmitter.emit('event', 'app.listen', 'ERROR', 'HTTP server failed to start.');
    } else {
        myEventEmitter.emit('event', 'app.listen', 'SUCCESS', 'HTTP server successfully started.');
        console.log(`VinoVault is running on http://localHost:${PORT}.`);
    }
});

export default app;
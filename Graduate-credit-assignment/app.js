const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const handlebars = require('express-handlebars');
const { engine } = handlebars;
const routes = require('./routes/routes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.dgxxefi.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Travel_List'
    }
)
.then(() => {
    console.log('Connection to MongoDB successful');
})
.catch((err) => {
    console.error(`Database connection error: ${err}`);
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(express.static(`${__dirname}/public`));

app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.set('views', `${__dirname}/views`);

app.use('/', routes);

module.exports = app;
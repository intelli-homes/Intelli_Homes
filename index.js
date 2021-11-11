const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const PORT =  process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('home')
})
app.get('/cameras', function (req, res) {
    req.params.home
    res.render('cameras')
})
app.get('/reports', function (req, res) {
    res.render('reports')
})
app.get('/updates', function (req, res) {
    res.render('updates')
})
app.get('/notifications', function (req, res) {
    res.render('notifications')
})

app.listen(PORT, function () {
    console.log('app running at port 3017')
})

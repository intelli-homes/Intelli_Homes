const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session')
const app = express();
const PORT =  process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
    })
  );

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    username = req.session.username
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.render('home', {
            username:username
        })
    }
    
    
})

app.get('/cameras', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.render('cameras')
    }
    
})

app.get('/camera', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.render('camera')
    }
})

app.get('/reports', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.render('reports')
    }
})
app.get('/updates', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.render('updates')
    }
})
app.get('/notifications', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.render('notifications')
    }
})

app.get('/login', function (req, res) {
    res.render('login')
})

app.post('/login', function (req, res) {
    const userType = req.body.userType
    const username = req.body.username
    const password = req.body.password
    

    if (req.body.userType && req.body.username && req.body.password) {
        req.session.userType = userType
        req.session.username = username
        req.session.password = password
        console.log('session started and type is ' +userType + ' '+username)
        res.redirect('/')
    } else {
        console.log('session not started')
        res.redirect('/login')
        
    }
    
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/login");
        }
      });
})



app.listen(PORT, function () {
    console.log('app running at port 3017')
})

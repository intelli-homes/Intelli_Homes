const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const server = require('http').Server(app)
const fs = require('fs')
const weather = require('weather-js')


// const io = require('socket.io')(server)
// const cv = require('opencv')

// const wCap = new cv.videoCapture(0)


// setInterval(() => {
//     io.emit('vid', 'some data')
// }, 1000)
// const MemoryStore = require('memorystore')(session)
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
} 

const pg = require("pg");
const { start } = require("repl");
const ad = require("./admin");
Client = pg.pool

const admin = ad();


const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products';

const client = new Client({
    connectionString,
    ssl : useSSL
  });


const PORT = process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    // cookie: { maxAge: 86400000 },
    // store: new MemoryStore({
    //   checkPeriod: 86400000 // prune expired entries every 24h
    // }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// enable the static folder...
app.use(express.static("public"));

// add more middleware to allow for templating support

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", async function (req, res) {




  // console.log('your user name '+req.sessionID)
  if (!req.session.username) {

    res.redirect("/login");
  } else {
   


    userid = req.session.userid
    results5 =await client.query("SELECT * FROM userstb WHERE email = $1", [req.session.username]);
    results = await client.query("SELECT * FROM updatestb")
    results3 = await client.query("SELECT userid FROM userstb WHERE email = $1", [req.session.username])
    results4 = await client.query("select userstb.firstname, userstb.lastname, poststb.tittle, poststb.postcontent, poststb.post_date, poststb.postmedia from userstb INNER JOIN poststb ON userstb.userid = poststb.userid")
    console.log(results3.rows[0].userid)
    console.log(results5.rows)
   // console.log(results4.rows)

   weather.find({search: 'Johannesburg, ZA', degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
  
    w1 = result[0]['current']['temperature']
    w2 = result[0]['current']['skytext']
    d = new Date();
    date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log(result)
    res.render("home", {
      w1 : w1,
      w2 : w2,

      date : date,
      time : time,
      results: results.rows,
      results4: results4.rows,
      results5: results5.rows[0]
    
  });
  });
      
    // res.status(200).json(results.rows)
  }
});

app.get("/cameras", function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    res.render("cameras");
  }
});

app.get("/camera/:num", function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    dt = req.params.num
    // console.log(dt)

    if(dt == 0){
      console.log(dt)
      cam = 'camera 1'
      srcs = 'http://localhost:3017/videos'
      res.render("camera", {
        srcs: srcs,
        cam: cam
      });

    } else if (dt == 1) {
      console.log(dt)
      cam = 'camera 2'
    srcs = 'http://localhost:3017/videos1'
    res.render("camera", {
      srcs: srcs,
      cam: cam
    });

  }else if (dt == 2) {
    console.log(dt)
    cam = 'camera 3'
    srcs = 'http://localhost:3017/videos2'
    res.render("camera", {
      srcs: srcs,
      cam: cam
    });

  }else if (dt == 3) {
    console.log(dt)
    cam = 'camera 4'
    srcs = 'http://localhost:3017/videos3'
    res.render("camera", {
      srcs: srcs,
      cam: cam
    });

  }
    
  }
});

app.get("/reports", function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    res.render("reports");
  }
});
app.get("/updates", async function (req, res) {
    username = req.session.username;
    if (!req.session.username) {
      res.redirect("/login");
    } else {
      results2 = await client.query("SELECT * FROM updatestb")

        res.render("updates", {
            results2: results.rows,
          
        });
    }
});
app.get("/notifications", function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    res.render("notifications");
  }
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  const { username, password, userType } = req.body;
  client.connect();
  
    await client.query(
      "SELECT * FROM userstb WHERE email = $1 AND password = $2",
      [username, password],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          var Data = results.rows;
          console.log(Data);
          Data.forEach((row) => {
            (email = row.email), (passwords = row.password), (role = row.userole), (firstname = row.firstname), (userid = row.userid);
          });
          if (req.body.userType && req.body.username && req.body.password) {
            req.session.role = req.body.userType;
            req.session.username = req.body.username;
            req.session.userid = req.body.userid;
            req.session.password = req.body.password;
            console.log(
              req.session.userid
            );

            if (results) {
              if (
                req.body.userType == "User" &&
                req.body.username == email &&
                req.body.password == passwords &&
                req.body.userType == role
              ) {
                res.redirect("/");
                console.log("user pgae" + email);
              } else if (
                req.body.userType == "Admin" &&
                req.body.username == email &&
                req.body.password == passwords &&
                req.body.userType == role
              ) {
                res.redirect("/admin");
                console.log("admin pgae" + email);
              } else {
                console.log(
                  email +
                    passwords +
                    role +
                    req.body.password +
                    req.body.userType +
                    req.body.username
                );
                res.redirect("/login");
                console.log('wrong')
              }
            } else {
              res.redirect("/login");
            }
          } else {
            console.log("session not started");
            res.redirect("/login");
          }
        }
      }
    )
  
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  const {
    firstName,
    lastName,
    DOB,
    gender,
    password,
    password2,
    email,
    phone,
    role,
    provinces,
    avator,
  } = req.body;

  console.log(
    firstName,
    lastName,
    DOB,
    gender,
    password,
    password2,
    email,
    phone,
    role,
    provinces,
    avator
  );
  
    await client.query(
      "INSERT INTO userstb (firstName, lastName, DOB, gender, password, password2, email, phone, userole, provinces, avator ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        firstName,
        lastName,
        DOB,
        gender,
        password,
        password2,
        email,
        phone,
        role,
        provinces,
        avator,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        else{
          res.redirect("/login");
        }
       
      }
    );
 

  
});

app.get("/admin", async function (req, res) {
  
      
    results = await client.query("SELECT * FROM userstb")
    results2 = await client.query("SELECT * FROM updatestb")
    results3 = await client.query("select userstb.firstname, userstb.lastname, poststb.tittle, poststb.postcontent, poststb.post_date, poststb.postmedia from userstb INNER JOIN poststb ON userstb.userid = poststb.userid")
        
        users_control = admin.returnuser();
        update_input_control = admin.returnupdate_input();
        updates_control = admin.returnupdate();
        posts_control = admin.returnpost();
        register_control = admin.returnregister();

        console.log(users_control);
        res.render("admin/index", {
            results: results.rows,
            results2: results2.rows,
            results3: results3.rows,

          users_control: users_control,
          posts_control: posts_control,
          updates_control: updates_control,
          register_control: register_control,
          update_input_control: update_input_control,
          
        });


});

app.post("/admin", function (req, res) {
  btn = req.body.btn_admin;
  // console.log(btn)
  if (btn === "Posts") {
    admin.showpost();
    console.log(btn);
  }
  if (btn === "Updates") {
    admin.showupdate();
    console.log(btn);
  }
  if (btn === "Users") {
    admin.showuser();
    console.log(btn);
  }

  res.redirect("/admin");
});

app.post('/register_control', function (req,res) {
    admin.showregister()
    res.redirect('/admin')
})
app.post('/updates_control', function (req,res) {
    admin.showupdate_input()
    res.redirect('/admin')
})

app.post('/close_reg', function (req,res) {
    admin.resetadmin()
    res.redirect('/admin')
})
app.post('/close_upd', function (req,res) {
    admin.showupdate()
    res.redirect('/admin')
})


app.post('/post_update', async function (req, res) {
    console.log(req.body.tittle+
        req.body.content+
        req.body.image)
    client.connect(
        await client.query(
          "INSERT INTO updatestb (tittle, post_content, image) VALUES ($1, $2, $3)",
          [
            req.body.tittle,
            req.body.content,
            req.body.image
            
          ],
          (error, results) => {
            if (error) {
              throw error;
            }
            else{
                res.redirect('/admin')
                console.log(results.rows);
            }
            
            // res.status(201).send(`User added`)
          }
        )
      );
})

app.post('/delete_update/:update_id', async function (req,res) {
    insert_value = req.params.update_id
    //results3 = await client.query("DELETE FROM userstb WHERE update_id = $1", [insert_value])
    res.redirect('/admin')
})

app.get('/videos', (req, res) => {
    
    const range = req.headers.range;
    console.log(range)
    vidpath = './videos/samplev2.mp4';
    videoSize = fs.statSync(vidpath).size;
    
    chunkSize = 1 *1e+6;
    starting = Number(range.replace(/\D/g, ''))
    end = Math.min(starting + chunkSize, videoSize -1)
    const contentlength =  end - starting + 1

    console.log(end)
    const headers = {
        'Content-Range': `bytes ${starting}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentlength,
        'Content-Type': 'video/mp4'
    }

    res.writeHead(206, headers)

    const stream = fs.createReadStream(vidpath, {starting, end})
    stream.pipe(res)
})


app.get('/videos1', (req, res) => {
    
    const range = req.headers.range;
    console.log(range)
    vidpath = './videos/samplev.mp4';
    videoSize = fs.statSync(vidpath).size;
    
    chunkSize = 1 *1e+6;
    starting = Number(range.replace(/\D/g, ''))
    end = Math.min(starting + chunkSize, videoSize -1)
    const contentlength =  end - starting + 1

    console.log(end)
    const headers = {
        'Content-Range': `bytes ${starting}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentlength,
        'Content-Type': 'video/mp4'
    }

    res.writeHead(206, headers)

    const stream = fs.createReadStream(vidpath, {starting, end})
    stream.pipe(res)
})


app.post('/makepost', async function (req,res) {
  userid = req.session.userid
  username = req.session.username;
  // console.log('your user name '+req.sessionID)
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    console.log('your tittle is '+req.body.tittle + ' and your conntent is: '+req.body.postcontent)
   
    results3 = await client.query("SELECT userid FROM userstb WHERE email = $1", [req.session.username])
    results4 = results3.rows[0].userid
    console.log(results3.rows[0].userid)
   // console.log(results4.rows)
   await client.query(
    "INSERT INTO poststb  (userid, tittle, postcontent) VALUES ($1, $2, $3)",
    [
      results4,
      req.body.tittle,
      req.body.postcontent,
      
      
    ],
    (error, results) => {
      if (error) {
          throw error;
        }
        else{
          res.redirect("/");
        }
      
      // res.status(201).send(`User added`)
    }
  )

  }
});




app.get('/videos2', (req, res) => {
    
    const range = req.headers.range;
    // console.log(range)
    vidpath = './videos/samplev3.mp4';
    videoSize = fs.statSync(vidpath).size;
    
    chunkSize = 1 *1e+6;
    starting = Number(range.replace(/\D/g, ''))
    end = Math.min(starting + chunkSize, videoSize -1)
    const contentlength =  end - starting + 1

    // console.log(end)
    const headers = {
        'Content-Range': `bytes ${starting}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentlength,
        'Content-Type': 'video/mp4'
    }

    res.writeHead(206, headers)

    const stream = fs.createReadStream(vidpath, {starting, end})
    stream.pipe(res)
})
app.listen(PORT, function () {
  console.log("app running at port 3017");
});

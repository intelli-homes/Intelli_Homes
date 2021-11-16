const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const { Client } = require("pg");
const ad = require("./admin");

const admin = ad();

const client = new Client({
  user: "tzrshwebdhrysp",
  password: "eba676700c384bc03e60a7e05ae371e30a43d6f0ea53c02cc5eae8f383b90feb",
  port: "5432",
  host: "ec2-52-54-237-144.compute-1.amazonaws.com",
  database: "dfpvabsnh8th5e",
});

const app = express();
const PORT = process.env.PORT || 3017;

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
app.use(express.static("public"));

// add more middleware to allow for templating support

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", async function (req, res) {
  username = req.session.username;
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    await client.query("SELECT * FROM updatestb", (error, results) => {
        if (error) {
          throw error;
        } else {
          res.render("home", {
              results: results.rows,
            
          });
          // res.status(200).json(results.rows)
          console.log(results.rows);
        }
      })
  }
});

app.get("/cameras", function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    res.render("cameras");
  }
});

app.get("/camera", function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    res.render("camera");
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
      await client.query("SELECT * FROM updatestb", (error, results) => {
          if (error) {
            throw error;
          } else {
            res.render("updates", {
                results2: results.rows,
              
            });
            // res.status(200).json(results.rows)
            console.log(results.rows);
          }
        })
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
  client.connect(
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
            (email = row.email), (passwords = row.password), (role = row.userole), (firstname = row.firstname);
          });
          if (req.body.userType && req.body.username && req.body.password) {
            req.session.role = req.body.userType;
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            console.log(
                email + req.body.username + req.body.password
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
  );
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
    avator
  );
  client.connect(
    await client.query(
      "INSERT INTO userstb (firstName, lastName, DOB, gender, password, password2, email, phone, userole, avator ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
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
        avator,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rows);
        // res.status(201).send(`User added`)
      }
    )
  );

  res.redirect("/login");
});

app.get("/admin", async function (req, res) {
  client.connect(
      
    await client.query("SELECT * FROM userstb", (error, results) => {
      if (error) {
        throw error;
      } else {
        users_control = admin.returnuser();
        updates_control = admin.returnupdate();
        posts_control = admin.returnpost();
        console.log(users_control);
        res.render("admin/index", {
            results: results.rows,
          users_control: users_control,
          posts_control: posts_control,
          updates_control: updates_control,
        });
        // res.status(200).json(results.rows)
        console.log(results.rows);
      }
    })
  );


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

  res.redirect("admin");
});


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
app.listen(PORT, function () {
  console.log("app running at port 3017");
});

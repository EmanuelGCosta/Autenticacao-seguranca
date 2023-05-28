require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const LocalStrategy = require('passport-local')
const passport = require("passport");
const mongoose = require(__dirname + "/DB.js");

const app = express();
const mongo = new mongoose();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(mongo.User.createStrategy());


passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { id: user._id, username: user.username });
    });
});

passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    })
})

///// GET ROUTES /////

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login", { error: false });
});

app.get("/register", (req, res) => {
    res.render("register", { error: false });
});

app.get("/secrets", (req, res) => {
    mongo.encontrarUsuario()
        .then((users) => {
            res.render("secrets", { users: users });
        })
        .catch((err) => console.log(err));

});

app.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
})

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.get("/secrets/:userId", (req, res) => {
    mongo.encontrarUsuario(req.params.userId)
        .then((user) => {
            res.render("secretview", { secret: user.secret });
        })
        .catch((err) => console.log(err));

})

///// POST ROUTES /////

app.post("/register", async (req, res) => {

    try {

        const registerUser = await mongo.User.register({ username: req.body.username }, req.body.password);

        if (registerUser) {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        } else {
            res.redirect("/register");
        }

    } catch (err) {
        return res.render("register", { error: true });
    }

});

app.post("/login", (req, res, next) => {

    const user = new mongo.User({
        username: req.body.username,
        password: req.body.password
    });

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            return res.render("login", { error: true });
        }
        req.login(user, function (err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets")
            });
        });
    })(req, res, next);

});

app.post("/submit", (req, res) => {
    const segredoEnviado = req.body.secret;

    mongo.encontrarUsuario(req.user.id)
        .then((user) => {
            if (user) {
                user.secret = segredoEnviado;
                user.save()
                    .then(() => res.redirect("/secrets"))
            }
        })
        .catch((err) => { console.log(err) });

});


app.listen(3000);
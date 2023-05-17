const express = require("express");
const ejs = require("ejs");
const mongoose = require(__dirname + "/DB.js")

const app = express();
const mongo = new mongoose();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    err = mongo.registrarUsuario(req.body.username, req.body.password);

    if (!err) {
        console.log("Usuário criado!");
        res.render("secrets");
    } else {
        console.log("Ocorreu um erro!" + err);
    }

})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    mongo.encontrarUsuario(username)
        .then((usuario) => {
            mongo.bcrypt.compare(password, usuario.password, (err, result) => {
                if (result === true) {
                    res.render("secrets");
                }
            })
        })
        .catch((err) => {
            console.log(err);
        });


})


app.listen(3000);
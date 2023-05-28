require("dotenv").config();
const mongo = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


module.exports = class {
    constructor() {

        main().catch(err => console.log(err));

        async function main() {
            await mongo.connect('mongodb://127.0.0.1:27017/userDB');
        }

        const userSchema = new mongo.Schema({
            username: String,
            password: String,
            secret: String
        })

        userSchema.plugin(passportLocalMongoose);

        this.User = mongo.model("User", userSchema);
    }

    encontrarUsuario(id = "") {
        if (id === "") {
            return this.User.find({"secret": {$ne: null}})
        } else {
            return this.User.findOne({ _id: id })
        }
    }

}
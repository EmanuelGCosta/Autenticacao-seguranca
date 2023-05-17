require("dotenv").config();
const mongo = require("mongoose");



module.exports = class {
    constructor() {
        this.bcrypt = require("bcrypt");
        
        main().catch(err => console.log(err));

        async function main() {
            await mongo.connect('mongodb://127.0.0.1:27017/userDB');
        }

        const userSchema = new mongo.Schema({
            email: String,
            password: String
        })




        this.User = mongo.model("User", userSchema);
    }

    registrarUsuario(newEmail, newPassword) {
        const saltRound = 10;

        this.bcrypt.hash(newPassword, saltRound, (err, hash) => {

            if (!err) {
                const newUser = new this.User({
                    email: newEmail,
                    password: hash
                });

                newUser.save()
                    .catch((err) => {
                        return err
                    });
            } else {
                console.log("Ocorreu um erro!" + err)
            }
        })

    }

    encontrarUsuario(emailUsuario) {
        return this.User.findOne({ email: emailUsuario })
    }

}
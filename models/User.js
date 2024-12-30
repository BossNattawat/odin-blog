const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {type:String, require: true},
    username: {type:String, require: true, unique: true},
    password: {type:String, require: true},
    createAt: {type: Date, default: Date.now}
})

let User = mongoose.model("BlogUser", userSchema)

module.export = User

module.exports.saveUser = (data) => {
    const user = new User(data)
    return user.save()
    .then(() => {
        console.log("User registered successfully!")
    })
    .catch((err) => {
        console.error("Error registering user:", err);
    })
}
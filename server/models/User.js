const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); // Plugin the passport-local-mongoose to add additional methods for user authentication.

const User = mongoose.model('User', UserSchema);

module.exports = User;
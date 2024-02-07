const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(16).toString("hex");

const app = express();

mongoose.connect("mongodb+srv://bnehar:k3iD3KO2LuU0BBoM@cluster0.vy5gefw.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true}); // connecting to MongoDB

app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false,
    })
);

// Use the Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Including the Passport configuration
require("./passport")(passport);

// Includeing the authentication routes
app.use("/auth", authRoutes);

/* Add any other routes here */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
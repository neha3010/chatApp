// Creating an Express Server in the 'server' directory

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session');
const auth = require('./routes/auth');
// const socketio = require("socket.io");
// const http = require("http");
const config = require("./config");

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

const app = express();

// Connecting to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(session({ secret: secretKey, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Mount authentication routes
app.use('/api/auth', auth);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Configuring Passport for User Authenticaiton
// require("./passport")(passport);

// // const app = express();
// const server = http.createServer(app);
// const io = socketio(server);


// /* middleware, routes, and Socket,io logic goes here */

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// // Implementing Socket.io for real-time communication in the Express server.

// io.on("connection", (socket) => {
//     console.log("User connected");

//     socket.on("disconnected", () => {
//         console.log("User disconnected");
//     });

//     /* Chat related Socket.io events go here */
// });

// /* Other Server logic goes here */
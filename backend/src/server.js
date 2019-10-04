const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-p9xfj.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//In prod connect to a database extremely fast, like freeRadius
const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

//this "function" will not send information to user, so need to add the next parameter, otherwise the application will not continue...
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    //continue the normal flow of the application
    return next();
});

// GET, POST, PUT, DELETE

//req.query = access query params (filter)
//req.params = access route params (edit and delete)
//req.body = access the requisition body (create, edit)

//search in the blog posts with Sequelize (node + SQL)

//routes needs to go after express.json()
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);
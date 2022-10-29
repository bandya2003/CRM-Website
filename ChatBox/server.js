const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin , getCurrentUser , userleave , getRoomusers} = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'ChatBox Bot'

// Set Static folder
app.use(express.static(path.join(__dirname,'public')))

// Run when client connnects
io.on('connection',socket=>{

  socket.on('joinroom',({username,room})=>{
    const user = userJoin(socket.id,username,room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message',formatMessage(botName,'Welcome to the ChatBox'))

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`))

    // Send users and room info
    io.to(user.room).emit('roomUsers',{
      room : user.room ,
      users : getRoomusers(user.room)
    })

  })

  socket.on('chatMessage',msg =>{
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message',formatMessage(user.username,msg))
  })

  // Runs when a client disconnects
  socket.on('disconnect',()=>{
    const user = userleave(socket.id);
    if(user){
        io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`))
        io.to(user.room).emit('roomUsers',{
          room : user.room ,
          users : getRoomusers(user.room)
        })
    }
  });

});


const PORT = 3000 || process.env.PORT ;

server.listen(PORT,()=>{
  console.log(`Server is sucessfully running on port ${PORT}`)
})

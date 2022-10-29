const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
// Get username and room from URL
const {username , room} = Qs.parse(window.location.search,{
  ignoreQueryPrefix : true
})

const socket = io();

// Join chatroom
socket.emit('joinroom',{username,room})

// Get room and users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room)
  outputUsers(users)
})



// Message from server
socket.on('message',message=>{
  console.log(message);
  outputMessage(message)
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
});


// Message Submit
chatform.addEventListener('submit',(e)=>{
  e.preventDefault()
  // Get message text
  const msg = e.target.elements.msg.value

  // Emit to the server
  socket.emit('chatMessage',msg)

  // clear input
  e.target.elements.msg.value = ''
  e.target.elements.focus()
})


// outputMessage to DOM
const outputMessage = (message) =>{
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `	<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`
   document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to DOM
const outputRoomName =(room) =>{
  roomName.innerText = room
}

// Add users to DOM
const outputUsers =(users) =>{
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}

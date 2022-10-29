const users = [];

// Add the user which joined to the users arrray
const userJoin = (id , username , room) =>{
  const user = {id , username , room};
  users.push(user)
  return user ;
}


// User leaves the chat
const userleave = (id) =>{
  const indx = users.findIndex(user=>user.id === id)
  if(indx != -1){
    return users.splice(indx,1)[0]
  }
}


// get current user
const getCurrentUser = (id) =>{
  return users.find(user => user.id === id);
}

// get room users
const getRoomusers = (room) =>{
  return users.filter(user=>user.room === room)
}


module.exports = {
  userJoin ,
  getCurrentUser,
  userleave ,
  getRoomusers
};

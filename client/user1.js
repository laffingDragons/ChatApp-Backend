// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InIxSGtjWEs5TSIsImlhdCI6MTUyMjI0ODE1Njc4MywiZXhwIjoxNTIyMzM0NTU2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTg3NDU4OTk2NiwiZW1haWwiOiJ4eXpAZ21haWwuY29tIiwibGFzdE5hbWUiOiJYeXoiLCJmaXJzdE5hbWUiOiJNciIsInVzZXJJZCI6IkgxcE9RR1k5TSJ9fQ.GJPmnMkOam1MHak9UA1iXF88VoIYjuKFhHud4qJdZDQ"
const userId = "H1pOQGY9M"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'SJ-iectqM',//putting user2's id here 
  receiverName: "Aditya Kumar",
  senderId: userId,
  senderName: "Mr Xyz"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Mr Xyz")

  })




}// end chat socket function

chatSocket();

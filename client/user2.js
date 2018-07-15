// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkIxWXN4NXRxeiIsImlhdCI6MTUyMjI3NDQ2NDkwNSwiZXhwIjoxNTIyMzYwODY0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTg3NDU4OTk2NiwiZW1haWwiOiJzb21ldGhpbmdAZWR3aXNvci5jb20iLCJsYXN0TmFtZSI6Ikt1bWFyIiwiZmlyc3ROYW1lIjoiQWRpdHlhIiwidXNlcklkIjoiU0otaWVjdHFNIn19.0C2GL6kFuEp--EPFrxDL2qvP_Jc8UChNGEb6YNCcXKQ"
const userId= "SJ-iectqM"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'H1pOQGY9M',//putting user2's id here 
  receiverName: "Mr Xyz",
  senderId: userId,
  senderName: "Aditya Kumar"
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


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Aditya Kumar")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();

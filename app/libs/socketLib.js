const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger =  require('./loggerLib');
const events = require('events');
const evntEmitter = new events.EventEmitter();

const tokenLib = require('./tokenLib');
const check = require('./checkLib');
const response = require('./responseLib');

//passing the instance of server
let setServer = (server) => {

    let allOnlineUsers = [];

    //Following two line is to intialize the server 
    let io = socketio.listen(server);

    let myIo = io.of('');

    // main event handler   -----    handled events
    myIo.on('connection', (socket) => {

        console.log("On connection ----- Emitting verify users");

        socket.emit('verifyUser','');

        // code to verify the user and make him online
            socket.on('set-user', (authToken) => {

                console.log('set-user was called');
                tokenLib.verifyClaimWithoutSecret((authToken, (err, user) => {
                    if(err){
                        socket.emit('auth-err', {status:500, error :' Please provide correct auth-Token'});
                    }else{

                        console.log('User is verified.... Setting details');
                        let currentUser = user.data;

                        socket.userId = currentUser.userId
                        let fulllName = `${currentUser.firstName} ${currentUser.lastName}`
                        console.log(`${fulllName} is online`);
                        // socket.emit(currentUser.userId, "You re online");

                        let userObj = {userId: currentUser.userId, userName: fulllName}
                        allOnlineUsers.push(userObj);

                    }
                }))
            })

            //Socket on disconnection
            socket.on('disconnect', () => {
                // disconnect user from the socket
                // remove user from online list
                // unsubscribe user from his own channel
                console.log('user disconnected');
                
                console.log(socket.userId);
                let removeIndex = allOnlineUsers.map((user) =>{ return user.userId }).indexOf(socket.userId);
                allOnlineUsers.splice(removeIndex, 1);
                console.log(allOnlineUsers);
                
            })//end of disconnection

            //socket connection for sending chat message
            socket.on('chat-msg', (data) =>{

                console.log("Chat-msg socket was called");
                console.log(data);
                myIo.emit(data.reciverId, data);

            })// end of socket
    })

}

module.exports = {

    setServer:setServer

}
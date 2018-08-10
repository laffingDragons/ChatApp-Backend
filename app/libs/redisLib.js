const check = require('./checkLib')
// const redis =require('redis')
// let client = redis.createClient();


// for deployment purpose on heroku
if (process.env.REDISTOGO_URL) {

    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.auth(rtg.auth.split(":")[1]);


} else {

    var redis = require('redis').createClient();
    
}

redis.on("connect", () =>{

    console.log("Redis connection successfully opened");

});

let getAllUsersInHash = (hashName, callback) => {

    redis.HGETALL(hashName, (err,result) =>{

        if(err){
            console.log(err);
            callback(err, null)
        }else if(check.isEmpty(result)){

            console.log("No online users");
            callback(null, {})
            
        }else{

            console.log(result);
            callback(null, result)
        }

    })

}

// function to set new online user.
let setANewOnlineUserInHash = (hashName, key, value, callback) => {
   
    redis.HMSET(hashName, [
        key, value
    ], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null)
        } else {

            console.log("user has been set in the hash map");
            console.log(result)
            callback(null, result)
        }
    });


}// end set a new online user in hash

let deleteUserFromHash = (hashName, key) => {

    redis.HDEL(hashName, key);
    return true;
}//end of delete user from the hash

module.exports = {

    getAllUsersInHash: getAllUsersInHash,
    setANewOnlineUserInHash: setANewOnlineUserInHash,
    deleteUserFromHash: deleteUserFromHash

}
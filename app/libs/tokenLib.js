const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const secretKey = "RandomStringThatIsdifficultToGuess";

let generateToken = (data, cb) => {

    try{

        let claims = {

            jwtId: shortId.generate(),
            iat: Date.now(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            sub: 'authToken',
            iss: 'edChat',
            data: data

        }

        let tokenDetails = {

            token: jwt.sign(claims, secretKey),
            tokenSecret: secretKey

        }
        cb(null, tokenDetails)
        } catch(err){

            console.log(err);
            cb(err, null)
            
        }
}

let verifyClaim = (token, secretKey, cb) => {
    //verify the authToken symmetric
    jwt.verify(token, secretKey, function(err, decoded){

        if(err){
            console.log('err while verifying token:', err);
            cb(err, null)
        }else{

            console.log('User verified :', decoded);        
            cb(null, decoded)
        }

    })
}

module.exports= {

    generateToken: generateToken,
    verifyToken : verifyClaim
    
}
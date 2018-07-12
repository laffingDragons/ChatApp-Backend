const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const secretKey = "RandomString";

let generateToken = (data, err) => {

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
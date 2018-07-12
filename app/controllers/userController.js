const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const passwordLib = require('../libs/generatePasswordLib');

/* Models */
const UserModel = mongoose.model('User')


// start user signup function 

let signUpFunction = (req, res) => {

  let validateUserInput = () => {

    return new Promise((resolve, reject) => {

        if(req.body.email){
            if(!validateInput.Email(req.body.email)){

                let apiResponse = response.generate(true, "Email does not met the requirement", 400, null);
                reject(apiResponse);

            }else if(check.isEmpty(req.body.password)){

                let apiResponse = response.generate(true, "Password is missing", 400, null);
                reject(apiResponse);

            }else{

                resolve(req);

            }
        }else{

            logger.error('Feild Missing during User creation', 'userController: signUpFunction()', 5)
            let apiResponse = response.generate(true, "One or more parameters is missing", 400, null);
            reject(apiResponse);

        }

    })

  }//end of validate user 

  let createUser = () => {

    return new Promise((resolve, reject) => {

        UserModel.findOne({email: req.body.email})
        .exec((err, retrivedUserDetails) =>{

            if(err){
                logger.error(err.message, "userController: createUser()", 10);
                let apiResponse =  response.generate(true, "Failed to create user", 400, null);
                reject(apiResponse);
            }else if(check.isEmpty(retrivedUserDetails)){
                console.log(req.body);
                let newUser = new UserModel({
                    userId: shortid.generate(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName || '',
                    email: req.body.email.toLowerCase(),
                    mobileNumber: req.body.mobileNumber,
                    password: passwordLib.hashPassowrd(req.body.password),
                    createdOn: time.now()
                })

                newUser.save((err, newUser) => {

                    if(err){

                        console.log(err);
                        logger.error(err.message, "userController: CreateUser()", 400 , null)
                        let apiResponse =  response.generate(true, "Failed to create user", 400, null);
                        reject(apiResponse);

                    }else{

                        let newUserObj = newUser.toObject();
                        resolve(newUserObj)

                    }

                })

            }else{

                logger.error('User Cannot be Created. User Already Present', "userController: createUser()", 5);
                let apiResponse =  response.generate(true, "User Already Present", 400, null);
                reject(apiResponse);
            }

        })

    })

  }//end of create user function

  validateUserInput(req, res)
  .then(createUser)
  .then((resolve) => {
      delete resolve.password
      let apiResponse = respone.generate(false, 'User Created Successfully', 200, resolve );
      res.send(apiResponse);
  })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        return new Promise ((resolve, reject) => {
            if(req.body.email){

                console.log('req.body email is there :', req.body.email);
                UserModel.findOne({email: req.body.email},(err, userDetails) =>{

                    if(err){
                        console.log(err);
                        logger.error('Failed to Retrive User Data', 'userController: findUser()', 5);
                        let apiResponse = response.generate(true, 'Failed to Retrive User Data', 400, null);
                        reject (apiResponse);

                    }else if(check.isEmpty(userDetails)){
                        logger.error('No user found', 'userController: findUser()', 5);
                        let apiResponse = response.generate(true, 'No user found', 400, null);
                        reject (apiResponse);
                    }else{
                        logger.info("User found", 'userController: findUser()', 10);
                        resolve(userDetails);
                    }

                })

            }else{
                let apiResponse = response.generate(true, '"Email" parameter is missing', 400, null);
                reject(apiResponse);
            }
        })

    }

    let validatePassword = (retrivedUserDetails) => {
        console.log("ValidatePassword");
        return new Promise ((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrivedUserDetails.password, (err, isMatch)=>{
                if(err){
                    console.log(err);
                    logger.error(err.message, " userController: validatePassword()", 10);
                    let apiResponse = response.generate(true, "login failed", 500, null);
                    reject(apiResponse);
                }else if(isMatch){
                    let retrivedUserDetailsObj = retrivedUserDetails.toObject()
                    delete retrivedUserDetailsObj.password
                    delete retrivedUserDetailsObj._id
                    delete retrivedUserDetailsObj.__v
                    delete retrivedUserDetailsObj.createdOn
                    delete retrivedUserDetailsObj.modifiedOn
                    resolve(retrivedUserDetailsObj)
                }else{
                    logger.info('Password did not match', 'userController: findUser()', 10);
                    let apiResponse = response.generate(true, 'Password did not match. Login Failed', 400, null);
                    reject(apiResponse);
                }

            })

        })
    }

    let generateToken = (userDetails) => {

        console.log("Generate token");
        return new Promise((resolve, reject)=> {
            token.generateToken(userDetails, (err, tokenDetails) =>{

                if(err){

                    console.log(err);
                    let apiResponse = response.generate(true, "Error in generating Jwt Token", 500, 7);
                    reject(apiResponse);

                }else{

                    tokenDetails.userId = userDetails.userId,
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails);

                }
            })
        })
    }

    findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then((resolve) => {

        let apiResponse = response.generate(false, "Login Successful", 200, resolve);
        res.status(200);    
        res.send(apiResponse);

    })
    .catch((err) => {

        console.log("Error Handler");
        console.log(err);
        res.status(err.status);
        res.send(err);
        
    })
}


// end of the login function 


let logout = (req, res) => {
  
} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout

}// end exports
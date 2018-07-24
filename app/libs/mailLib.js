'use strict';
const nodemailer = require('nodemailer');
const appConfig = require('../../config/appConfig');


let signUpMail = (email, fullName) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: appConfig.email, // generated ethereal user
                pass: appConfig.password // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <laffingDragons@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: `Hello ${fullName}`, // plain text body
            html: `<b>Hello ${fullName}</b>` // html body                                                             
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}


// mail for forgot password
let forgotPasswordMail = (email, userId) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: appConfig.email, // generated ethereal user
                pass: appConfig.password // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <laffingDragons@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Change Password', // Subject line
            text: `Hello `, // plain text body
            html: `<b>Please click on the link on the link below </b>
                    <p>http://localhost:4200/change-password/${userId}</p>` // html body                                                             
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}



module.exports = {

    signUpMail: signUpMail,
    forgotPasswordMail: forgotPasswordMail,
}
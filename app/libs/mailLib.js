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
            html: `<html>

            <head>
                <title>ChatApp</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    * {
                        letter-spacing: 1px;
                        font-family: 'Montserrat', arial;
                    }
            
                    .cart-wrapper {
                        color: #323232;
                        background: #DCDCDC;
                        padding: 1.3rem 1.3rem 0.5rem 1.3rem;
                    }
            
                    .body-child {
                        margin-left: 25%;
                        width: 50%;
                        text-align: center;
                    }
            
                    .date-text {
                        text-align: right
                    }
            
                    @media screen and (max-width: 768px) {
            
                        .body-child {
                            margin-left: 5% !important;
                            width: 90%;
                            text-align: center;
                        }
            
                    }
                </style>
            </head>
            
            <body style="margin: 0;">
                <div style="display:block; background: #131313; width: 100%; height: 20%; text-align: center;">
                    <div style="width: 100%; height: 100%; display: table;">
            
                        <div style="display:table-cell; vertical-align: middle;">
                            <h1 style="color: #fff; display:inline; vertical-align: middle; border: solid 5px white;padding: 6px;">ChatApp</h1>
                        </div>
                    </div>
                </div>
            
                <div style="width: 100%; height: auto; margin: 5% 0;">
                    <div class="body-child">
            
                        <div>
                            <h1 style="color: #262626; font-size: 3rem; font-weight: 700 !important; text-transform: uppercase; letter-spacing: 2px; font-family: 'Montserrat',arial;">Welcome</h1>
            
                            <div style="color: #C7C7C7; font-size: 0.9rem; text-transform: uppercase;letter-spacing: 1px; padding-right: 6px;">
                                Thank you ${fullName} for Signing up
                            </div>
                            <br>
            
                        </div>
                    </div>
                </div>
            
            
                <div style="display:block;  width: 100%; height: 20%; text-align: center;">
            
                    <div style="background: #262626; color: #FFFFFF; padding: 4%;">
                        <p style=" margin: 0px;font-size: 0.6em;margin-left: 25%; width: 50%; text-align: center; line-height: 134%;">
                            If you have questions, we're happy to help.
                            <br/>Email ChatApp@gmail.com
                            <br/>Phone 999999999
                            <br/>
                            <br/>If you did not create this account on Chatapp and you think someone else has used your Email ID to create
                            an account, please remove your Email ID from this account by clicking here.
                        </p>
                    </div>
            
                    <div style="background: #121212; color: #666666; padding: 2% ">
                        <div style="margin-left: 25%; width: 50%; text-align: center;">
                            <a style=" color: #666666 " href="/" data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                                Facebook |
                            </a>
                            <a style=" color: #666666 " href="/" data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            
            </body>
            
            </html>` // html body                                                             
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
            html: `
                    <html>

<head>
    <title>ChatApp</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            letter-spacing: 1px;
            font-family: 'Montserrat', arial;
        }

        .cart-wrapper {
            color: #323232;
            background: #DCDCDC;
            padding: 1.3rem 1.3rem 0.5rem 1.3rem;
        }

        .body-child {
            margin-left: 25%;
            width: 50%;
            text-align: center;
        }

        .date-text {
            text-align: right
        }

        @media screen and (max-width: 768px) {

            .body-child {
                margin-left: 5% !important;
                width: 90%;
                text-align: center;
            }

        }
    </style>
</head>

<body style="margin: 0;">
    <div style="display:block; background: #131313; width: 100%; height: 20%; text-align: center;">
        <div style="width: 100%; height: 100%; display: table;">

            <div style="display:table-cell; vertical-align: middle;">
                <h1 style="color: #fff; display:inline; vertical-align: middle; border: solid 5px white;padding: 6px;">ChatApp</h1>
            </div>
        </div>
    </div>

    <div style="width: 100%; height: auto; margin: 5% 0;">
        <div class="body-child">

            <div>
                <h1 style="color: #262626; font-size: 3rem; font-weight: 700 !important; text-transform: uppercase; letter-spacing: 2px; font-family: 'Montserrat',arial;">Change Password</h1>

                <div style="color: #C7C7C7; font-size: 0.9rem; text-transform: uppercase;letter-spacing: 1px; padding-right: 6px;">
                Please click <a href="http://localhost:4200/change-password/${userId}">here</a> to change password.
                </div>
                <br>

            </div>
        </div>
    </div>


    <div style="display:block;  width: 100%; height: 20%; text-align: center;">

        <div style="background: #262626; color: #FFFFFF; padding: 4%;">
            <p style=" margin: 0px;font-size: 0.6em;margin-left: 25%; width: 50%; text-align: center; line-height: 134%;">
                If you have questions, we're happy to help.
                <br/>Email ChatApp@gmail.com
                <br/>Phone 999999999
                <br/>
                <br/>If you did not create this account on Chatapp and you think someone else has used your Email ID to create
                an account, please remove your Email ID from this account by clicking here.
            </p>
        </div>

        <div style="background: #121212; color: #666666; padding: 2% ">
            <div style="margin-left: 25%; width: 50%; text-align: center;">
                <a style=" color: #666666 " href="/" data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                    Facebook |
                </a>
                <a style=" color: #666666 " href="/" data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                    Twitter
                </a>
            </div>
        </div>
    </div>

</body>

</html>` // html body                                                             
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

let invitationMail = (roomName, reciverEmail, link, senderName) => {

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
            to: reciverEmail, // list of receivers
            subject: 'Invitation Mail', // Subject line
            text: ``, // plain text body
            html: `
            <html>

<head>
    <title>ChatApp</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            letter-spacing: 1px;
            font-family: 'Montserrat', arial;
        }

        .cart-wrapper {
            color: #323232;
            background: #DCDCDC;
            padding: 1.3rem 1.3rem 0.5rem 1.3rem;
        }

        .body-child {
            margin-left: 25%;
            width: 50%;
            text-align: center;
        }

        .date-text {
            text-align: right
        }

        @media screen and (max-width: 768px) {

            .body-child {
                margin-left: 5% !important;
                width: 90%;
                text-align: center;
            }

        }
    </style>
</head>

<body style="margin: 0;">
    <div style="display:block; background: #131313; width: 100%; height: 20%; text-align: center;">
        <div style="width: 100%; height: 100%; display: table;">

            <div style="display:table-cell; vertical-align: middle;">
                <h1 style="color: #fff; display:inline; vertical-align: middle; border: solid 5px white;padding: 6px;">ChatApp</h1>
            </div>
        </div>
    </div>

    <div style="width: 100%; height: auto; margin: 5% 0;">
        <div class="body-child">

            <div>
                <h1 style="color: #262626; font-size: 3rem; font-weight: 700 !important; text-transform: uppercase; letter-spacing: 2px; font-family: 'Montserrat',arial;">Chatroom Invitation</h1>

                <div style="color: #C7C7C7; font-size: 0.9rem; text-transform: uppercase;letter-spacing: 1px; padding-right: 6px;">
               <p> Hello this is ${senderName} </p>
                Join our Chatroom <b>${roomName}</b> by clicking on following <a href="${link}">Link</a>.
                </div>
                <br>

            </div>
        </div>
    </div>


    <div style="display:block;  width: 100%; height: 20%; text-align: center;">

        <div style="background: #262626; color: #FFFFFF; padding: 4%;">
            <p style=" margin: 0px;font-size: 0.6em;margin-left: 25%; width: 50%; text-align: center; line-height: 134%;">
                If you have questions, we're happy to help.
                <br/>Email ChatApp@gmail.com
                <br/>Phone 999999999
                <br/>
                <br/>If you did not create this account on Chatapp and you think someone else has used your Email ID to create
                an account, please remove your Email ID from this account by clicking here.
            </p>
        </div>

        <div style="background: #121212; color: #666666; padding: 2% ">
            <div style="margin-left: 25%; width: 50%; text-align: center;">
                <a style=" color: #666666 " href="/" data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                    Facebook |
                </a>
                <a style=" color: #666666 " href="/" data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                    Twitter
                </a>
            </div>
        </div>
    </div>

</body>

</html>` // html body                                                             
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
    invitationMail: invitationMail,
}
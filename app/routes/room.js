const express = require('express');
const router = express.Router();
const roomController = require("./../../app/controllers/roomController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/room`;


    app.get(`${baseUrl}/all`, auth.isAuthorized, roomController.getAllRoom);

    app.put(`${baseUrl}/:roomId`,  roomController.requestToJoin);

    app.get(`${baseUrl}/:roomId/details`, auth.isAuthorized, roomController.getRoomById);
    
    app.post(`${baseUrl}/invite`, auth.isAuthorized, roomController.invitationMail);

    app.put(`${baseUrl}/:roomId/edit`, auth.isAuthorized, roomController.editRoom);
}
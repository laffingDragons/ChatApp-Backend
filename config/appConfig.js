let appConfig = {};
let nodeMailer = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/chatAppDB'
  }
appConfig.apiVersion = '/api/v1';

nodeMailer.email="cooldudeakshu@gmail.com";
nodeMailer.password = "";

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion,
    email: nodeMailer.email,
    password: nodeMailer.password
};
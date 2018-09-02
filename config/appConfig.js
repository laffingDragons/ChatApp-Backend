let appConfig = {};
let nodeMailer = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    // uri: 'mongodb://<dbuser>:<dbpassword>@ds119072.mlab.com:19072/chatapp'
    uri: 'mongodb://localhost:27017/todo'
  }
appConfig.apiVersion = '/api/v1';

nodeMailer.email="cooldudeakshu@gmail.com";
nodeMailer.password = "Mlg@420^";

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion,
    email: nodeMailer.email,
    password: nodeMailer.password
};
(function (controllers) {

    var homeController = require("./homeController");
    var apiController = require("./apiController");
    controllers.init = function (app) {
        homeController.init(app);
        apiController.init(app);
    };

})(module.exports);
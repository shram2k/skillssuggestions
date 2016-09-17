(function (services) {

    var bookservice = require("./bookservice");

    services.getbooks = function (next) {
        next(null, bookservice.getbooks);
    };

})(module.exports);
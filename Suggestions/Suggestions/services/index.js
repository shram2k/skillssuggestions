(function (services) {

    var bookservice = require("./bookservice");
    var googlebookservice = require("./googlebookservice");
    var courserabookservice = require("./courserabookservice");
        
    services.getbooks = function (next) {
        next(null, bookservice.getbooks);
    };
    services.getMarketingSuggestions = function (next) {
        googlebookservice.getMarketingSuggestions(function (err, res) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, res);
            }
        });
    };
    services.searchSuggestions = function (interestName, next) {
        googlebookservice.searchSuggestions(interestName, function (err, res) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, res);
            }
        });
    };

    services.searchCourseraSuggestions = function (interestName, next) {
        courserabookservice.searchSuggestions(interestName, function (err, res) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, res);
            }
        });
    };

})(module.exports);
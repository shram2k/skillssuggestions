(function (services) {

    var bookservice = require("./bookservice");
    var goglebookservice = require("./goglebookservice");
        
    services.getbooks = function (next) {
        next(null, bookservice.getbooks);
    };
    services.getMarketingSuggestions = function (next) {
        goglebookservice.getMarketingSuggestions(function (err, res) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, res);
            }
        });
    };
    services.searchSuggestions = function (interestName, next) {
        goglebookservice.searchSuggestions(interestName, function (err, res) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, res);
            }
        });
    };
})(module.exports);
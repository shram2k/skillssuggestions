(function (apiController) {
    apiController.init = function (app) {
        var data = require("../services");
        
        app.get("/api/search/google/:interestName", function (req, res) {
            var interestName = req.params.interestName;
            data.searchSuggestions(interestName, function (err, results) {
                res.set("content-type", "application/json");
                res.send(results);
            });
        });
        app.get("/api/search/coursera/:interestName", function (req, res) {
            var interestName = req.params.interestName;
            data.searchCourseraSuggestions(interestName, function (err, results) {
                res.set("content-type", "application/json");
                res.send(results);
            });
        });

    };
})(module.exports);
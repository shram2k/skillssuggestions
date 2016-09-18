(function (apiController) {
    apiController.init = function (app) {
        var data = require("../services");
        
        app.get("/api/search/:interestName", function (req, res) {
            var interestName = req.params.interestName;
            data.searchSuggestions(interestName, function (err, results) {
                res.set("content-type", "application/json");
                res.send(results);
            });
        });
    };
})(module.exports);
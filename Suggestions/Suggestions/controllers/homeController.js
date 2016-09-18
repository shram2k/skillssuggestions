(function (homeController) {
    homeController.init = function (app) {
        var data = require("../services");

        app.get("/books", function (req, res) {
            //res.send("<html><body><h1>Express</h1></body></html>");

            data.getbooks(function (err, results) {

                res.render("index", { title: "The Books", error: err, books: results });


            });
        });
        app.get("/marketing", function (req, res) {

            data.getMarketingSuggestions(function (err, results) {
                //res.set("Content-Type", "application/json");
               // console.log(results);
                res.render("marketing", { title: "The Search", error: err, books: results });
            });

            //app.get("/", function (req, res) {
            //    res.send("<html><body><h1>Express</h1></body></html>");


            //});


        });
    };
})(module.exports);
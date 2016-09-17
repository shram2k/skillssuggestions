(function (exports) {
    exports.customServer = function () {
        var http = require('http');
        var server = http.createServer(function (req, res) {
            console.log(req.url);
            res.write("<html><body>hi</body></html>");
            res.end();
        });
       
        server.listen(3000);
    }
})(modules.exports);
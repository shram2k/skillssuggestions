var express = require('express');
var app = express();

var redis = require("redis"),
    client = redis.createClient();
var hello = require('./Test/hello');
//var bookservice = require('./modules/bookservice.js');



console.log('Hello world');
hello.SayHello();

var CronJob = require('cron').CronJob;
var job = new CronJob('00 34 11 * * 1-7', function () {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */

    console.log('timer run');
}, function () {
    /* This function is executed when the job stops */
    console.log('timer stop');
},
    true, /* Start the job right now */
    null /* Time zone of this job. */
);

job.start();

client.set("foo_rand000000000000", "OK");
client.get("foo_rand000000000000", function (err, reply) {
    console.log(reply.toString()); // Will print `OK`
});
client.quit();

var http = require("http");


var controllers = require("./controllers");
controllers.init(app);
app.set("view engine", "vash");
// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
//controllers.init(app);

//app.get("/", function (req, res) {
//    //res.send(bookservice.getbooks());
//    res.render("index", {
//        books: bookservice.getbooks()
//    });
//});

//  //  res.end();
// Map the routes

var server = http.createServer(app);
server.listen(3000);



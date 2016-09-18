(function (bookservice) {

    //var goglebookservice = require('./goglebookservice');
    bookservice.getbooks = [{
        title: "Book1",
        author:'ram'
    },
        {
            title: "Book2",
            author: 'vivek'
        },
        {
            title: "Book3",
            author: 'vivek'
        },
        {
            title: "Book4",
            author: 'vivek'
        }];

    //bookservice.getMarketingSuggestions = function (next) {
      
    //    goglebookservice.search('Marketing', function (error, results) {
    //        if (error) {
    //            next(err, null);
    //        } else {
    //            next(null, results);
    //        }
    //    });
    //}
  
})(module.exports);
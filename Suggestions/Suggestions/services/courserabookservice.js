


//module.exports.search = search;
//module.exports.lookup = lookup;

(function (courserabookservice) {

    var https = require('https');
    var _ = require('lodash');
    var querystring = require('querystring');


    // https://api.coursera.org/api/courses.v1?q=search&query=marketing&includes=instructorIds&fields=startDate,instructorIds,description,photoUrl
    var defaultOptions = {
        // Coursera API key
        key: null,
        // Search in a specified field
        fields: ['startDate', 'instructorIds', 'description', 'photoUrl', 'name', 'slug','previewLink'],
        limit: 10
    };


    

    // Base url for Google Books API
    var API_BASE_URL = 'https://api.coursera.org/api/courses.v1?q=search';
    var API_INSTRUCTOR_BASE_URL = 'https://api.coursera.org/api/instructors.v1';

    /**
     * Search Google Books
     *
     * https://developers.google.com/books/docs/v1/reference/volumes/list
     *
     * @param  {String}   query
     * @param  {object}   options
     * @param  {Function} callback
     */
    var search = function (query, options, callback) {

        // Make the options object optional
        if (!_.isFunction(callback)) {
            callback = options;
            options = {};
        }

        var options = _.extend({}, defaultOptions, options);

        // Validate options
        if (!query) {
            return callback(new Error('Query is required'));
        }

        if (options.limit < 1 || options.limit > 100) {
            return callback(new Error('Limit must be between 1 and 100'));
        }


        // Create the request uri
        var query = {
            query: query,
            limit: options.limit,
            includes: 'instructorIds',
            fields: _.join(options.fields,',')
        };

    
        var url = API_BASE_URL;

        sendRequest(url, query, function (err, response) {
            if (err) {
                return callback(err);
            }

            if (!_.isArray(response.elements)) {
                return callback(null, []);
            }

            var results = _.chain(response.elements)
                .map(parseBook)
                .compact()
                .value();

            callback(null, results, response);
        });
    };


    /**
     * Retrieves a Volume resource based on ID.
     *
     

    /**
     * Send a Google Books API request
     *
     * @return {void}
     */
    var sendRequest = function (url, params, callback) {
        

       

        if (params) {
            url += '&' + querystring.stringify(params);
        }

        https.get(url, function (response) {
            if (response.statusCode !== 200) {
                return callback(new Error('Google Books API error. Status Code: ' + response.statusCode));
            }

            var body = '';

            response.on('data', function (data) {
                body += data;
            });

            response.on('end', function () {
                try {
                    var data = JSON.parse(body);

                    if (data.error) {
                        callback(new Error(data.error.message));
                    } else {
                        callback(null, data);
                    }
                } catch (e) {
                    callback(new Error('Invalid response from Google Books API.'));
                }

            });
        }).on('error', function (error) {
            callback(error);
        });
    };


    /**
     * Parse a single book result
     *
     * @param  {Object}  data
     * @return {Object}
     */
    var parseBook = function (data) {
        //var book = _.pick(data.volumeInfo, [
        //    'title', 'subtitle', 'authors', 'publisher', 'publishedDate', 'description',
        //    'industryIdentifiers', 'pageCount', 'printType', 'categories', 'averageRating',
        //    'ratingsCount', 'maturityRating', 'language'
        //]);
        var book = _.pick(data, [
            'description'
        ]);

        var auth = _.map(data.instructorIds, getAuthor);
            _.extend(book, {
            id: data.id,
            title: data.name,
            link: data.previewLink,
            authors:auth,
           // authors: _.join(_.map(data.instructorIds, getAuthor),','),
            thumbnail: data.photoUrl,
            source: 'CourseraBooks'
        });

        return book;
    };

    var getAuthor = function (instructorid) {

        var url = API_INSTRUCTOR_BASE_URL + '/' + instructorid;
        var authors = [];
        sendRequest(url, null, function (err, response) {
            if (err) {
                return '';
            }

            if (!_.isArray(response.elements)) {
                return '';
            }

            _.forEach(response.elements, function (element) {
                authors.push(element.fullName);
            });

            return authors;
        });

    };

    courserabookservice.searchSuggestions = function (interestName, next) {

        search(interestName, function (error, results) {
            if (!error) {
                next(null, results);
            } else {
                next(error, null);
            }
        });

    };

})(module.exports);
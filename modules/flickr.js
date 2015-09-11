var Flickr = require('flickrapi');

var flickrOptions = {
        api_key: 'c74835928871f90cfc52887825d23055',
        secret: '8bafab808e75dde0'
    };



module.exports = {
    searchImage: function (term, callback) {
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            flickr.photos.search({ text: term }, callback);
        });
    }
};
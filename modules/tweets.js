var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'tOG8x4C8c8p8LhzBo2phNZdTI',
    consumer_secret: 'u4WorCzSAUyYE3C5v9JIvhRJbjad9KjSPKIV1j9E2KEyBFwLxt',
    access_token_key: '3521447118-fEkqlgDERTgPB5rASxJZ9odqEPXE7FDiAVanO4g',
    access_token_secret: 'lZrffpe1izHDQtl8YRfIhRc9bCtvtUI4paT4cdBOScT3j'
});



module.exports = {
    search: function (term, callback) {
        client.get('search/tweets', {q: term}, callback);
    }
};
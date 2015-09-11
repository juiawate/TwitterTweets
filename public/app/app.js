
var tweetApp = angular.module('tweetApp', []);

tweetApp.controller('SearchController', ['Tweets', 'Flickr', '$scope', '$filter', function (Tweets, Flickr, $scope, $filter) {
    $scope.term = '';

    $scope.search = function () {
        Tweets.search($scope.term).success(function (data) {
            data.result.statuses.forEach(function (status) {
                status.created_at = new Date(status.created_at);
            });
            $scope.tweets = data.result.statuses;
            $scope.tweets.forEach(function (tweet, index) {
                if(tweet.lang.slice(0,2) === 'en') {
                    var text = $filter('tweetcontent')(tweet.text);

                    Flickr.searchImage(text).success(function (data) {
                        if(data.images) {
                            var pic = data.images.photos.photo[0];
                            $scope.tweets[index]['imgSrc'] = 'http://farm' + pic["farm"] + '.static.flickr.com/' + pic["server"] + '/' + pic["id"] + '_' + pic["secret"] + '.jpg';
                        }
                    });

                }
            })
        });
    }

    $scope.searchKey = function (event) {
        if (event.keyCode === 13) {
            $scope.search();
        }
    }
}]);

tweetApp.factory('Tweets', function ($http, $q) {
    return {
        search: function (term) {
            return $http.post('/twitter/search', { term: term });
        }
    };
});

tweetApp.filter('tweetcontent', function () {
    return function (inp_str) {
        return inp_str.toString().replace(/RT @[^:]+:\s?/, '').replace(/http:\/\/t.co.+$|@\w+/gmi, '').match(/\w+/)[0];
    }
});

tweetApp.factory('Flickr', function ($http) {
    return {
        searchImage: function (term) {
            return $http.post('/twitter/searchImages', {term: term});
        }
    };
});
"use strict";
var todaysDate = new Date();
var yesterdaysDate = new Date( Date.now() - 24*60*60*1000 );
acquisitionApp.controller('acquiController', ['$scope','$http','acquiFactory', function($scope, $http, acquiFactory) {
    acquiFactory.get()
        .success(function(data) {
            angular.forEach(data, function(value, key) {
                data[key].date = new Date(data[key].date);
                if(data[key].date.toString().includes(todaysDate.toDateString())) {
                    data[key].date = "Today";
                } 
                // else if(new Date(data[key].date.valueOf()).toDateString().includes(yesterdaysDate.toDateString())) {
                //     data[key].date = "Yesterday";
                // } 
                else if(data[key].value === -1) {
                    data[key].value = "undisclosed";
                    angular.element(document.querySelector('#value')).css( "color", "#FF2100");
                }
            })
            $scope.acquis = data;
        });

    $scope.order = 'valuation';
    $scope.reverse = true;
    var current = $scope.order;
    $scope.updateOrder = function(order) {
        $scope.quantity = originalQuantity;
        $scope.hideUndisclosed = false;
        numRuns = 0;
        if(current === order) {
            $scope.reverse = !$scope.reverse;
        } else if($scope.reverse) {
            $scope.reverse = false;
            $scope.order = order;
            current = order;
        } else {
            $scope.order = order;
            current = order;
        }
        if(order === 'value') {
            $scope.hideUndisclosed = true;
        }
    }

    var cardsPerLine = Math.floor(window.innerWidth / 370);
    $scope.cardFrequency = [0, 1, 2, 3, 4];
    $scope.newsQuantity = 5;
    $scope.acquiQuantity = 5;

    var originalQuantity = $scope.acquiQuantity;
    var numRuns = 0;
    $scope.updateQuantity = function() {
        $scope.acquiQuantity += originalQuantity;
        if(numRuns < 3) {
            //$scope.adFrequency += 1;
            $scope.acquiQuantity += 1;
            numRuns += 1;
        } else {
            $scope.acuiQuantity += 2;
        }
    }

    $scope.setSize = function(length) {
        if(length >= 12 && length < 20) {
            return { 'font-size': "25px" }
        } else if(length >= 20 && length < 26) {
            return { 'font-size': "20px" }
        } else if(length >= 26) {
            return { 'font-size': "15px" }
        }
    }

    $scope.setValueSize = function(value) {
        if(value > 999 && value < 1000000) {
            return "30px";
        }
        return "36px";
    }

    $scope.getName = function(name, formattedName) {
        if(name === $scope.order && $scope.reverse) {
            return formattedName + ' \u25BC';
        } else if(name === $scope.order && !$scope.reverse) {
            return formattedName + ' \u25B2';
        } else if(name === 'name' && ($scope.order === 'seller.name' || $scope.order === 'buyer.name')) { 
            if($scope.reverse) {
                return formattedName + ' \u25BC';
            } else {
                return formattedName + ' \u25B2';
            }
        } else {
            return formattedName;
        }
    }
}]);

acquisitionApp.controller('feedController' ,  function($scope , $http) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20content%2CpubDate%2Cauthor%2Ctitle%2Cdescription%2Clink%20from%20rss%20where%20url%20in%20('http%3A%2F%2Ffeeds.feedburner.com%2FTechCrunch%2Ffundings-exits'%2C%20'http%3A%2F%2Fzephyr2.bvdep.com%2Fversion-201067%2FEditorialNews.serv%3Fproduct%3Dzephyrneo'%20%2C%20'https%3A%2F%2Fseekingalpha.com%2Fnews%2Fm-a%2Ffeed'%20%2C%20'%20http%3A%2F%2Fwww.rttnews.com%2Flist%2Fmergers.aspx'%20%2C%20'https%3A%2F%2Fwww.theguardian.com%2Fbusiness%2Fmergers-and-acquisitions%2Frss'%20%2C%20'http%3A%2F%2Fpehub.com%2Fcategory%2Fpe-backed-ma%2Ffeed'%20%2C%20'http%3A%2F%2Fwww.themiddlemarket.com%2Ffeed%3Frss%3Dtrue')%20%7C%20sort(field%3D%22pubDate%22%2C%20descending%3D%22true%22)&format=json&diagnostics=true&callback=JSON_CALLBACK";
    $http.jsonp(url).success(function(data, status, headers) {
        $scope.feed = {
            items: data.query.results.item
        };
    }).error(function(data, status, headers) {
        console.error('Feed Error:', data);
    });

    $scope.setButtonColor = function(link) {
        if(link.search('techcrunch') != -1) {
            return {'background': "#38FFAB"}
        } else if(link.search('seekingalpha') != -1) {
            return {'background': "#E9A24C"}
        } else if(link.search('zephyr') != -1) {
            return {'background': "#AC50EF"}
        } else if(link.search('guardian') != -1) {
            return {'background': "#E94FC2"}
        }
    }
});

acquisitionApp.controller('profileController' , function($scope , $http) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=env%20'store%3A%2F%2Fdatatables.org%2Falltableswithkeys'%3B%20select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22%2C%20%22AMZN%22%2C%22FB%22%2C%22WMT%22%2C%22BRK-A%22%2C%22XOM%22)%20&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
    $http.jsonp(url).success(function(data, status, headers) {
        $scope.feed = {
           items: data.query.results.quote
        };
    }).error(function(data, status, headers) {
        console.log('Feed Error' , data);
    })
});










// app.js
var acquisitionApp = angular.module('acquisitionApp', ['ui.router', 'angular.filter', 'ngAnimate']); 
var acquiURL = '/api/acquis';

acquisitionApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES
        .state('home', {
            url: '/',
            templateUrl: 'index.html'
        })
});

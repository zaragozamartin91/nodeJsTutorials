var mainApplicationModuleName = 'mean';

/*create a the main application module following the angular.module() method*/
/*we add the example module as a dependency of the main application module*/
/*we add the ngRoute module as a dependency for your main application's module*/
/*el modulo users es nuestro.*/
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'users', 'example']);

/*Hashbangs are implemented by adding an exclamation mark right after the hash sign, so an example URL would
be http://localhost:3000/#!/example.*/
mainApplicationModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}])

/*this will solve Facebook's redirect bug that adds a hash part to the application's URL after the OAuth authentication round-trip*/
if (window.location.hash === '#_=_') window.location.hash = '#!';

/*you used the angular object jqLite functionality to bind a function to the document-ready event*/
angular.element(document).ready(function() {
    /*you used the angular.bootstrap() method to initiate a new AngularJS application using the main application module*/
    angular.bootstrap(document, [mainApplicationModuleName]);
});
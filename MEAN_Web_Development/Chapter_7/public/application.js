var mainApplicationModuleName = 'mean';

/*create a the main application module following the angular.module() method*/
/*we add the example module as a dependency of the main application module*/
/*we add the ngRoute module as a dependency for your main application's module*/
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'example']);

/*Hashbangs are implemented by adding an exclamation mark right after the hash sign, so an example URL would
be http://localhost:3000/#!/example.*/
mainApplicationModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}])

/*you used the angular object jqLite functionality to bind a function to the document-ready event*/
angular.element(document).ready(function() {
    /*you used the angular.bootstrap() method to initiate a new AngularJS application using the main application module*/
    angular.bootstrap(document, [mainApplicationModuleName]);
});
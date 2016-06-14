/*Another entity that is packed in the ngRoute module is the ng-view directive. The ng-view directive tells the AngularJS router which DOM element to use to 
render the routing views. When the user navigates to a specified URL, AngularJS will render the template inside the DOM element marked with this directive*/
//------------------------------------------------------------------------------------------------------------------------------------------------------------

/*You used the angular.module() method to grab the example module and executed the config() method to
create a new configuration block. Then, you applied DI to inject the $routeProvider object to your configuration function*/
angular.module('example').config(['$routeProvider', function($routeProvider) {
    /*the $routeProvider.when() method to define a new route. The first argument of the $routeProvider.when() method is
    the route's URL, and the second one is an options object, where you defined your template's URL.*/
    $routeProvider.when('/', {
        templateUrl: 'example/views/example.client.view.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);
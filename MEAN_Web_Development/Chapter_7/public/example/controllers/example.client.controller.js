/*you used the angular.module() method to retrieve your example module. Then, you used the AngularJS module's controller() method to 
create a new ExampleController constructor function. In your constructor function, you applied the dependency injection to inject the 
$scope object. Finally, you used the $scope object to define a name property, which will later be used by your view.*/

/*el servicio Authentication se encuentra declarado en /public/users/services */

angular.module('example').controller('ExampleController', ['$scope',
    'Authentication',
    function($scope, Authentication) {
        $scope.name = Authentication.user ? Authentication.user.fullName :
            'MEAN Application';
    }
]);
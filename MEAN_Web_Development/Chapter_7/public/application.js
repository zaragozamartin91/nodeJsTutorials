var mainApplicationModuleName = 'mean';

/*create a the main application module following the angular.module() method*/
var mainApplicationModule = angular.module(mainApplicationModuleName, []);

/*you used the angular object jqLite functionality to bind a function to the document-ready event*/
angular.element(document).ready(function() {
    /*you used the angular.bootstrap() method to initiate a new AngularJS application using the main application module*/
    angular.bootstrap(document, [mainApplicationModuleName]);
});
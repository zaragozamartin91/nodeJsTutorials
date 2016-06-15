/*Creating angular services can be done using one of three module methods: provider(), service(),and factory().*/
//--------------------------------------------------------------------------------------------------------------------------

/*factory(): This is used to provide the value returning from the invoked
service function. You should use it when you want to share objects and
data across your application.*/

/*al modulo users le creamos un servicio Authentication en modo factory()*/
angular.module('users').factory('Authentication', [
    function() {
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);
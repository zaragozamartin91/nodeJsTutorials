/*if a module is a directory, the file in the module directory that will be evaluated
must be named index.js, unless specified otherwise by a file in the module directory
named package.json. To specify an alternative to index.js, the package.json file must
contain JavaScript Object Notation (JSON) data defining an object with a key named
main that specifies the path, within the module directory, to the main file.*/
var Currency = function(canadianDollar) {
	this.canadianDollar = canadianDollar;
}
Currency.prototype.roundTwoDecimals = function(amount) {
	return Math.round(amount * 100) / 100;
}
Currency.prototype.canadianToUS = function(canadian) {
	return this.roundTwoDecimals(canadian * this.canadianDollar);
}
Currency.prototype.USToCanadian = function(us) {
	return this.roundTwoDecimals(us / this.canadianDollar);
}

/*Incorrect; Node doesn’t allow exports to be overwritten*/
//exports = Currency;

/*DE ESTA MANERA, SE EXPORTA EL MODULO COMPLETO COMO UNA CLASE*/
module.exports = Currency;
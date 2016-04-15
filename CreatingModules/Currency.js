/*What ultimately gets exported in your application is module.exports. exports is set
up simply as a global reference to module.exports, which initially is defined as an
empty object that you can add properties to. So exports.myFunc is just shorthand
for module.exports.myFunc.
As a result, if exports is set to anything else, it breaks the reference between
module.exports and exports. Because module.exports is what really gets
exported, exports will no longer work as expected—it doesn’t reference module
.exports anymore. */

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
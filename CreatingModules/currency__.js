/*The variable canadianDollar acts as a private variable that affects the logic in canadianToUS and USToCanadian but can’t be directly accessed by 
the application.*/
var canadianDollar = 0.91;

function roundTwoDecimals(amount) {
	return Math.round(amount * 100) / 100;
}

/*canadianToUS function is set in exports module so it can be used by code requiring this module*/
exports.canadianToUs = function(canadian) {
	return roundTwoDecimals(canadian * canadianDollar);
};

exports.usToCanadian = function(us) {
	return roundTwoDecimals(us / canadianDollar);
};



/*Path uses ./ to indicate that module exists within same directory as application script*/
/*When requiring, the .js extension is assumed, so you can omit it if desired.*/
/*After Node has located and evaluated your module, the require function returns the contents of the 'module.exports' object defined in the module*/
/*currency__.js DEFINE METODOS DENTRO DEL MODULO*/
var currency = require('./currency__');

console.log('50 canadian dollars equal: ');
console.log(currency.canadianToUs(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.usToCanadian(30));


/*Currency.js DEFINE UNA CLASE Currency CON METODOS IGUALES A LOS SUPERIORES*/
var Currency = require('./Currency');
var currency = new Currency();
console.log('50 canadian dollars equal: ');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));


/*In the earlier module example, you required ./Currency. If you omit the ./ and
simply require currency, Node will follow a number of rules, as specified in figure 3.5,
to search for this module. The NODE_PATH environmental variable provides a way to specify alternative locations
for Node modules. If used, NODE_PATH should be set to a list of directories separated
by semicolons in Windows or colons in other operating systems.*/
/* BASICAMENTE UN MODULO SOLICITADO COMO  require('./Currency') (SIN EL ./)  SERA BUSCADO EN EL DIRECTORIO 
node_modules. A SU VEZ EL DIRECTORIO node_modules SERA BUSCADO EN EL MISMO DIRECTORIO QUE LA APP Y EN EL DIRECTORIO
PADRE.*/

/*UN MODULO DE NODE PUEDE SER DEFINIDO COMO UN DIRECTORIO. EL DIRECTORIO QUE DEFINE UN MODULO PUEDE CONTENER UN ARCHIVO package.json EL CUAL
DEFINE LAS DEPENDENCIAS DEL MODULO Y EL NOMBRE DEL ARCHIVO PRINCIPAL DEL MODULO. SI NO HAY ARCHIVO PRINCIPAL DEFINIDO EN package.json, SE 
ASUME QUE EL MISMO SE NOMBRA 'index.json' */
var Currency = require('./CurrencyDir');
var currency = new Currency();
console.log('50 canadian dollars equal: ');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));
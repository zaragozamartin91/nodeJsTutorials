console.log("this file is: " + __filename);
console.log("this dir is: " + __dirname);

var salute = function() {
    console.log("OH, HELLO!");
};

/*The setTimeout(cb, ms) global function is used to run callback cb after at least ms milliseconds. 
The actual delay depends on external factors like OS timer granularity and system load. A timer cannot span more than 24.8 days*/
setTimeout(salute, 2 * 1000);

// Now call above function after 2 seconds
setInterval(salute, 2000);

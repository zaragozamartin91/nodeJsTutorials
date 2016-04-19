MISC
----
Modules can either be single files or directories containing one or more
files. If a module is a directory, the file in the module directory that will be evaluated
is normally named index.js (although this can be overridden: see section 3.1.4).
To create a typical module, you create a file that defines properties on the exports
object with any kind of data, such as strings, objects, and functions.

A note about require and synchronous I/O
----------------------------------------
require is one of the few synchronous I/O operations available in Node. Because
modules are used often and are typically included at the top of a file, having require
be synchronous helps keep code clean, ordered, and readable.
But avoid using require in I/O-intensive parts of your application. Any synchronous
call will block Node from doing anything until the call has finished. For example, if
you’re running an HTTP server, you would take a performance hit if you used require
on each incoming request. This is typically why require and other synchronous operations
are used only when the application initially loads.

What really gets exported
-------------------------
What ultimately gets exported in your application is module.exports. exports is set
up simply as a global reference to module.exports, which initially is defined as an
empty object that you can add properties to. So exports.myFunc is just shorthand
for module.exports.myFunc.
As a result, if exports is set to anything else, it breaks the reference between
module.exports and exports. Because module.exports is what really gets
exported, exports will no longer work as expected—it doesn’t reference module
.exports anymore. If you want to maintain that link, you can make module.exports
reference exports again as follows:
module.exports = exports = Currency;
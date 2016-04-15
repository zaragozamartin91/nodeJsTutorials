Modules can either be single files or directories containing one or more
files. If a module is a directory, the file in the module directory that will be evaluated
is normally named index.js (although this can be overridden: see section 3.1.4).
To create a typical module, you create a file that defines properties on the exports
object with any kind of data, such as strings, objects, and functions.
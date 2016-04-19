Although you can create Node applications without formally specifying dependencies,
it’s a good habit to take the time to specify them. That way, if you want others to use
your application, or you plan on running it in more than one place, it becomes more
straightforward to set up.
Application dependencies are specified using a package.json file. This file is always
placed in an application’s root directory. A package.json file consists of a JSON expression
that follows the CommonJS package descriptor standard.


In a package.json file you can
specify many things, but the most important are the name of your application, the version,
a description of what the application does, and the application’s dependencies

Event emitters
--------------
An event emitter is associated with a conceptual resource of some kind and can send
and receive messages to and from the resource. The resource could be a connection
to a remote server or something more abstract, like a game character. The Johnny-
Five project (https://github.com/rwldrn/johnny-five), in fact, leverages Node for
robotics applications, using event emitters to control Arduino microcontrollers.
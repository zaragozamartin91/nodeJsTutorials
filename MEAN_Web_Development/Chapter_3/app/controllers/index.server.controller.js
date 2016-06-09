/*You just created your first Express controller. This code is probably
looking very familiar; that's because it's a copy of the middleware you created in
the previous examples. What you do here is using the CommonJS module pattern
to define a function named render().*/
exports.render = function(req, res) {
    res.send('Hello world!');
};
var http = require('http');

var express = require('express');

var app = express();

// ************************************
// This is the real meat of the example
// ************************************

(function() {

    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');
    var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 100000
    }));
})();

// Do anything you like with the rest of your express application.

if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000, function() {
        console.log("Listening on %j", server.address());
    });
}

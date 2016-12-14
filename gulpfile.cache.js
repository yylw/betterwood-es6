var gulp = require('gulp');
var webpack = require('webpack');
var webpackServer = require('webpack-dev-server');
var devConfig = require('./webpack.config');
var gutil = require('gulp-util');


var port = 8080;
var host = 'localhost';






gulp.task('server', function() {
    var config = Object.create(devConfig);
    var compiler = webpack(config);

    new webpackServer(compiler, {
        publicPath: '/',
        stats: {colors: true},
        hot: true,
        progress: true
    }).listen(port, host, function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://' + host + ':'+ port +'/webpack-dev-server/html/index.html');
    });
});
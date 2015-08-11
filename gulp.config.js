module.exports = function() {
    var client = './src/client/',
        clientApp = client + 'app/',
        build = './build/',
        scss = 'styles/scss/',
        css = 'styles/css/';

    var config = {
        client: client,
        index: client + 'index.html',
        build: build,
        scss: [
            client + scss + '**/*.scss'
        ],
        css: [
            client + css + '**/*.css'
        ],
        js: [
            clientApp + '**/*.js'
        ],
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};

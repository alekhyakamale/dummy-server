npm install -- To install all the dependencies 

node server.js to start the server

To use in webpack server add the following to webpack.config.js file.


    devServer: {
        port: 8080,
        stats: 'errors-only',
        proxy: {
            '/api': {
                target: 'http://localhost:20403/',
                secure: true
            }
        }
    },

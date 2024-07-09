var  compressor = require('node-minify');

const files = './scripts/*.js';
const out = './dist/ddm.min.js';

// With Promise
var promise = compressor.minify({
    compressor: 'uglifyjs',
    input: files,
    output: out
});

promise.then(function(min) {}).catch(function(err) {});

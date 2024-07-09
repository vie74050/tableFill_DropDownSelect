const fs = require('fs'); 
var  compressor = require('node-minify');

const jsfiles = './scripts/*.js';
const jsout = './dist/scripts/js/ddm_v2.min.js';
const cssfiles = './scripts/*.css';
const cssout = './dist/scripts/css/ddm_v2.min.css';    

// minify  js
var promise1 = compressor.minify({
    compressor: 'gcc',
    input: jsfiles,
    output: jsout,
    callback: function(err, min) {}
});
promise1.then(
    function(min) {
        console.log('js minified');
        
        packageFolder('./dist/scripts/js/', './dist/scripts/ddm_v2.js');
    })
    .catch(
    function(err) {
        console.log('js minify error', err);
    });


// minify css
var promise2 = compressor.minify({
    compressor: 'clean-css',
    input: cssfiles,
    output: cssout,
    callback: function(err, min) {}
});
promise2.then(
    function(min) {
        console.log('css minified');
        
        packageFolder('./dist/scripts/css/', './dist/scripts/ddm_v2.css');
    })
    .catch(
    function(err) {
        console.log('css minify error', err);
    });

// pack all files in folder (order is not guaranteed)
function packageFolder(dir, out) {
    // clear file if already exists
    fs.writeFileSync(out, '');

    fs.readdirSync(dir).forEach((file) => {
        let filepath = dir + file; console.log(filepath);
        if (fs.lstatSync(filepath).isFile())
            fs.appendFileSync(
              out,
              fs.readFileSync(filepath).toString()
            );
    }); 
}

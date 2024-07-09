const fs = require('fs'); 

const cssdir = "./scripts/libs/css/";
const jsdir = "./scripts/libs/js/";
const cssout = "./dist/scripts/css/ddm_v2-libs.min.css";
const jsout = "./dist/scripts/js/ddm_v2-libs.min.js";

// pack files in order
const cssfiles = [cssdir+'bootstrap.min.css', cssdir+'bootstrap.min.css', cssdir+'bootstrap-select.min.css'];
const jsfiles = [jsdir+'jquery1.9.1.min.js', jsdir+'bootstrap.min.js', jsdir+'bootstrap-select.min.js'];
function packageFiles(files, out) {
    // clear file if already exists
    fs.writeFileSync(out, '');

    files.forEach((file) => {
        fs.appendFileSync(
          out,
          fs.readFileSync(file).toString()
        );
    }); 
}   
packageFiles(cssfiles, cssout);
packageFiles(jsfiles, jsout);


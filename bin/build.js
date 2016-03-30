// This script is intended to be used from the package root, from npm scripts.
//
// Usage:
//
//   npm run build
//   => bump version number to next pre-release suffix
//      and recreate jspm bundles
//
//   npm run build -- 1.10.21818
//   => set official version number and recreate jspm bundle
//
//   npm run unbuild
//   => bump version number to next pre-release suffix
//      and deregister jspm bundle to work on source files directly
//
// Additional commands:
//   npm run set-version
//   => switch package.json to the next pre-release version (-dev.0)
//
//   npm run set-version -- 1.10.21818
//   => switch package.json to the specified version
//
//   npm run make-index
//   => rebuild the global jspm index file that includes all functions
//
"use strict";
var fs = require('fs');
var resolve = require('path').resolve;
var semver = require('semver');
var jspm = require('jspm');
var babel = require('babel-core');

function makeIndex()
{
    // generate a source file (async/await) index that includes support for all Yoctopuce functions
    var index = 'export * from \'yoctolib-es/src/yocto_api\'\n';
    var lib = resolve(__dirname, '../lib/src/');
    fs.readdirSync(lib).forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.js' && mod != 'index.js' && mod != 'yocto_api.js') {
            index += 'export * from \'yoctolib-es/src/' + mod.slice(0, -3) + '\'\n';
        }
    });
    fs.writeFileSync("lib/src.js", index, 'utf-8');
    console.log('source index file has been updated')
}

function setVersion(str_newver)
{
    // update version number is package.json
    var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    var newver = '?';
    console.log('Was at version ' + json.version);
    if (str_newver) {
        // argument is new version number
        newver = semver.clean(str_newver);
        if (!newver) {
            console.log('Invalid version number: ' + process.argv[2]);
            process.exit(1);
        }
    } else {
        // bump local revision number
        newver = semver.inc(json.version, 'prerelease', 'dev');
    }
    console.log('Now at version ' + newver);
    json.version = newver;
    fs.writeFileSync("package.json", JSON.stringify(json, null, 2), 'utf-8');

    // update version number in yocto_api.js
    var pattern = '/* version number patched automatically */';
    var jsFile = fs.readFileSync('lib/src/yocto_api.js');
    var pos = jsFile.indexOf(pattern);
    if(pos < 0) {
        console.log('*** Warning, cannot patch yocto_api.js, pattern not found !');
    } else {
        pos += pattern.length;
        let endMark = jsFile.indexOf(';', pos);
        let patch = "'" + newver + "'";
        let res = new Buffer(pos + patch.length + jsFile.length-endMark);
        jsFile.copy(res, 0, 0, pos);
        res.write(patch, pos);
        jsFile.copy(res, pos + patch.length, endMark);
        fs.writeFileSync('lib/src/yocto_api.js', res);
    }

    // update version number in example configuration files
    [ 'example_html', 'example_nodejs', 'hidden'].forEach(function(dirname) {
        var lib = resolve(__dirname, '../'+dirname);
        fs.readdirSync(lib).forEach(function (exname) {
            var exdir = resolve(lib, exname);
            // patch package.json
            json = false;
            try {
                json = JSON.parse(fs.readFileSync(exdir + '/package.json', 'utf8'));
            } catch (err) {
                //console.log('No file "'+exdir+'/package.json"');
            }
            if (json && json.dependencies) {
                json.dependencies['yoctolib-es'] = '^'+newver;
                fs.writeFileSync(exdir+'/package.json', JSON.stringify(json, null, 2), 'utf-8');
            }
            if (json && json.jspm && json.jspm.dependencies) {
                json.jspm.name = json.name;
                json.jspm.dependencies['yoctolib-es'] = 'npm:yoctolib-es@^'+newver;
                fs.writeFileSync(exdir+'/package.json', JSON.stringify(json, null, 2), 'utf-8');
            }
            // patch jspm.config.js (remove map: section, if any)
            var configjs = false;
            try {
                configjs = fs.readFileSync(exdir + '/jspm.config.js');
            } catch(err) {
                //console.log('No file "'+exdir+'/jspm.config.js"');
            }
            if(configjs) {
                pattern = 'map: {';
                pos = configjs.indexOf(pattern);
                if(pos >= 0) {
                    pos += pattern.length;
                    let endMark = configjs.indexOf('}', pos);
                    let res = new Buffer(pos + configjs.length-endMark);
                    configjs.copy(res, 0, 0, pos);
                    configjs.copy(res, pos, endMark);
                    fs.writeFileSync(exdir + '/jspm.config.js', res);
                }
            }
            // patch jspm.browser.js (BaseURL)
            var browserjs = false;
            try {
                browserjs = fs.readFileSync(exdir + '/jspm.browser.js');
            } catch (err) {
                //console.log('No file "'+exdir+'/jspm.browser.js"');
            }
            if(browserjs) {
                pattern = 'baseURL: "';
                pos = browserjs.indexOf(pattern);
                if(pos >= 0) {
                    pos += pattern.length;
                    let endMark = browserjs.indexOf('"', pos);
                    let patch = '/EcmaScript/'+dirname+'/'+exname+'/';
                    let res = new Buffer(pos + patch.length + browserjs.length-endMark);
                    browserjs.copy(res, 0, 0, pos);
                    res.write(patch, pos);
                    browserjs.copy(res, pos + patch.length, endMark);
                    fs.writeFileSync(exdir + '/jspm.browser.js', res);
                }
            }
        });
    });
}

function runBabel()
{
    // generate an EcmaScript 2015 version compatible with node.js
    var lib = resolve(__dirname, '../lib/src/');
    var babel_options = {
        'plugins': [
            "transform-async-to-generator",
            "transform-es2015-arrow-functions",
            "transform-es2015-parameters",
            "transform-es2015-destructuring",
            "transform-es2015-modules-commonjs"
        ],
        'compact': false
    };
    var jspmIndex = 'module.exports = require("./yocto_api.js");\n';
    jspmIndex += 'function addExports(mod) { for(var key in mod) module.exports[key] = mod[key]; }\n';
    fs.readdirSync(lib).forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.js' && mod != 'index.js') {
            var res = babel.transformFileSync('lib/src/'+mod, babel_options);
            res.code = res.code.replace(/'yoctolib-es\/src\//g, "'./");
            fs.writeFileSync('lib/'+mod, res.code + '\n', 'utf-8');
            if(mod != 'yocto_api.js') {
                jspmIndex += 'addExports(require("./'+mod+'"));\n';
            }
        }
    });
    fs.writeFileSync('lib/index.js', jspmIndex, 'utf-8');
    console.log('transpiled version has been updated')
}

var args = process.argv.slice(2);
if(args.length == 0) {
    console.log("argument expected: build, set-version, make-index, babel")
} else {
    switch(args[0]) {
        case "set-version":
            setVersion(args[1]);
            break;
        case "make-index":
            makeIndex();
            break;
        case "babel":
            runBabel();
            break;
        case "build":
            setVersion(args[1]);
            makeIndex();
            runBabel();
            break;
    }
}
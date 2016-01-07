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
    // generate index files that includes support for all Yoctopuce functions
    // - yoctolib-es/index.js is used when loading module from github using jspm
    // - yoctolib-es.js us used when loading module locally (within examples)
    var index = 'export * from \'yoctolib-es/yocto_api\'\n';
    var lib = resolve(__dirname, '../yoctolib-es/');
    fs.readdirSync(lib).forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.js' && mod != 'index.js' && mod != 'yocto_api.js') {
            index += 'export * from \'yoctolib-es/' + mod.slice(0, -3) + '\'\n';
        }
    });
    fs.writeFileSync("yoctolib-es.js", index, 'utf-8');
    fs.writeFileSync("yoctolib-es/index.js", index, 'utf-8');
    console.log('index files have been updated')
}

function setVersion(str_newver)
{
    // update version number is package.json
    var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('Was at version ' + json.version);
    if (str_newver) {
        // argument is new version number
        var newver = semver.clean(str_newver);
        if (newver) {
            json.version = newver;
        } else {
            console.log('Invalid version number: ' + process.argv[2]);
        }
    } else {
        // bump local revision number
        json.version = semver.inc(json.version, 'prerelease', 'dev');
    }
    console.log('Now at version ' + json.version);
    fs.writeFileSync("package.json", JSON.stringify(json, null, 2), 'utf-8');

    // update version number in yocto_api.js
    var pattern = '/* version number patched automatically */';
    var jsFile = fs.readFileSync('yoctolib-es/yocto_api.js');
    var pos = jsFile.indexOf(pattern);
    if(pos < 0) {
        console.log('*** Warning, cannot patch yocto_api.js, pattern not found !');
    } else {
        pos += pattern.length;
        var endMark = jsFile.indexOf(';', pos);
        var patch = "'" + json.version + "'";
        var res = new Buffer(pos + patch.length + jsFile.length-endMark);
        jsFile.copy(res, 0, 0, pos);
        res.write(patch, pos);
        jsFile.copy(res, pos + patch.length, endMark);
        fs.writeFileSync('yoctolib-es/yocto_api.js', res);
    }
}

function runBabel()
{
    // generate an node.js bundle file that includes support for all Yoctopuce functions
    var lib = resolve(__dirname, '../yoctolib-es/');
    var babel_options = {
        'plugins': [
            "transform-strict-mode",
            "transform-es2015-arrow-functions",
            "transform-es2015-parameters",
            "transform-es2015-destructuring",
            "transform-es2015-typeof-symbol",
            "transform-es2015-modules-commonjs",
            "transform-async-to-generator"
        ],
        'compact': false
    };
    var index = 'module.exports = require("./yoctolib-node/yocto_api.js");\n'+
            'function addExports(mod) { for(var key in mod) module.exports[key] = mod[key]; }\n';
    fs.readdirSync(lib).forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.js' && mod != 'index.js') {
            var res = babel.transformFileSync('yoctolib-es/'+mod, babel_options);
            res.code = res.code.replace(/yoctolib-es\//g, './');
            fs.writeFileSync('yoctolib-node/'+mod, res.code + '\n', 'utf-8');
            if(mod != 'yocto_api.js') {
                index += 'addExports(require("./yoctolib-node/'+mod+'"));\n';
            }
        }
    });
    fs.writeFileSync('yoctolib-node.js', index, 'utf-8');
    console.log('yoctolib-node version has been updated')
}

function build()
{
    var bundleOptions = { sourceMaps: true, lowResSourceMaps: false, minify: false, inject:true };
    console.log('Please be patient, this can take a few minutes...');
    console.log('Creating pre-transpiled files');
    runBabel();
    console.log('Creating yoctolib-es bundle');
    jspm.setPackagePath('.');
    jspm.bundle('yoctolib-es', 'bundles/yoctolib-es.js', bundleOptions)
    .then(function() { console.log('yoctolib-es bundle created, jspm will use pre-transpiled file'); })
    .catch(function(err) { console.log(err); });
}

function unbuild()
{
    jspm.setPackagePath('.');
    jspm.unbundle()
    .then(function() { console.log('Bundles unregistered, jspm will work from source files'); })
    .catch(function(err) { console.log(err); });
}

var args = process.argv.slice(2);
if(args.length == 0) {
    setVersion();
    makeIndex();
    build();
} else {
    switch(args[0]) {
        case "build":
            setVersion(args[1]);
            makeIndex();
            build();
            break;
        case "unbuild":
            setVersion();
            makeIndex();
            unbuild();
            break;
        case "set-version":
            setVersion(args[1]);
            break;
        case "make-index":
            makeIndex();
            break;
    }
}
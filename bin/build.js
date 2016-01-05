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
    // - lib/index.js is used when loading module from github using jspm
    // - yoctolib-es.js us used when loading module locally (within examples)
    var locindex = 'export * from \'lib/yocto_api\'\n';
    var libindex = 'export * from \'yoctolib-es/yocto_api\'\n';
    var lib = resolve(__dirname, '../lib/');
    fs.readdirSync(lib).forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.js' && mod != 'index.js') {
            locindex += 'export * from \'lib/' + mod.slice(0, -3) + '\'\n';
            libindex += 'export * from \'yoctolib-es/' + mod.slice(0, -3) + '\'\n';
        }
    });
    fs.writeFileSync("yoctolib-es.js", locindex, 'utf-8');
    fs.writeFileSync("lib/index.js", libindex, 'utf-8');
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
    var jsFile = fs.readFileSync('lib/yocto_api.js');
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
        fs.writeFileSync('lib/yocto_api.js', res);
    }
}

function runBabel()
{
    // generate an node.js bundle file that includes support for all Yoctopuce functions
    var bundle = '';
    var lib = resolve(__dirname, '../lib/');
    var babel_options = {
        'plugins': [
            "transform-strict-mode",
            "transform-es2015-parameters",
            "transform-es2015-destructuring",
            "transform-es2015-typeof-symbol",
            "transform-es2015-modules-commonjs",
            "transform-es2015-object-super",
            "transform-async-to-generator"
        ],
        'compact': false
    };
    fs.readdirSync(lib).forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.js') {
            var res = babel.transformFileSync('lib/'+mod, babel_options);
            bundle += res.code + '\n';
        }
    });
    fs.writeFileSync("bundles/yoctolib-node.js", bundle, 'utf-8');
    console.log('yoctolib-node.js file has been recreated')
}

function build()
{
    var bundleOptions = { sourceMaps: true, lowResSourceMaps: false, minify: false, inject:true };
    console.log('Please be patient, this can take a few minutes...');
    console.log('Creating yoctolib-node.js bundle');
    runBabel();
    console.log('Creating yoctolib-jspm bundle');
    jspm.setPackagePath('.');
    jspm.bundle('yoctolib-es', 'bundles/yoctolib-jspm.js', bundleOptions)
    .then(function() { console.log('yoctolib-jspm bundle created, jspm will use pre-transpiled file'); })
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
            build(args[1]);
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
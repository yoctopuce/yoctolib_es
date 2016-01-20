Preview of Yoctopuce EcmaScript 2015 library
============================================

## Content of this package

* **bin/**
	Misc scripts used internally by build commands
* **package.json**
	npm package file, including build commands
* **jspm.browser.js**
	jspm browser-specific configuration file
* **jspm.js**
	jspm common configuration file
* **example_html/**
	Example files that run within a web browser
* **example_node/**
	Example files that run on node.js
* **lib/index.js**
	Root file for loading the library whole with npm or jspm (transpiled version, for V8 engine)
* **lib/yocto_*.js**
	Transpiled code for the library, ready to use with V8 engine (node.js v4+, Chrome, etc) 
* **lib/src.js**
	Root file for using the library in source format with jspm
* **lib/src/**
	Source code of the library (EcmaScript 2015 + async/await stage-3 extension)
* **LICENCE.txt**
	Yoctopuce Licence

## Using the library with jspm

NOTE: This version of the library is designed for jspm 0.17 (currently in beta) !

Start by installing **Node.js** and **jspm** on your system, because you'll need them. It is very easy.
On Windows, you only have to run the npm installer and that's it. Make sure to install it fully,
including npm, and add it to the system path. To install jspm on the machine, you will need a single
npm command:
```bash
npm install jspm@beta -g
```

To give it a try, go into one of the example directory (for instance `example_nodejs/Doc-Inventory`). You will
see that it include an application description file (`package.json`), a jspm configuration file (`jspm.js`) and
the source code (`src/demo.js`). To download and setup the libraries needed by this example, run:
```bash
npm install
jspm install
```
Once done, you can start the example file using
```bash
jspm run src/demo.js
```
The `jspm run` command will actually transpile the example code into JS code that node can understand, and
execute it with node.js.

When you go into production, you can build your application once for all to avoid requiring jspm on the target
machine. In order to do this, just run:
```bash
jspm build src/demo.js --node
```
This will create a single file named `build.js`, that includes everything needed to run your demo.js (even if
your application is made of multiple source files). You can then execute it simply using:
```bash
node build.js
```

## Using JSPM in browser code

For HTML examples, the principle is very similar. When you open the HTML file with a browser, the SystemJS module
manager will loads and transpiles the code on the fly.

To give it a try, go into one of the example directory (for instance `example_html/Doc-Inventory`). You will
see that it include an application description file (`package.json`), a jspm configuration file (`jspm.js`),
a browser-specific jspm configuration file (`jspm.browser.js`) and the the source files (`inventory.html`
and `src/demo.js`). To download and setup the libraries needed by this example, go into the project directory
and run:
```bash
npm install
jspm install
```
Then make sure the directory on which you have your project is available through a web server (you can specify
the base URL in `jspm.browser.js`), and open `inventory.html` in your browser through your HTTP server.

Note that our pre-transpiled library code is optimized for running quickly with recent JS engines (Chrome 47,
FireFox 45, Opera 36, Edge 13, Safari 9). If you need to support older browsers, you can import our library
in source form rather than pre-transpiled form. This will takes a bit longer to load initially, but will
then run on any EcmaScript-5 browser. In order to do so, in the `demo.js` code, change the import statement
as below to point to the source library:
```javascript
import { YAPI, YModule, YErrMsg } from 'yoctolib-es/src'
```

To avoid transpiling your JS code each time you load the page and to load all the individual shims, you can
also ask jspm to build a monolithic js file that contains everything needed for your project, minified to
reduce file transfers, like this:
```bash
jspm build --minify src/demo.js demo-sfx.js
```
Now you can replace all include lines in `inventory.html` by a single include of `demo-sfx.js`.

You can further reduce the amount of code downloaded by importing just the submodules that you need from
our library, instead of including it completely. For instance, in the inventory example, you could use
```javascript
import { YAPI, YModule, YErrMsg } from 'yoctolib-es/yocto_api'
```
or to import in source form:
```javascript
import { YAPI, YModule, YErrMsg } from 'yoctolib-es/src/yocto_api'
```

## Creating a JSPM application from scratch

Rather than starting from one of our examples, you can create a "blank" JSPM application using our library
from scratch using the following commands:
```bash
jspm init . -y
jspm install npm:yoctolib-es
```

This creates all necessary configuration files in your directory to run the Yoctopuce EcmaScript 2015 library with
jspm. If you remove the `-y` argument on the command line, you will be prompted for individual settings such
as preferred directory names, etc.

## Using the library WITHOUT jspm

Since the yoctopuce EcmaScript 2015 ships with pre-transpiled files for the V8 engine used by Node.JS versions 4+,
Google Chrome, as well as for Firefox. It is therefore possible to use it without JSPM, if you can live without
the convenient async/await syntax (or if you transpile your code async/await code yourself using babel).

In order to use the library in node.js WITHOUT jspm, just install yoctolib-es in your project:
```bash
npm install yoctolib-es --save
```

Then require it in your node.js code, and use all functions taking into account that they all return
promises. There is an example in example_nodejs/Prog-VanillaNodeJs.

## License information

Copyright (C) 2015 and beyond by Yoctopuce Sarl, Switzerland.

Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
non-exclusive license to use, modify, copy and integrate this
file into your software for the sole purpose of interfacing
with Yoctopuce products.

You may reproduce and distribute copies of this file in
source or object form, as long as the sole purpose of this
code is to interface with Yoctopuce products. You must retain
this notice in the distributed source file.

You should refer to Yoctopuce General Terms and Conditions
for additional information regarding your rights and
obligations.

THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
WARRANTY, OR OTHERWISE.


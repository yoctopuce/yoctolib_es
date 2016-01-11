Preview of Yoctopuce EcmaScript 2015 library
============================================

## Content of this package

* **bin/**
	Misc scripts used internally by build commands
* **package.json**
	npm package file, including build commands
* **config.js**
	jspm configuration file file
* **example_html/**
	Example files that run within a web browser
* **example_node/**
	Example files that run on node.js
* **yoctolib-es.js**
	Root file for loading the library locally with npm or jspm (transpiled version, for V8 engine)
* **yoctolib-es/yocto_*.js**
	Transpiled code for the library, ready to use with V8 engine (node.js v4+, Chrome, etc) 
* **yoctolib-es/src.js**
	Root file for using the library in source format with jspm
* **yoctolib-es/src/**
	Source code of the library (EcmaScript 2015 + async/await stage-3 extension)
* **LICENCE.txt**
	Yoctopuce Licence

## Using the library with jspm

Start by installing Node.js and jspm on your system, because you'll need them. It is very easy, under Windows you
only have to run the npm installer and that's it. Make sure to install it fully, including npm, and add it to the
system path. To install jspm on the machine, you will need a single npm command:
```bash
npm install jspm -g
```

That's it, you are ready to create your first jspm-enabled application. Create a new directory, go into it and type
 the following commands: (note that depending on your system setup, you might need to 'sudo' these jspm commands)

```bash
jspm init . -y
jspm install npm:yoctolib-es
```

This creates all necessary configuration files in your directory to run the Yoctopuce EcmaScript 2015 library with jspm.
To give it a try, copy one of the example file to your directory (for instance example_nodejs/Doc-Inventory/inventory.js)
and then type:

```bash
jspm run inventory.js
```

For HTML examples, it's even simpler: you only have to open the HTML file with a browser, as it is the SystemJS module
manager which loads and transpiles the code on the fly. Simply make sure the directory on which you have put your
project is available through a web server, and copy the two files under example_html/Doc-Inventory to your directory.
Then open inventory.html through your HTTP server, and your code will run.

To avoid transpiling your JS code each time you load the page and to load all the individual shims, you can ask jspm
to build a monolithic js file that contains everything needed for your project, like this:

```bash
jspm bundle-sfx --minify inventory.js inventory-sfx.js
```

Now you can replace all includes in inventory.html by a single include of inventory-sfx.js.

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


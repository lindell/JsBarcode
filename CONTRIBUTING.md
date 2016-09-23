Getting Started
----
We would :heart: to have pull requests for you. So here is how you start development with JsBarcode.

First fork and clone the repo:
````bash
git clone git@github.com:your-username/JsBarcode.git
````

Then run ``npm install`` to set everything up. Make sure you have all dependencies of [node-canvas](https://github.com/Automattic/node-canvas) installed before doing this.

You are now ready to start doing your changes.

JsBarcode is using [gulp](http://gulpjs.com/) in the building step. Here comes some commands that will come handy when developing.

````bash
gulp compile # Compile the code (for nodejs)
gulp compile-web # Compiles down to JsBarcode.all.js
gulp compress # Compiles and compresses all individual barcode files

gulp watch # Listens to file changes and re-compiles automatically
gulp watch-web # Listens to file changes and re-compiles to JsBarcode.all.js automatically

gulp lint # Checking the code according to the code style specified in .eslintrc
````

Testing
----
JsBarcode has tests on all barcode symbologies (and more). If you want to test your changes just run ``npm test`` and the code will be compiled and tested.

There are also visual tests located under ``test/browser/``.

Symbologies and The Core
----
JsBarcode is divided up in two distinct parts. The barcode symbologies (EAN-13, CODE128, ITF, ...) and the core.

### Symbologies
Implementing a new symbology is the easiest way to contribute. Just follow the standard for that symbology and create a class that generate the correct binary data.

The structure of such a class is as follows:

````javascript
import Barcode from "../Barcode.js";

class GenericBarcode extends Barcode{
	constructor(data, options){
		super(data, options); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided
	encode(){
		return {
			data: "10101010101010101010101010101010101010101",
			text: this.text
		};
	}

	// Resturn true/false if the string provided is valid for this encoder
	valid(){
		return true;
	}
}
````

It might be a good idea to check one of the already implemented barcodes (such as [ITF14](https://github.com/lindell/JsBarcode/blob/master/src/barcodes/ITF14/index.js)) for inspiration.

### The Core / Renderers
The core part handles the API requests and calls the renderers. If you want to do any structural changes please [create an issue](https://github.com/lindell/JsBarcode/issues/new) or ask about it in the [gitter chat](https://gitter.im/lindell/JsBarcode) first.

Bug fixes is of course welcome at any time :+1:

Pull Requests
----
So you are ready to make a PR? Great! :smile:

But first make sure you have checked some things.

* Your code should follow the code style guide provided by [.eslintrc](https://github.com/lindell/JsBarcode/blob/master/.eslintrc) by running ``gulp lint``
* If you implemented a new symbology, make sure you have tests for it
* Don't commit build changes. No `dist/` or `bin/` changes in the PR. 

[![Build Status](https://secure.travis-ci.org/lindell/JsBarcode.png)](http://travis-ci.org/lindell/JsBarcode)
[![Coverage Status](https://coveralls.io/repos/github/lindell/JsBarcode/badge.svg?branch=master)](https://coveralls.io/github/lindell/JsBarcode?branch=master)

Demo
----
[Barcode Generator](http://lindell.github.io/JsBarcode/)

Introduction
----
JsBarcode is a simple way to create different types of 1d barcodes.
It works both in the browser with or without jQuery and also in Node.js

#### This is the list of supported barcodes:
* CODE128
 * CODE128 B
 * CODE128 C
* EAN 13
* EAN 8
* UPC-A
* CODE39
* ITF
* ITF-14
* MSI
 * MSI10
 * MSI11
 * MSI1010
 * MSI1110
* Pharmacode

Examples for browsers:
----

#### First create an image (or canvas)
````html
<img id="barcode">
````



#### Code:
````javascript
$("#barcode").JsBarcode("Hi!");
````

##### Result:
![Result](http://lindell.github.io/JsBarcode/README_images/hi.png)



#### Code:
````javascript
$("#barcode").JsBarcode("9780199532179", {
  format:"EAN",
  displayValue:true,
  fontSize:24,
  lineColor: "#0cc"
});
````
##### Result:
![Result](http://lindell.github.io/JsBarcode/README_images/ean.png)




#### Code (without jQuery):
````javascript
JsBarcode("#barcode","JsBarcode is easy!",{width:1,height:25});
````
##### Result:
![Result](http://lindell.github.io/JsBarcode/README_images/javascript_is_fun.png)


Setup for browsers:
----
### Step 1:
##### [Download the library from this page](http://lindell.me/JsBarcode/download/)

### Step 2:
Include the script in your code:


````
<script src="JsBarcode.all.min.js"></script>
````

Bower:
----
You can also use [Bower](http://bower.io) to install and manage the library.
````
bower install jsbarcode --save
````

Node.js:
----
#### Install with npm:
````
npm install jsbarcode
npm install canvas
````

#### Use:
```` javascript
var JsBarcode = require('jsbarcode');
var Canvas = require("canvas");

var canvas = new Canvas();
JsBarcode(canvas, "Hello");

// Do what you want with the canvas
// See https://github.com/Automattic/node-canvas for more information
````



The default options:
----
````javascript
{
  width: 2,
  height:	100,
  quite: 10,
  format:	"auto",
  displayValue: false,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPadding: 0,
  fontSize: 12,
  backgroundColor: "",
  lineColor: "#000"
}
````

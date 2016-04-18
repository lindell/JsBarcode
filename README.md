[![Build Status](https://secure.travis-ci.org/lindell/JsBarcode.png)](http://travis-ci.org/lindell/JsBarcode)
[![Coverage Status](https://coveralls.io/repos/github/lindell/JsBarcode/badge.svg?branch=master)](https://coveralls.io/github/lindell/JsBarcode?branch=master)

Introduction
----
**JsBarcode** is a **barcode generator** written in JavaScript. It supports multiple barcode formats and works in browsers and on the server (with *Node.js*). It has *no dependencies* when it is used for the web but works with *jQuery* if you are into that.

Demo
----
#### [Barcode Generator](http://lindell.github.io/JsBarcode/)

Supported barcodes:
----
* CODE128
 * CODE128 (automatic mode switching)
 * CODE128 A/B/C (force mode)
* EAN
  * EAN-13
  * EAN-8
  * EAN-5
  * EAN-2
  * UPC (A)
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

#### First create an canvas (or image)
````html
<canvas id="canvas"></canvas>
<!-- or -->
<img id="barcode">
<!-- or -->
<svg id="barcode"></svg> <!-- (Beta) -->
````



#### Simple example:
````javascript
JsBarcode("#barcode","Hi!");
// or with jQuery
$("#barcode").JsBarcode("Hi!");
````

##### Result:
![Result](http://i.imgur.com/TIp2tk5.png)


#### Example with options:
````javascript
JsBarcode("#barcode", "1234", {
  format: "pharmacode",
  lineColor: "#0aa",
  width:4,
  height:40,
  displayValue: false
});
````
##### Result:
![Result](http://i.imgur.com/Y2IrjUi.png)


#### More advanced use case (beta):
````javascript
JsBarcode("#barcode")
  .options({fontOptions: "italic"})
  .EAN13("1234567890128")
  .blank(20)
  .EAN5("12345", {height: 85, textPosition: "top", fontSize: 16})
  .render();
````
##### Result:
![Result](http://i.imgur.com/PV2PuTE.png)


Setup for browsers:
----
### Step 1:
##### [Download the library](https://github.com/lindell/JsBarcode/releases)

### Step 2:
Include the script in your code:


````html
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
  height: 100,
  format: "auto",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  valid: function(valid){}
}
````

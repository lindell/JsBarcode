Demo
----
[Barcode Generator](http://lindell.github.io/JsBarcode/)

Introduction
----
JsBarcode is a simple way to create different types of 1d barcodes.  
The plugin uses Html5Canvas to generate draw the barcodes

#### This is the list of supported barcodes:
*  CODE128 (B or C)
*  EAN (13 and 8)
*  UPC-A
*  CODE39
*  ITF (Interleaved 2 of 5)
*  ITF14
*  Pharmacode

Examples:
----

#### First create an image (or canvas)
````html
<img id="barcode">
````

#### Code:
````javascript
$("#barcode").JsBarcode("9780199532179",{format:"EAN", displayValue:true, fontSize:20});
````
##### Result:
![Result](http://lindell.github.io/JsBarcode/README_images/ean.png)



#### Code:
````javascript
$("#barcode").JsBarcode("Hi!");
````

##### Result:
![Result](http://lindell.github.io/JsBarcode/README_images/hi.png)



#### Code (without jQuery):
````javascript
JsBarcode("#barcode","JsBarcode is easy!",{width:1,height:25});
````
##### Result:
![Result](http://lindell.github.io/JsBarcode/README_images/javascript_is_fun.png)

Setup:
----
Download and include the [comined script](https://github.com/lindell/JsBarcode/releases) that contain everything you need.

````
<script src="JsBarcode.all.min.js"></script>
````

Bower:
----
As well as downloading the files and including them regularly,
you can use [Bower](http://bower.io) to install and manage the library
````
bower install jsbarcode --save
````

Use
----
#### There are two ways of using the library:
With jQuery:
````javascript
$(object).JsBarcode(string,options);
````
Or pure JavaScript:
````javascript
JsBarcode(object, string, options);
````

#### The parameters:
*  string is the sring to be encoded to the barcode
*  options is additional options put i an object (look below)

#### The default options:
````javascript
{
	width:	2,
	height:	100,
	quite: 10,
	format:	"CODE128",
	displayValue: false,
	fontOptions: "",
	font:"monospace",
	textAlign:"center",
	fontSize: 12,
	backgroundColor:"",
	lineColor:"#000"
}
````






Minify the latest code
----
Use the [closure compiler](http://closure-compiler.appspot.com/home) with this input
````
// ==ClosureCompiler==
// @output_file_name JsBarcode.all.min.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/CODE128.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/CODE39.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/EAN_UPC.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/ITF.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/ITF14.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/pharmacode.js
// @code_url https://raw.github.com/lindell/JsBarcode/master/JsBarcode.js
// ==/ClosureCompiler==
````

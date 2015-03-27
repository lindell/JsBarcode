Demo
----
[Barcode Generator](http://lindell.github.io/JsBarcode/)

Introduction
----
JsBarcode is a simple way to create different types of 1d barcodes.  
The plugin uses Html5Canvas to generate draw the barcodes

#### This is the list of supported barcodes:
*  CODE128 (B or C)
*  EAN (13)
*  UPC-A
*  CODE39
*  ITF (Interleaved 2 of 5)
*  ITF14
*  Pharmacode

Bower
----
As well as downloading the files and including them regularly,
you can use [Bower](http://bower.io) to install and manage the library
````
bower install jsbarcode --save
````

Setup
----
* Include the JsBarcode plugin in the document.
````
<script src="JsBarcode.js"></script>
````
* Include the CODE128.js if you want to generate a CODE 128 barcode.
````
<script src="CODE128.js"></script>
````
----
OR you can include the [comined script](https://github.com/lindell/JsBarcode/releases) with everything you need.

````
<script src="JsBarcode.all.min.js"></script>
````

Use
----
####There are two ways of using the library:
With jQuery:
````javascript
$(object).JsBarcode(string,options);
````
Or pure JavaScript:
````javascript
JsBarcode(object, string, options);
````

####The parameters:
*  string is the sring to be encoded to the barcode
*  options is additional options put i an object (look below)

####The default options:
````javascript
{
	width:	2,
	height:	100,
	quite: 10,
	format:	"CODE128",
	displayValue: false,
	font:"monospace",
	textAlign:"center",
	fontSize: 12,
	backgroundColor:"",
	lineColor:"#000"
}
````


Examples
----

####First we need an image (or a canvas - it works both ways!)
````html
<img id="barcode">
````
or
````html
<canvas id="barcode"></canvas>
````

#### This code:
````javascript
$("#barcode").JsBarcode("Hi!");
````

#### Will generate this image:
![Result](http://lindell.github.io/JsBarcode/README_images/hi.png)



#### This code:
````javascript
$("#barcode").JsBarcode("Javascript is fun!",{width:1,height:25});
````
#### Will generate this image:
![Result](http://lindell.github.io/JsBarcode/README_images/javascript_is_fun.png)



#### This code:
````javascript
$("#barcode").JsBarcode("9780199532179",{format:"EAN",displayValue:true,fontSize:20});
````
#### Will generate this image:
![Result](http://lindell.github.io/JsBarcode/README_images/ean.png)



#### This code:
````javascript
setInterval(function(){
	var date = new Date();
	$("#barcode").JsBarcode(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
},1000);
````
#### Will create a barcode clock:
[Click here to see it](http://fleo.se/barcode/example/barcodeClock.html)



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

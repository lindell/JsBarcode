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
	width: 2,
	height:	100,
	quite: 10,
	format:	"CODE128",
	backgroundColor:"#fff",
	lineColor:"#000"
}
````


Examples
----

####First we need an image
````html
<img id="barcode">
````

#### This code:
````javascript
$("#barcode").JsBarcode("Hi!");
````

#### Will generate this image:
![Result](http://fleo.se/barcode/img/hi.png)
  
  
  
#### This code:
````javascript
$("#barcode").JsBarcode("Javascript is fun!",{width:1,height:25});
````
#### Will generate this image:
![Result](http://fleo.se/barcode/img/javascript.png)
  
  
  
#### This code:
````javascript
$("#barcode").JsBarcode("9780199532179",{format:"EAN"});
````
#### Will generate this image:
![Result](http://fleo.se/barcode/img/ean.png)
  
  
  
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
// @code_url https://raw.github.com/lindell/JsBarcode/master/JsBarcode.js
// ==/ClosureCompiler==
````

Or using [gulpjs](http://gulpjs.com/)
````bash
npm install
gulp
````
JsBarcode.all.min.js file will be at ./build folder


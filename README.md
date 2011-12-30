Introduction
----
JsBarcode is a simple way to create different types of 1d barcodes.
The plugin uses Html5Canvas to generate draw the barcodes

#### This is the list of supported barcodes:
*  CODE128 (B)
*  EAN (13)
*  UPC-A

Use
----
####A Html5Canvas barcode generator is included to draw the barcodes.
````javascript
$(object).JsBarcode(string,options);
````
####Where:
*  string is the sring to be encoded to the barcode
*  options is additional options put i an object (look below)

####The default options:
````javascript
{
	width:	2,
	height:	100,
	quite: 10,
	format:	"CODE128"
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
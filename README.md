Introduction
----
JsBarcode is a simple way to create different types of 1d barcodes.

#### This is the list of supported barcodes:
*  EAN (13)
*  CODE128 (B)

#### All different types of barcodes has an own class which can be used for 2 things:
*  Validating the input to see if it can be encoded
*  Encode to barcode format (binary output)

#### To validate:
````javascript
var barcode = new EAN("9780199532179");
barcode.valid(); //Result: true
````

#### To encode:
````javascript
var barcode = new EAN("9780199532179");
barcode.encoded(); //Result: 1010111011000100101001....
````

Canvas generator
----
####A Html5Canvas barcode generator is included to draw the barcodes.
````javascript
drawBinary(binaryString, context, options);
````
####Where:
*  binaryString is the string that the barcode encoders generates
*  context is a Html5Canvas context
*  options is further options, put in a JSON object

####The default options:
````javascript
{
	width:2,
	height:100,
	x:0,
	y:0,
	quietZone:10,
}
````


Examples
----
#### This code:
````javascript
var barcode = new EAN("9780199532179");
drawBinary(barcode.encoded(), ctx); //If ctx is a defined canvas context
````

#### Will generate this image:
![Result](http://fleo.se/barcode/img/9780199532179.png)

#### This code:
````javascript
var barcode = new CODE128("Javascript is fun!");
drawBinary(barcode.encoded(), ctx, {width:1,height:20}); //If ctx is a defined canvas context
````
#### Will generate this image:
![Result](http://fleo.se/barcode/img/javascript.png)
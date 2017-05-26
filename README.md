<p align="center">
	<a href="http://lindell.me/JsBarcode"><img src="http://lindell.me/JsBarcode/other/logo.svg" alt="JsBarcode"/></a>
	<br><br>
	<a href="https://gitter.im/lindell/JsBarcode?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/lindell/JsBarcode.svg" alt="Join the chat at https://gitter.im/lindell/JsBarcode"/></a>
	<a href="http://travis-ci.org/lindell/JsBarcode"><img src="https://secure.travis-ci.org/lindell/JsBarcode.svg" alt="Build Status"/></a>
	<a href="https://scrutinizer-ci.com/g/lindell/JsBarcode/?branch=master"><img src="https://scrutinizer-ci.com/g/lindell/JsBarcode/badges/quality-score.png?b=master" alt="Scrutinizer Code Quality"/></a>
	<a href="http://packagequality.com/#?package=jsbarcode"><img src="http://npm.packagequality.com/shield/jsbarcode.svg" alt="Package Quality"/></a>
	<a href="https://github.com/lindell/JsBarcode/blob/master/MIT-LICENSE.txt"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/></a>
</p>

Introduction
----
**JsBarcode** is a **barcode generator** written in JavaScript. It supports multiple barcode formats and works in browsers and with *Node.js*. It has *no dependencies* when it is used for the web but works with *jQuery* if you are into that.



Demo
----
#### [Barcode Generator](http://lindell.github.io/JsBarcode/generator/)
#### [Simple CodePen Demo](http://codepen.io/lindell/pen/eZKBdO?editors=1010)
#### [Settings CodePen Demo](http://codepen.io/lindell/pen/mPvLXx?editors=1010)

Supported barcodes:
----
* [CODE128](https://github.com/lindell/JsBarcode/wiki/CODE128)
  * CODE128 (automatic mode switching)
  * CODE128 A/B/C (force mode)
* [EAN](https://github.com/lindell/JsBarcode/wiki/EAN)
  * EAN-13
  * EAN-8
  * EAN-5
  * EAN-2
  * UPC (A)
  * UPC (E)
* [CODE39](https://github.com/lindell/JsBarcode/wiki/CODE39)
* [ITF-14](https://github.com/lindell/JsBarcode/wiki/ITF-14)
* [MSI](https://github.com/lindell/JsBarcode/wiki/MSI)
  * MSI10
  * MSI11
  * MSI1010
  * MSI1110
* [Pharmacode](https://github.com/lindell/JsBarcode/wiki/pharmacode)
* [Codabar](https://github.com/lindell/JsBarcode/wiki/codabar)

Examples for browsers:
----

#### First create an canvas (or image)
````html
<svg id="barcode"></svg>
<!-- or -->
<canvas id="canvas"></canvas>
<!-- or -->
<img id="barcode"/>
````



#### Simple example:
````javascript
JsBarcode("#barcode", "Hi!");
// or with jQuery
$("#barcode").JsBarcode("Hi!");
````

##### Result:
![Result](http://imgh.us/test_208.svg)


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
![Result](http://imgh.us/pharmacode.svg)


#### More advanced use case:
````javascript
JsBarcode("#barcode")
  .options({font: "OCR-B"}) // Will affect all barcodes
  .EAN13("1234567890128", {fontSize: 18, textMargin: 0})
  .blank(20) // Create space between the barcodes
  .EAN5("12345", {height: 85, textPosition: "top", fontSize: 16, marginTop: 15})
  .render();
````
##### Result:
![Result](http://i.imgur.com/pp2lvYe.png)



#### Or define the value and options in the HTML element:
Use any `jsbarcode-*` or `data-*` as attributes where `*` is any option.
````html
<svg class="barcode"
  jsbarcode-format="upc"
  jsbarcode-value="123456789012"
  jsbarcode-textmargin="0"
  jsbarcode-fontoptions="bold">
</svg>
````

And then initialize it with:
````javascript
JsBarcode(".barcode").init();
````

##### Result:
![Result](http://imgh.us/upc.svg)



#### Retrieve the barcode values so you can render it any way you'd like
Pass in an object which will be filled with data.
```
const data = {};
JsBarcode(data, 'text', {...options});
```
data will be filled with a ``` encodings ``` property which has all the needed values.
See wiki for an example of what data looks like.


Setup for browsers:
----
### Step 1:
Download or get the CDN link to the script:

| Name | Supported barcodes | Size (gzip) | CDN / Download |
|------|--------------------|:-----------:|---------------:|
|  *All*  |  *All the barcodes!*  |  *9.6 kB*  |  *[JsBarcode.all.min.js][1]*  |
|  CODE128  |  CODE128 (auto and force mode)  |  6 kB  |  [JsBarcode.code128.min.js][2]  |
|  CODE39  |  CODE39  |  5 kB  |  [JsBarcode.code39.min.js][3]  |
|  EAN / UPC  |  EAN-13, EAN-8, EAN-5, EAN-2, UPC (A)  |  6.2 kB  |  [JsBarcode.ean-upc.min.js][4]  |
|  ITF-14  |  ITF-14  |  4.8 kB  |  [JsBarcode.itf-14.min.js][5]  |
|  ITF  |  ITF  |  4.7 kB  |  [JsBarcode.itf.min.js][6]  |
|  MSI  |  MSI, MSI10, MSI11, MSI1010, MSI1110  |  4.9 kB  |  [JsBarcode.msi.min.js][7]  |
|  Pharmacode  |  Pharmacode  |  4.6 kB  |  [JsBarcode.pharmacode.min.js][8]  |
|  Codabar  |  Codabar  |  4.8 kB  |  [JsBarcode.codabar.min.js][9]  |

### Step 2:
Include the script in your code:


````html
<script src="JsBarcode.all.min.js"></script>
````

### Step 3:
You are done! Go generate some barcodes :smile:

Bower and npm:
----
You can also use [Bower](http://bower.io) or [npm](https://www.npmjs.com) to install and manage the library.
````
bower install jsbarcode --save
````
````
npm install jsbarcode --save
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



Options:
----
For information about how to use the options, see [the wiki page](https://github.com/lindell/JsBarcode/wiki/Options).

| Option | Default value | Type |
|--------|---------------|------|
| [`format`](https://github.com/lindell/JsBarcode/wiki/Options#format) | `"auto" (CODE128)` | `String` |
| [`width`](https://github.com/lindell/JsBarcode/wiki/Options#width) | `2` | `Number` |
| [`height`](https://github.com/lindell/JsBarcode/wiki/Options#height) | `100` | `Number` |
| [`displayValue`](https://github.com/lindell/JsBarcode/wiki/Options#display-value) | `true` | `Boolean` |
| [`text`](https://github.com/lindell/JsBarcode/wiki/Options#text) | `undefined` | `String` |
| [`fontOptions`](https://github.com/lindell/JsBarcode/wiki/Options#font-options) | `""` | `String` |
| [`font`](https://github.com/lindell/JsBarcode/wiki/Options#font) | `"monospace"` | `String` |
| [`textAlign`](https://github.com/lindell/JsBarcode/wiki/Options#text-align) | `"center"` | `String` |
| [`textPosition`](https://github.com/lindell/JsBarcode/wiki/Options#text-position) | `"bottom"` | `String` |
| [`textMargin`](https://github.com/lindell/JsBarcode/wiki/Options#text-margin) | `2` | `Number` |
| [`fontSize`](https://github.com/lindell/JsBarcode/wiki/Options#font-size) | `20` | `Number` |
| [`background`](https://github.com/lindell/JsBarcode/wiki/Options#background)  | `"#ffffff"` | `String (CSS color)` |
| [`lineColor`](https://github.com/lindell/JsBarcode/wiki/Options#line-color) | `"#000000"` | `String (CSS color)` |
| [`margin`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `10` | `Number` |
| [`marginTop`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`marginBottom`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`marginLeft`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`marginRight`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`valid`](https://github.com/lindell/JsBarcode/wiki/Options#valid) | `function(valid){}` | `Function` |

Contributions and feedback:
----
We :heart: contributions and feedback.

If you want to contribute, please check out the [CONTRIBUTING.md](https://github.com/lindell/JsBarcode/blob/master/CONTRIBUTING.md) file.

If you have any question or suggestion [create an issue](https://github.com/lindell/JsBarcode/issues/new) or ask about it in the [gitter chat](https://gitter.im/lindell/JsBarcode).

Bug reports should always be done with a [new issue](https://github.com/lindell/JsBarcode/issues/new).

License:
----
JsBarcode is shared under the [MIT license](https://github.com/lindell/JsBarcode/blob/master/MIT-LICENSE.txt). This means you can modify and use it however you want, even for comercial use. But please give this the Github repo a :star: and write a small comment of how you are using JsBarcode in the [gitter chat](https://gitter.im/lindell/JsBarcode).



[1]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/JsBarcode.all.min.js "jsdelivr all barcodes"
[2]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.code128.min.js "jsdelivr code128"
[3]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.code39.min.js "jsdelivr code39"
[4]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.ean-upc.min.js "jsdelivr ean/upc"
[5]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.itf-14.min.js "jsdelivr itf-14"
[6]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.itf.min.js "jsdelivr itf"
[7]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.msi.min.js "jsdelivr msi"
[8]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.pharmacode.min.js "jsdelivr pharmacode"
[9]: https://cdn.jsdelivr.net/jsbarcode/3.5.8/barcodes/JsBarcode.codabar.min.js "jsdelivr codabar"

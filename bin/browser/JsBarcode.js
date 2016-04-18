!function(t){function e(r){if(n[r])return n[r].e;var i=n[r]={e:{},i:r,l:!1};return t[r].call(i.e,i,i.e,e),i.l=!0,i.e}var n={};return e.m=t,e.c=n,e.p="",e(e.s=11)}([function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;e>n;n++)t="0"+t;return t}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(e){n(this,t),this.string=e}return t.prototype.encode=function(){for(var t="110",e=0;e<this.string.length;e++){var n=parseInt(this.string[e]),i=n.toString(2);i=r(i,4-i.length);for(var o=0;o<i.length;o++)t+="0"==i[o]?"100":"110"}return t+="1001",{data:t,text:this.string}},t.prototype.valid=function(){return-1!==this.string.search(/^[0-9]+$/)},t}();e["default"]=i},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(e){n(this,t),this.bytes=[];for(var r=0;r<e.length;++r)this.bytes.push(e.charCodeAt(r));this.string=e.substring(1),this.encodings=[740,644,638,176,164,100,224,220,124,608,604,572,436,244,230,484,260,254,650,628,614,764,652,902,868,836,830,892,844,842,752,734,590,304,112,94,416,128,122,672,576,570,464,422,134,496,478,142,910,678,582,768,762,774,880,862,814,896,890,818,914,602,930,328,292,200,158,68,62,424,412,232,218,76,74,554,616,978,556,146,340,212,182,508,268,266,956,940,938,758,782,974,400,310,118,512,506,960,954,502,518,886,966,668,680,692,5379]}return t.prototype.getText=function(){var t=this.string;return t.replace(/[^\x20-\x7E]/g,"")},t.prototype.encode=function(){var t,e=this.bytes,n=e.shift()-105;return 103===n?t=this.nextA(e,1):104===n?t=this.nextB(e,1):105===n&&(t=this.nextC(e,1)),{text:this.getText(),data:this.getEncoding(n)+t.result+this.getEncoding((t.checksum+n)%103)+this.getEncoding(106)}},t.prototype.getEncoding=function(t){return this.encodings[t]?(this.encodings[t]+1e3).toString(2):""},t.prototype.valid=function(){return-1!==this.string.search(/^[\x00-\x7F\xC8-\xD3]+$/)},t.prototype.nextA=function(t,e){if(t.length<=0)return{result:"",checksum:0};var n,r;if(t[0]>=200)r=t[0]-105,t.shift(),99===r?n=this.nextC(t,e+1):100===r?n=this.nextB(t,e+1):98===r?(t[0]=t[0]>95?t[0]-96:t[0],n=this.nextA(t,e+1)):n=this.nextA(t,e+1);else{var i=t[0];r=32>i?i+64:i-32,t.shift(),n=this.nextA(t,e+1)}var o=this.getEncoding(r),a=r*e;return{result:o+n.result,checksum:a+n.checksum}},t.prototype.nextB=function(t,e){if(t.length<=0)return{result:"",checksum:0};var n,r;t[0]>=200?(r=t[0]-105,t.shift(),99===r?n=this.nextC(t,e+1):101===r?n=this.nextA(t,e+1):98===r?(t[0]=t[0]<32?t[0]+96:t[0],n=this.nextB(t,e+1)):n=this.nextB(t,e+1)):(r=t[0]-32,t.shift(),n=this.nextB(t,e+1));var i=this.getEncoding(r),o=r*e;return{result:i+n.result,checksum:o+n.checksum}},t.prototype.nextC=function(t,e){if(t.length<=0)return{result:"",checksum:0};var n,r;t[0]>=200?(r=t[0]-105,t.shift(),n=100===r?this.nextB(t,e+1):101===r?this.nextA(t,e+1):this.nextC(t,e+1)):(r=10*(t[0]-48)+t[1]-48,t.shift(),t.shift(),n=this.nextC(t,e+1));var i=this.getEncoding(r),o=r*e;return{result:i+n.result,checksum:o+n.checksum}},t}();e["default"]=r},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){n(this,t),this.startBin="101",this.endBin="101",this.middleBin="01010",this.Lbinary=["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],this.Gbinary=["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],this.Rbinary=["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"]}return t.prototype.encode=function(t,e,n){var r="";n=n||"";for(var i=0;i<t.length;i++)"L"==e[i]?r+=this.Lbinary[t[i]]:"G"==e[i]?r+=this.Gbinary[t[i]]:"R"==e[i]&&(r+=this.Rbinary[t[i]]),i<t.length-1&&(r+=n);return r},t}();e["default"]=r},function(t,e){"use strict";function n(t){for(var e=0,n=0;n<t.length;n++){var r=parseInt(t[n]);e+=(n+t.length)%2===0?r:2*r%10+Math.floor(2*r/10)}return(10-e%10)%10}function r(t){for(var e=0,n=[2,3,4,5,6,7],r=0;r<t.length;r++){var i=parseInt(t[t.length-1-r]);e+=n[r%n.length]*i}return(11-e%11)%11}Object.defineProperty(e,"__esModule",{value:!0}),e.mod10=n,e.mod11=r},function(t,e){"use strict";function n(t,e){var n,r={};for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&"undefined"!=typeof e[n]&&(r[n]=e[n]);return r}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=r(o),s=function(){function t(e,n){i(this,t),-1!==e.search(/^[0-9]{12}$/)?this.string=e+this.checksum(e):this.string=e,this.structure=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"],n.fontSize>10*n.width?this.fontSize=10*n.width:this.fontSize=n.fontSize,this.guardHeight=n.height+this.fontSize/2+n.textMargin}return t.prototype.valid=function(){return-1!==this.string.search(/^[0-9]{13}$/)&&this.string[12]==this.checksum(this.string)},t.prototype.encode=function(){var t=new a["default"],e=[],n=this.structure[this.string[0]],r=this.string.substr(1,6),i=this.string.substr(7,6);return e.push({data:"000000000000",text:this.string[0],options:{textAlign:"left",fontSize:this.fontSize}}),e.push({data:"101",options:{height:this.guardHeight}}),e.push({data:t.encode(r,n),text:r,options:{fontSize:this.fontSize}}),e.push({data:"01010",options:{height:this.guardHeight}}),e.push({data:t.encode(i,"RRRRRR"),text:i,options:{fontSize:this.fontSize}}),e.push({data:"101",options:{height:this.guardHeight}}),e},t.prototype.checksum=function(t){var e,n=0;for(e=0;12>e;e+=2)n+=parseInt(t[e]);for(e=1;12>e;e+=2)n+=3*parseInt(t[e]);return(10-n%10)%10},t}();e["default"]=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(17),o=r(i),a=n(16),s=n(22),u=n(25),f=r(u),c=n(24),l=r(c),h=n(30),d=n(31),p=r(d),g=n(23),y=r(g);e["default"]={CODE39:o["default"],CODE128:a.CODE128,CODE128A:a.CODE128A,CODE128B:a.CODE128B,CODE128C:a.CODE128C,EAN13:s.EAN13,EAN8:s.EAN8,EAN5:s.EAN5,EAN2:s.EAN2,UPC:s.UPC,ITF14:f["default"],ITF:l["default"],MSI:h.MSI,MSI10:h.MSI10,MSI11:h.MSI11,MSI1010:h.MSI1010,MSI1110:h.MSI1110,pharmacode:p["default"],GenericBarcode:y["default"]}},function(t,e){"use strict";function n(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n},function(t,e){"use strict";function n(t){function e(t){if(Array.isArray(t))for(var r=0;r<t.length;r++)e(t[r]);else t.text=t.text||"",t.data=t.data||"",n.push(t)}var n=[];return e(t),n}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e,n){if(!t.getContext)throw new Error("The browser does not support canvas.");o(t,n,e);for(var r=0;r<e.length;r++){var i=(0,l["default"])(n,e[r].options);a(t,i,e[r]),s(t,i,e[r]),u(t,e[r])}f(t)}function o(t,e,n){var r=t.getContext("2d");r.save();for(var i=0,o=0,a=0;a<n.length;a++){var s=(0,l["default"])(s,n[a].options);r.font=s.fontOptions+" "+s.fontSize+"px "+s.font;var u=r.measureText(n[a].text).width,f=n[a].data.length*s.width;n[a].width=Math.ceil(Math.max(u,f));var c=s.height+(s.displayValue&&n[a].text.length>0?s.fontSize:0)+s.textMargin+s.marginTop+s.marginBottom,h=0;s.displayValue&&u>f&&("center"==s.textAlign?h=Math.floor((u-f)/2):"left"==s.textAlign?h=0:"right"==s.textAlign&&(h=Math.floor(u-f))),n[a].barcodePadding=h,c>o&&(o=c),i+=n[a].width}t.width=i+e.marginLeft+e.marginRight,t.height=o,r.clearRect(0,0,t.width,t.height),e.background&&(r.fillStyle=e.background,r.fillRect(0,0,t.width,t.height)),r.translate(e.marginLeft,0)}function a(t,e,n){var r,i,o=t.getContext("2d"),a=n.data;r="top"==e.textPosition?e.marginTop+e.fontSize+e.textMargin:e.marginTop,i=e.height,o.fillStyle=e.lineColor;for(var s=0;s<a.length;s++){var u=s*e.width+n.barcodePadding;"1"===a[s]?o.fillRect(u,r,e.width,e.height):a[s]&&o.fillRect(u,r,e.width,e.height*a[s])}}function s(t,e,n){var r=t.getContext("2d"),i=e.fontOptions+" "+e.fontSize+"px "+e.font;if(e.displayValue){var o,a;a="top"==e.textPosition?e.marginTop+e.fontSize-e.textMargin:e.height+e.textMargin+e.marginTop+e.fontSize,r.font=i,"left"==e.textAlign||n.barcodePadding>0?(o=0,r.textAlign="left"):"right"==e.textAlign?(o=n.width-1,r.textAlign="right"):(o=n.width/2,r.textAlign="center"),r.fillText(n.text,o,a)}}function u(t,e){var n=t.getContext("2d");n.translate(e.width,0)}function f(t){var e=t.getContext("2d");e.restore()}Object.defineProperty(e,"__esModule",{value:!0});var c=n(4),l=r(c);e["default"]=i},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e,n){var r=n.marginLeft;o(t,n,e);for(var i=0;i<e.length;i++){var u=(0,d["default"])(n,e[i].options),l=f(r,u.marginTop,t);c(l,u,e[i]),a(l,u,e[i]),s(l,u,e[i]),r+=e[i].width}}function o(t,e,n){for(;t.firstChild;)t.removeChild(t.firstChild);for(var r=0,i=0,o=0;o<n.length;o++){var a=(0,d["default"])(a,n[o].options),s=u(n[o].text,t,a),f=n[o].data.length*a.width;n[o].width=Math.ceil(Math.max(s,f));var c=a.height+(a.displayValue&&n[o].text.length>0?a.fontSize:0)+a.textMargin+a.marginTop+a.marginBottom,l=0;a.displayValue&&s>f&&("center"==a.textAlign?l=Math.floor((s-f)/2):"left"==a.textAlign?l=0:"right"==a.textAlign&&(l=Math.floor(s-f))),n[o].barcodePadding=l,c>i&&(i=c),r+=n[o].width}var h=r+e.marginLeft+e.marginRight,p=i;t.setAttribute("width",h+"px"),t.setAttribute("height",p+"px"),t.setAttribute("x","0px"),t.setAttribute("y","0px"),t.setAttribute("viewBox","0 0 "+h+" "+p),e.background&&(t.style.background=e.background)}function a(t,e,n){var r,i,o=n.data;r="top"==e.textPosition?e.fontSize+e.textMargin:0,i=e.height;for(var a=0;a<o.length;a++){var s=a*e.width+n.barcodePadding;"1"===o[a]?l(s,r,e.width,e.height,t):o[a]>0&&l(s,r,e.width,e.height*o[a],t)}}function s(t,e,n){var r=document.createElementNS(p,"text");if(e.displayValue){var i,o;r.setAttribute("style","font:"+e.fontOptions+" "+e.fontSize+"px "+e.font),o="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||n.barcodePadding>0?(i=0,r.setAttribute("text-anchor","start")):"right"==e.textAlign?(i=n.width-1,r.setAttribute("text-anchor","end")):(i=n.width/2,r.setAttribute("text-anchor","middle")),r.setAttribute("x",i),r.setAttribute("y",o),r.appendChild(document.createTextNode(n.text)),t.appendChild(r)}}function u(t,e,n){var r=document.createElement("canvas").getContext("2d");r.font=n.fontOptions+" "+n.fontSize+"px "+n.font;var i=r.measureText(t).width;return i}function f(t,e,n){var r=document.createElementNS(p,"g");return r.setAttribute("transform","translate("+t+", "+e+")"),n.appendChild(r),r}function c(t,e,n){t.setAttribute("style","fill:"+e.lineColor+";")}function l(t,e,n,r,i){var o=document.createElementNS(p,"rect");o.setAttribute("x",t),o.setAttribute("y",e),o.setAttribute("width",n),o.setAttribute("height",r),i.appendChild(o)}Object.defineProperty(e,"__esModule",{value:!0});var h=n(4),d=r(h);e["default"]=i;var p="http://www.w3.org/2000/svg"},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){w.prototype[e]=w.prototype[e.toUpperCase()]=w.prototype[e.toLowerCase()]=function(n,r){var i=(0,p["default"])(this._options,r),o=t[e],a=new o(n,i);if(!a.valid()){if(this._options.valid===C.valid)throw new Error('"'+n+'" is not a valid input for '+e);this._options.valid(!1)}var s=a.encode();s=(0,y["default"])(s);for(var u=0;u<s.length;u++)s[u].options=(0,p["default"])(i,s[u].options);return this._encodings.push(s),this}}function o(){return u["default"].CODE128?"CODE128":Object.keys(u["default"])[0]}function a(t){if("string"==typeof t)return t=document.querySelector(t),a(t);if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement){var e=document.createElement("canvas");return{element:e,renderer:"canvas",afterRender:function(){t.setAttribute("src",e.toDataURL())}}}if("undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,renderer:"svg"};if(t.getContext)return{element:t,renderer:"canvas"};throw new Error("Not supported type to render on.")}var s=n(6),u=r(s),f=n(9),c=r(f),l=n(10),h=r(l),d=n(4),p=r(d),g=n(8),y=r(g),v=n(7),b=r(v),x={canvas:c["default"],svg:h["default"]},w=function(){},m=function(t,e,n){var r=new w;if("undefined"==typeof t)throw Error("No element to render on was provided.");return r._renderProperties=a(t),r._encodings=[],r._options=C,"undefined"!=typeof e&&(n=n||{},n.format||(n.format=o()),r.options(n),r[n.format](e,n),r.render()),r};m.getModule=function(t){return u["default"][t]};for(var O in u["default"])u["default"].hasOwnProperty(O)&&i(u["default"],O);w.prototype.options=function(t){return this._options=(0,p["default"])(this._options,t),this},w.prototype.blank=function(t){var e="0".repeat(t);return this._encodings.push({data:e}),this},w.prototype.render=function(){for(var t=x[this._renderProperties.renderer],e=(0,y["default"])(this._encodings),n=0;n<e.length;n++)e[n].options=(0,p["default"])(this._options,e[n].options),(0,b["default"])(e[n].options);return(0,b["default"])(this._options),t(this._renderProperties.element,e,this._options),this._renderProperties.afterRender&&this._renderProperties.afterRender(),this._options.valid(!0),this},"undefined"!=typeof window&&(window.JsBarcode=m),t.e=m;var C={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(t){}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),f=r(u),c=function(t){function e(n){return o(this,e),a(this,t.call(this,String.fromCharCode(208)+n))}return s(e,t),e.prototype.valid=function(){return-1!==this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/)},e}(f["default"]);e["default"]=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),f=r(u),c=function(t){function e(n){return o(this,e),a(this,t.call(this,String.fromCharCode(209)+n))}return s(e,t),e.prototype.valid=function(){return-1!==this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/)},e}(f["default"]);e["default"]=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),f=r(u),c=function(t){function e(n){return o(this,e),a(this,t.call(this,String.fromCharCode(210)+n))}return s(e,t),e.prototype.valid=function(){return-1!==this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/)},e}(f["default"]);e["default"]=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}function u(t){var e,n=t.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length,r=t.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length,i=t.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;return e=i>=2?String.fromCharCode(210)+l(t):n>r?String.fromCharCode(208)+f(t):String.fromCharCode(209)+c(t),e=e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(t,e){return String.fromCharCode(203)+e})}function f(t){var e=t.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);if(e)return e[1]+String.fromCharCode(204)+l(t.substring(e[1].length));var n=t.match(/^[\x00-\x5F\xC8-\xCF]+/);return n[0].length===t.length?t:n[0]+String.fromCharCode(205)+c(t.substring(n[0].length))}function c(t){var e=t.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);if(e)return e[1]+String.fromCharCode(204)+l(t.substring(e[1].length));var n=t.match(/^[\x20-\x7F\xC8-\xCF]+/);return n[0].length===t.length?t:n[0]+String.fromCharCode(206)+f(t.substring(n[0].length))}function l(t){var e=t.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0],n=e.length;if(n===t.length)return t;t=t.substring(n);var r=t.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length,i=t.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;return r>=i?e+String.fromCharCode(206)+f(t):e+String.fromCharCode(205)+c(t)}Object.defineProperty(e,"__esModule",{value:!0});var h=n(1),d=r(h),p=function(t){function e(n){o(this,e);var r=a(this,t.call(this,n));if(-1!==n.search(/^[\x00-\x7F\xC8-\xD3]+$/))var r=a(this,t.call(this,u(n)));else var r=a(this,t.call(this,n));return a(r)}return s(e,t),e}(d["default"]);e["default"]=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.CODE128C=e.CODE128B=e.CODE128A=e.CODE128=void 0;var i=n(15),o=r(i),a=n(12),s=r(a),u=n(13),f=r(u),c=n(14),l=r(c);e.CODE128=o["default"],e.CODE128A=s["default"],e.CODE128B=f["default"],e.CODE128C=l["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(e){n(this,t),this.string=e.toUpperCase(),this.encodings={0:20957,1:29783,2:23639,3:30485,4:20951,5:29813,6:23669,7:20855,8:29789,9:23645,A:29975,B:23831,C:30533,D:22295,E:30149,F:24005,G:21623,H:29981,I:23837,J:22301,K:30023,L:23879,M:30545,N:22343,O:30161,P:24017,Q:21959,R:30065,S:23921,T:22385,U:29015,V:18263,W:29141,X:17879,Y:29045,Z:18293,"-":17783,".":29021," ":18269,$:17477,"/":17489,"+":17681,"%":20753,"*":35770}}return t.prototype.getEncoding=function(t){return this.encodings[t].toString(2)},t.prototype.encode=function(){for(var t=this.getEncoding("*"),e=0;e<this.string.length;e++)t+=this.getEncoding(this.string[e])+"0";return t+=this.getEncoding("*"),{data:t,text:this.string}},t.prototype.valid=function(){return-1!==this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)},t}();e["default"]=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=r(o),s=function(){function t(e){i(this,t),this.string=e,this.structure=["LL","LG","GL","GG"]}return t.prototype.valid=function(){return-1!==this.string.search(/^[0-9]{2}$/)},t.prototype.encode=function(){var t=new a["default"],e=this.structure[parseInt(this.string)%4],n="1011";return n+=t.encode(this.string,e,"01"),{data:n,text:this.string}},t}();e["default"]=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=r(o),s=function(){function t(e){i(this,t),this.string=e,this.structure=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"]}return t.prototype.valid=function(){return-1!==this.string.search(/^[0-9]{5}$/)},t.prototype.encode=function(){var t=new a["default"],e=this.checksum(),n="1011";return n+=t.encode(this.string,this.structure[e],"01"),{data:n,text:this.string}},t.prototype.checksum=function(){var t=0;return t+=3*parseInt(this.string[0]),t+=9*parseInt(this.string[1]),t+=3*parseInt(this.string[2]),t+=9*parseInt(this.string[3]),t+=3*parseInt(this.string[4]),t%10},t}();e["default"]=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=r(o),s=function(){function t(e){i(this,t),-1!==e.search(/^[0-9]{7}$/)?this.string=e+this.checksum(e):this.string=e}return t.prototype.valid=function(){return-1!==this.string.search(/^[0-9]{8}$/)&&this.string[7]==this.checksum(this.string)},t.prototype.encode=function(){var t=new a["default"],e="",n=this.string.substr(0,4),r=this.string.substr(4,4);return e+=t.startBin,e+=t.encode(n,"LLLL"),e+=t.middleBin,e+=t.encode(r,"RRRR"),e+=t.endBin,{data:e,text:this.string}},t.prototype.checksum=function(t){var e,n=0;for(e=0;7>e;e+=2)n+=3*parseInt(t[e]);for(e=1;7>e;e+=2)n+=parseInt(t[e]);return(10-n%10)%10},t}();e["default"]=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(5),f=r(u),c=function(t){function e(n,r){return o(this,e),a(this,t.call(this,"0"+n,r))}return s(e,t),e}(f["default"]);e["default"]=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.UPC=e.EAN2=e.EAN5=e.EAN8=e.EAN13=void 0;var i=n(5),o=r(i),a=n(20),s=r(a),u=n(19),f=r(u),c=n(18),l=r(c),h=n(21),d=r(h);e.EAN13=o["default"],e.EAN8=s["default"],e.EAN5=f["default"],e.EAN2=l["default"],e.UPC=d["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(e){n(this,t),this.string=e}return t.prototype.encode=function(){return{data:"10101010101010101010101010101010101010101",text:this.string}},t.prototype.valid=function(){return!0},t}();e["default"]=r},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(e){n(this,t),this.string=e,this.binaryRepresentation={0:"00110",1:"10001",2:"01001",3:"11000",4:"00101",5:"10100",6:"01100",7:"00011",8:"10010",9:"01010"}}return t.prototype.valid=function(){return-1!==this.string.search(/^([0-9]{2})+$/)},t.prototype.encode=function(){for(var t="1010",e=0;e<this.string.length;e+=2)t+=this.calculatePair(this.string.substr(e,2));return t+="11101",{data:t,text:this.string}},t.prototype.calculatePair=function(t){for(var e="",n=this.binaryRepresentation[t[0]],r=this.binaryRepresentation[t[1]],i=0;5>i;i++)e+="1"==n[i]?"111":"1",e+="1"==r[i]?"000":"0";return e},t}();e["default"]=r},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(e){n(this,t),this.string=e,-1!==e.search(/^[0-9]{13}$/)&&(this.string+=this.checksum(e)),this.binaryRepresentation={0:"00110",1:"10001",2:"01001",3:"11000",4:"00101",5:"10100",6:"01100",7:"00011",8:"10010",9:"01010"}}return t.prototype.valid=function(){return-1!==this.string.search(/^[0-9]{14}$/)&&this.string[13]==this.checksum()},t.prototype.encode=function(){for(var t="1010",e=0;14>e;e+=2)t+=this.calculatePair(this.string.substr(e,2));return t+="11101",{data:t,text:this.string}},t.prototype.calculatePair=function(t){for(var e="",n=this.binaryRepresentation[t[0]],r=this.binaryRepresentation[t[1]],i=0;5>i;i++)e+="1"==n[i]?"111":"1",e+="1"==r[i]?"000":"0";return e},t.prototype.checksum=function(){for(var t=0,e=0;13>e;e++)t+=parseInt(this.string[e])*(3-e%2*2);return 10-t%10},t}();e["default"]=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),f=r(u),c=n(3),l=function(t){function e(n){o(this,e);var r=a(this,t.call(this,n));return r.string+=(0,c.mod10)(r.string),r}return s(e,t),e}(f["default"]);e["default"]=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),f=r(u),c=n(3),l=function(t){function e(n){o(this,e);var r=a(this,t.call(this,n));return r.string+=(0,c.mod10)(r.string),r.string+=(0,c.mod10)(r.string),r}return s(e,t),e}(f["default"]);e["default"]=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),f=r(u),c=n(3),l=function(t){function e(n){o(this,e);var r=a(this,t.call(this,n));return r.string+=(0,c.mod11)(r.string),r}return s(e,t),e}(f["default"]);e["default"]=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(e,i);o&&o.configurable&&void 0===t[i]&&Object.defineProperty(t,i,o)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),f=r(u),c=n(3),l=function(t){function e(n){o(this,e);var r=a(this,t.call(this,n));return r.string+=(0,c.mod11)(r.string),r.string+=(0,c.mod10)(r.string),r}return s(e,t),e}(f["default"]);e["default"]=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.MSI1110=e.MSI1010=e.MSI11=e.MSI10=e.MSI=void 0;var i=n(0),o=r(i),a=n(26),s=r(a),u=n(28),f=r(u),c=n(27),l=r(c),h=n(29),d=r(h);e.MSI=o["default"],e.MSI10=s["default"],e.MSI11=f["default"],e.MSI1010=l["default"],e.MSI1110=d["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(e){n(this,t),this.number=parseInt(e,10)}return t.prototype.encode=function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2===0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return e=e.slice(0,-2),{data:e,text:this.number+""}},t.prototype.valid=function(){return this.number>=3&&this.number<=131070},t}();e["default"]=r}]);s2.default)[0];
	}

	// Sets global encoder options
	// Added to the api by the JsBarcode function
	API.prototype.options = function (options) {
		this._options = (0, _merge2.default)(this._options, options);
		return this;
	};

	// Will create a blank space (usually in between barcodes)
	API.prototype.blank = function (size) {
		var zeroes = "0".repeat(size);
		this._encodings.push({ data: zeroes });
		return this;
	};

	// Prepares the encodings and calls the renderer
	// Added to the api by the JsBarcode function
	API.prototype.render = function () {
		var renderer = renderers[this._renderProperties.renderer];

		var encodings = (0, _linearizeEncodings2.default)(this._encodings);

		for (var i = 0; i < encodings.length; i++) {
			encodings[i].options = (0, _merge2.default)(this._options, encodings[i].options);
			(0, _fixOptions2.default)(encodings[i].options);
		}

		(0, _fixOptions2.default)(this._options);

		renderer(this._renderProperties.element, encodings, this._options);

		if (this._renderProperties.afterRender) {
			this._renderProperties.afterRender();
		}

		this._options.valid(true);

		return this;
	};

	if (typeof window !== "undefined") {
		window.JsBarcode = JsBarcode;
	}
	module.e = JsBarcode;

	// Takes an element and returns an object with information about how
	// it should be rendered
	// {
	//   element: The element that the renderer should draw on
	//   renderer: The name of the renderer
	//   afterRender (optional): If something has to done after the renderer
	//     completed, calls afterRender (function)
	// }
	function getRenderProperies(element) {
		// If the element is a string, query select call again
		if (typeof element === "string") {
			element = document.querySelector(element);
			return getRenderProperies(element);
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				var canvas = document.createElement('canvas');
				return {
					element: canvas,
					renderer: "canvas",
					afterRender: function afterRender() {
						element.setAttribute("src", canvas.toDataURL());
					}
				};
			}
			// If SVG
			else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
					return {
						element: element,
						renderer: "svg"
					};
				}
				// If canvas
				else if (element.getContext) {
						return {
							element: element,
							renderer: "canvas"
						};
					} else {
						throw new Error("Not supported type to render on.");
					}
	}

	var defaults = {
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
		valid: function valid(_valid) {}
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(1);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var CODE128A = function (_CODE) {
		_inherits(CODE128A, _CODE);

		function CODE128A(string) {
			_classCallCheck(this, CODE128A);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(208) + string));
		}

		CODE128A.prototype.valid = function valid() {
			return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
		};

		return CODE128A;
	}(_CODE3.default);

	exports.default = CODE128A;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(1);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var CODE128B = function (_CODE) {
		_inherits(CODE128B, _CODE);

		function CODE128B(string) {
			_classCallCheck(this, CODE128B);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(209) + string));
		}

		CODE128B.prototype.valid = function valid() {
			return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
		};

		return CODE128B;
	}(_CODE3.default);

	exports.default = CODE128B;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(1);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var CODE128C = function (_CODE) {
		_inherits(CODE128C, _CODE);

		function CODE128C(string) {
			_classCallCheck(this, CODE128C);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(210) + string));
		}

		CODE128C.prototype.valid = function valid() {
			return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
		};

		return CODE128C;
	}(_CODE3.default);

	exports.default = CODE128C;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(1);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var CODE128AUTO = function (_CODE) {
		_inherits(CODE128AUTO, _CODE);

		function CODE128AUTO(string) {
			_classCallCheck(this, CODE128AUTO);

			// ASCII value ranges 0-127, 200-211

			var _this = _possibleConstructorReturn(this, _CODE.call(this, string));

			if (string.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) {
				var _this = _possibleConstructorReturn(this, _CODE.call(this, autoSelectModes(string)));
			} else {
				var _this = _possibleConstructorReturn(this, _CODE.call(this, string));
			}
			return _possibleConstructorReturn(_this);
		}

		return CODE128AUTO;
	}(_CODE3.default);

	function autoSelectModes(string) {
		// ASCII ranges 0-98 and 200-207 (FUNCs and SHIFTs)
		var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
		// ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
		var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		// Number pairs or [FNC1]
		var cLength = string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

		var newString;
		// Select CODE128C if the string start with enough digits
		if (cLength >= 2) {
			newString = String.fromCharCode(210) + autoSelectFromC(string);
		}
		// Select A/C depending on the longest match
		else if (aLength > bLength) {
				newString = String.fromCharCode(208) + autoSelectFromA(string);
			} else {
				newString = String.fromCharCode(209) + autoSelectFromB(string);
			}

		newString = newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function (match, char) {
			return String.fromCharCode(203) + char;
		});

		return newString;
	}

	function autoSelectFromA(string) {
		var untilC = string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var aChars = string.match(/^[\x00-\x5F\xC8-\xCF]+/);
		if (aChars[0].length === string.length) {
			return string;
		}

		return aChars[0] + String.fromCharCode(205) + autoSelectFromB(string.substring(aChars[0].length));
	}

	function autoSelectFromB(string) {
		var untilC = string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var bChars = string.match(/^[\x20-\x7F\xC8-\xCF]+/);
		if (bChars[0].length === string.length) {
			return string;
		}

		return bChars[0] + String.fromCharCode(206) + autoSelectFromA(string.substring(bChars[0].length));
	}

	function autoSelectFromC(string) {
		var cMatch = string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
		var length = cMatch.length;

		if (length === string.length) {
			return string;
		}

		string = string.substring(length);

		// Select A/B depending on the longest match
		var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
		var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		if (aLength >= bLength) {
			return cMatch + String.fromCharCode(206) + autoSelectFromA(string);
		} else {
			return cMatch + String.fromCharCode(205) + autoSelectFromB(string);
		}
	}

	exports.default = CODE128AUTO;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

	var _CODE128_AUTO = __webpack_require__(15);

	var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

	var _CODE128A = __webpack_require__(12);

	var _CODE128A2 = _interopRequireDefault(_CODE128A);

	var _CODE128B = __webpack_require__(13);

	var _CODE128B2 = _interopRequireDefault(_CODE128B);

	var _CODE128C = __webpack_require__(14);

	var _CODE128C2 = _interopRequireDefault(_CODE128C);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CODE128 = _CODE128_AUTO2.default;
	exports.CODE128A = _CODE128A2.default;
	exports.CODE128B = _CODE128B2.default;
	exports.CODE128C = _CODE128C2.default;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Encoding documentation:
	// https://en.wikipedia.org/wiki/Code_39#Encoding

	var CODE39 = function () {
		function CODE39(string) {
			_classCallCheck(this, CODE39);

			this.string = string.toUpperCase();

			// The decimal representation of the characters, is converted to the
			// corresponding binary with the getEncoding function
			this.encodings = {
				"0": 20957, "1": 29783, "2": 23639, "3": 30485,
				"4": 20951, "5": 29813, "6": 23669, "7": 20855,
				"8": 29789, "9": 23645, "A": 29975, "B": 23831,
				"C": 30533, "D": 22295, "E": 30149, "F": 24005,
				"G": 21623, "H": 29981, "I": 23837, "J": 22301,
				"K": 30023, "L": 23879, "M": 30545, "N": 22343,
				"O": 30161, "P": 24017, "Q": 21959, "R": 30065,
				"S": 23921, "T": 22385, "U": 29015, "V": 18263,
				"W": 29141, "X": 17879, "Y": 29045, "Z": 18293,
				"-": 17783, ".": 29021, " ": 18269, "$": 17477,
				"/": 17489, "+": 17681, "%": 20753, "*": 35770
			};
		}

		// Get the binary representation of a character by converting the encodings
		// from decimal to binary


		CODE39.prototype.getEncoding = function getEncoding(character) {
			return this.encodings[character].toString(2);
		};

		CODE39.prototype.encode = function encode() {
			// First character is always a *
			var result = this.getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.string.length; i++) {
				result += this.getEncoding(this.string[i]) + "0";
			}

			// Last character is always a *
			result += this.getEncoding("*");

			return {
				data: result,
				text: this.string
			};
		};

		CODE39.prototype.valid = function valid() {
			return this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		};

		return CODE39;
	}();

	exports.default = CODE39;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(2);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_2#Encoding

	var EAN2 = function () {
		function EAN2(string) {
			_classCallCheck(this, EAN2);

			this.string = string;

			this.structure = ["LL", "LG", "GL", "GG"];
		}

		EAN2.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{2}$/) !== -1;
		};

		EAN2.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();

			// Choose the structure based on the number mod 4
			var structure = this.structure[parseInt(this.string) % 4];

			// Start bits
			var result = "1011";

			// Encode the two digits with 01 in between
			result += encoder.encode(this.string, structure, "01");

			return {
				data: result,
				text: this.string
			};
		};

		return EAN2;
	}();

	exports.default = EAN2;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(2);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_5#Encoding

	var EAN5 = function () {
		function EAN5(string) {
			_classCallCheck(this, EAN5);

			this.string = string;

			// Define the EAN-13 structure
			this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
		}

		EAN5.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{5}$/) !== -1;
		};

		EAN5.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();
			var checksum = this.checksum();

			// Start bits
			var result = "1011";

			// Use normal ean encoding with 01 in between all digits
			result += encoder.encode(this.string, this.structure[checksum], "01");

			return {
				data: result,
				text: this.string
			};
		};

		EAN5.prototype.checksum = function checksum() {
			var result = 0;

			result += parseInt(this.string[0]) * 3;
			result += parseInt(this.string[1]) * 9;
			result += parseInt(this.string[2]) * 3;
			result += parseInt(this.string[3]) * 9;
			result += parseInt(this.string[4]) * 3;

			return result % 10;
		};

		return EAN5;
	}();

	exports.default = EAN5;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(2);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// http://www.barcodeisland.com/ean8.phtml

	var EAN8 = function () {
		function EAN8(string) {
			_classCallCheck(this, EAN8);

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{7}$/) !== -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}
		}

		EAN8.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{8}$/) !== -1 && this.string[7] == this.checksum(this.string);
		};

		EAN8.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();

			// Create the return variable
			var result = "";

			// Get the number to be encoded on the left side of the EAN code
			var leftSide = this.string.substr(0, 4);

			// Get the number to be encoded on the right side of the EAN code
			var rightSide = this.string.substr(4, 4);

			// Add the start bits
			result += encoder.startBin;

			// Add the left side
			result += encoder.encode(leftSide, "LLLL");

			// Add the middle bits
			result += encoder.middleBin;

			// Add the right side
			result += encoder.encode(rightSide, "RRRR");

			// Add the end bits
			result += encoder.endBin;

			return {
				data: result,
				text: this.string
			};
		};

		// Calulate the checksum digit


		EAN8.prototype.checksum = function checksum(number) {
			var result = 0;

			var i;
			for (i = 0; i < 7; i += 2) {
				result += parseInt(number[i]) * 3;
			}

			for (i = 1; i < 7; i += 2) {
				result += parseInt(number[i]);
			}

			return (10 - result % 10) % 10;
		};

		return EAN8;
	}();

	exports.default = EAN8;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _EAN2 = __webpack_require__(5);

	var _EAN3 = _interopRequireDefault(_EAN2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } // UPC is encoded as EAN13 but the first digit always being zero

	var UPC = function (_EAN) {
		_inherits(UPC, _EAN);

		function UPC(string, options) {
			_classCallCheck(this, UPC);

			return _possibleConstructorReturn(this, _EAN.call(this, "0" + string, options));
		}

		return UPC;
	}(_EAN3.default);

	exports.default = UPC;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

	var _EAN = __webpack_require__(5);

	var _EAN2 = _interopRequireDefault(_EAN);

	var _EAN3 = __webpack_require__(20);

	var _EAN4 = _interopRequireDefault(_EAN3);

	var _EAN5 = __webpack_require__(19);

	var _EAN6 = _interopRequireDefault(_EAN5);

	var _EAN7 = __webpack_require__(18);

	var _EAN8 = _interopRequireDefault(_EAN7);

	var _UPC = __webpack_require__(21);

	var _UPC2 = _interopRequireDefault(_UPC);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.EAN13 = _EAN2.default;
	exports.EAN8 = _EAN4.default;
	exports.EAN5 = _EAN6.default;
	exports.EAN2 = _EAN8.default;
	exports.UPC = _UPC2.default;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GenericBarcode = function () {
		function GenericBarcode(string) {
			_classCallCheck(this, GenericBarcode);

			this.string = string;
		}

		// Return the corresponding binary numbers for the data provided


		GenericBarcode.prototype.encode = function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.string
			};
		};

		// Resturn true/false if the string provided is valid for this encoder


		GenericBarcode.prototype.valid = function valid() {
			return true;
		};

		return GenericBarcode;
	}();

	exports.default = GenericBarcode;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITF = function () {
		function ITF(string) {
			_classCallCheck(this, ITF);

			this.string = string;

			this.binaryRepresentation = {
				"0": "00110",
				"1": "10001",
				"2": "01001",
				"3": "11000",
				"4": "00101",
				"5": "10100",
				"6": "01100",
				"7": "00011",
				"8": "10010",
				"9": "01010"
			};
		}

		ITF.prototype.valid = function valid() {
			return this.string.search(/^([0-9]{2})+$/) !== -1;
		};

		ITF.prototype.encode = function encode() {
			// Always add the same start bits
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < this.string.length; i += 2) {
				result += this.calculatePair(this.string.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.string
			};
		};

		// Calculate the data of a number pair


		ITF.prototype.calculatePair = function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		};

		return ITF;
	}();

	exports.default = ITF;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITF14 = function () {
		function ITF14(string) {
			_classCallCheck(this, ITF14);

			this.string = string;

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{13}$/) !== -1) {
				this.string += this.checksum(string);
			}

			this.binaryRepresentation = {
				"0": "00110",
				"1": "10001",
				"2": "01001",
				"3": "11000",
				"4": "00101",
				"5": "10100",
				"6": "01100",
				"7": "00011",
				"8": "10010",
				"9": "01010"
			};
		}

		ITF14.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{14}$/) !== -1 && this.string[13] == this.checksum();
		};

		ITF14.prototype.encode = function encode() {
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += this.calculatePair(this.string.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.string
			};
		};

		// Calculate the data of a number pair


		ITF14.prototype.calculatePair = function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		};

		// Calulate the checksum digit


		ITF14.prototype.checksum = function checksum() {
			var result = 0;

			for (var i = 0; i < 13; i++) {
				result += parseInt(this.string[i]) * (3 - i % 2 * 2);
			}

			return 10 - result % 10;
		};

		return ITF14;
	}();

	exports.default = ITF14;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(0);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var MSI10 = function (_MSI) {
		_inherits(MSI10, _MSI);

		function MSI10(string) {
			_classCallCheck(this, MSI10);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI10;
	}(_MSI3.default);

	exports.default = MSI10;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(0);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var MSI1010 = function (_MSI) {
		_inherits(MSI1010, _MSI);

		function MSI1010(string) {
			_classCallCheck(this, MSI1010);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod10)(_this.string);
			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI1010;
	}(_MSI3.default);

	exports.default = MSI1010;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(0);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var MSI11 = function (_MSI) {
		_inherits(MSI11, _MSI);

		function MSI11(string) {
			_classCallCheck(this, MSI11);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			return _this;
		}

		return MSI11;
	}(_MSI3.default);

	exports.default = MSI11;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(0);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var MSI1110 = function (_MSI) {
		_inherits(MSI1110, _MSI);

		function MSI1110(string) {
			_classCallCheck(this, MSI1110);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI1110;
	}(_MSI3.default);

	exports.default = MSI1110;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

	var _MSI = __webpack_require__(0);

	var _MSI2 = _interopRequireDefault(_MSI);

	var _MSI3 = __webpack_require__(26);

	var _MSI4 = _interopRequireDefault(_MSI3);

	var _MSI5 = __webpack_require__(28);

	var _MSI6 = _interopRequireDefault(_MSI5);

	var _MSI7 = __webpack_require__(27);

	var _MSI8 = _interopRequireDefault(_MSI7);

	var _MSI9 = __webpack_require__(29);

	var _MSI10 = _interopRequireDefault(_MSI9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.MSI = _MSI2.default;
	exports.MSI10 = _MSI4.default;
	exports.MSI11 = _MSI6.default;
	exports.MSI1010 = _MSI8.default;
	exports.MSI1110 = _MSI10.default;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Encoding documentation
	// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

	var pharmacode = function () {
	  function pharmacode(string) {
	    _classCallCheck(this, pharmacode);

	    this.number = parseInt(string, 10);
	  }

	  pharmacode.prototype.encode = function encode() {
	    var z = this.number;
	    var result = "";

	    // http://i.imgur.com/RMm4UDJ.png
	    // (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
	    while (!isNaN(z) && z != 0) {
	      if (z % 2 === 0) {
	        // Even
	        result = "11100" + result;
	        z = (z - 2) / 2;
	      } else {
	        // Odd
	        result = "100" + result;
	        z = (z - 1) / 2;
	      }
	    }

	    // Remove the two last zeroes
	    result = result.slice(0, -2);

	    return {
	      data: result,
	      text: this.number + ""
	    };
	  };

	  pharmacode.prototype.valid = function valid() {
	    return this.number >= 3 && this.number <= 131070;
	  };

	  return pharmacode;
	}();

	exports.default = pharmacode;

/***/ }
/******/ ]);
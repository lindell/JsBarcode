(function($){
	$.fn.JsBarcode = function(content,options) {
	
		options = $.extend({}, $.fn.JsBarcode.defaults, options);

		//Create the canvas where the barcode will be drawn on
		var canvas = document.createElement('canvas');
		
		//Abort if the browser does not support HTML5canvas
		if (!canvas.getContext) {
			return this;
		}
		
		//Abort if the barcode format is not supported
		if($.fn.JsBarcode.supportedBarcodes[options.format]==undefined){
			return this;
		}
		
		var encryptor = new $.fn.JsBarcode.supportedBarcodes[options.format](content);
		
		//Abort if the barcode format does not support the content
		if(!encryptor.valid()){
			return this;
		}
		
		var binary = encryptor.encoded();
		var ctx    = canvas.getContext("2d");
		
		canvas.width = binary.length*options.width+2*options.quite;
		canvas.height = options.height;
		
		//Paint the canvas white
		ctx.fillStyle = "#fff";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		
		//NOT A GOOD WAY OF DOING IT, NEED TO BE FIXED
		drawBinary(binary,ctx,options.width,options.height,options.quite);
		
		
		uri = canvas.toDataURL('image/png');
		
		return $(this).attr("src",uri);

		function drawBinary(binaryString, context, width, height, quietZone){
			
			for(var i=0;i<binaryString.length;i++){
			
				var x = i*width+quietZone;
				
				if(binaryString[i] == "1"){
					context.fillStyle = "#000";
				}
				else if(binaryString[i] == "0"){
					context.fillStyle = "#fff";
				}
				else{
					console.log("Not a binary number!");
				}
				
				context.fillRect(x,0,width,height);
			}
		}
	};
	
	$.fn.JsBarcode.defaults = {
		width:	2,
		height:	100,
		quite: 10,
		format:	"CODE128"
	};
		
	$.fn.JsBarcode.supportedBarcodes = {
		"CODE128":	CODE128,
		"EAN":		EAN,
		"UPC":		UPC,
		"UPC-A":	UPC
	};
})(jQuery);
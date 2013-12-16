(function($){
    $.fn.JsBarcode = function(content,options) {

        //Merge the user options with the default
        options = $.extend({}, $.fn.JsBarcode.defaults, options);

        //Create the canvas where the barcode will be drawn on
        var canvas = document.createElement('canvas'),
            ctx,
            encoder,
            binary,
            i,
            paddingX,
            _drawBarcodeText,
            uri;

        //Abort if the browser does not support HTML5canvas
        if (!canvas.getContext) {
            return this;
        }

        //Get the canvas context
        ctx = canvas.getContext("2d");

        encoder = new window[options.format](content);

        //Abort if the barcode format does not support the content
        if(!encoder.valid()){
            return this;
        }

        //Encode the content
        binary = encoder.encoded();

        _drawBarcodeText = function (text) {
            var x = canvas.width / 2,
                y = options.height;

            ctx.font = "12px arial";
            ctx.textBaseline = "bottom";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(text, x, y);
        }

        //Set the width and height of the barcode
        canvas.width = binary.length*options.width+2*options.quite;
        canvas.height = options.height+30;

        //Paint the canvas white
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        //Creates the barcode out of the encoded binary
        for(i=0;i<binary.length;i++){

            // Padding on left and right side of barcode
            paddingX = i*options.width+options.quite;

            if(binary[i] == "1"){
                ctx.fillStyle = "#000";
            }
            else{
                ctx.fillStyle = "#fff";
            }

            ctx.fillRect(paddingX,0,options.width,options.height);
        }

        if(options.displayValue){
            _drawBarcodeText(content);
        }

        //Grab the dataUri from the canvas
        uri = canvas.toDataURL('image/png');

        //Put the data uri into the image
        return $(this).attr("src",uri);

    };

    $.fn.JsBarcode.defaults = {
        displayValue: true,
        width:  2,
        height: 100,
        quite: 10,
        format: "CODE128"
    };

})(jQuery);

var defaultValues = {
    CODE128 : "JsBarcode",
    EAN : "1234567890128",
    UPC : "123456789999",
    CODE39 : "JSBARCODE",
    ITF14 : "10012345000017",
    ITF : "123456",
    pharmacode : "1234"
};

$(document).ready(function(){
    $("#userInput").on('input',newBarcode);
    $("#barcodeType").change(function(){
        $("#userInput").val( defaultValues[$(this).val()] );
        newBarcode();
    });
    $("input:radio[name=display-value]").click(newBarcode);
    newBarcode();

    $('input[type="range"]').rangeslider({
        polyfill: false,
        rangeClass: 'rangeslider',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',
        onSlide: newBarcode,
        onSlideEnd: newBarcode
    });
});

var newBarcode = function() {
    //Convert to boolean
    var displayValue = ($("input:radio[name=display-value]:checked").val() === "true");
    $("#barcode").JsBarcode(
        $("#userInput").val(),{
            "format":$("#barcodeType").val(),
            "backgroundColor":"#fff",
            "fontSize":parseInt($("#bar-fontSize").val()),
            "height":parseInt($("#bar-height").val()),
            "width":$("#bar-width").val(),
            "displayValue":displayValue
        },
        function(valid){
            if(valid){
                $("#invalid").stop().fadeTo(300,0);
            }
            else{
                $("#invalid").stop().fadeTo(300,1);
            }
        });

    $("#bar-width-display").text($("#bar-width").val());
    $("#bar-height-display").text($("#bar-height").val());
    $("#bar-fontSize-display").text($("#bar-fontSize").val());
};
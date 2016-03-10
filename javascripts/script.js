var defaultValues = {
    CODE128 : "JsBarcode",
    CODE128C : "13 37 4 20",
    EAN : "1234567890128",
    EAN8 : "12345670",
    UPC : "123456789999",
    CODE39 : "JSBARCODE",
    ITF14 : "10012345000017",
    ITF : "123456",
    MSI : "123456",
    MSI10 : "123456",
    MSI11 : "123456",
    MSI1010 : "123456",
    MSI1110 : "123456",
    pharmacode : "1234"
};

var displayValue = true;
var textAlign = "center";

$(document).ready(function(){
    $("#userInput").on('input',newBarcode);
    $("#barcodeType").change(function(){
        $("#userInput").val( defaultValues[$(this).val()] );
        newBarcode();
    });

    $(".text-align").click(function(){
      $(".text-align").removeClass("btn-primary");
      $(this).addClass("btn-primary");
      textAlign = $(this).val();
      newBarcode();
    });

    $(".display-text").click(function(){
      $(".display-text").removeClass("btn-primary");
      $(this).addClass("btn-primary");
      displayValue = $(this).val() == "true";
      newBarcode();
    });


    newBarcode();

    $('input[type="range"]').rangeslider({
        polyfill: false,
        rangeClass: 'rangeslider',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',
        onSlide: newBarcode,
        onSlideEnd: newBarcode
    });

    $('input.color').colorPicker({
      actionCallback: newBarcode
    });
});

var newBarcode = function() {
    //Convert to boolean
    console.log(textAlign);
    $("#barcode").JsBarcode(
        $("#userInput").val(),
        {
            "format": $("#barcodeType").val(),
            "backgroundColor": $("#background-color").val(),
            "lineColor": $("#line-color").val(),
            "fontSize": parseInt($("#bar-fontSize").val()),
            "height": parseInt($("#bar-height").val()),
            "width": $("#bar-width").val(),
            "quite": parseInt($("#bar-margin").val()),
            "displayValue": displayValue,
            "textAlign": textAlign
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
    $("#bar-margin-display").text($("#bar-margin").val());
};

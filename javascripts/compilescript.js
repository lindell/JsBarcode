var barcode_urls = {
  "CODE128":    "https://raw.github.com/lindell/JsBarcode/master/CODE128.js",
  "CODE39":     "https://raw.github.com/lindell/JsBarcode/master/CODE39.js",
  "EAN_UPC":    "https://raw.github.com/lindell/JsBarcode/master/EAN_UPC.js",
  "ITF":        "https://raw.github.com/lindell/JsBarcode/master/ITF.js",
  "ITF14":      "https://raw.github.com/lindell/JsBarcode/master/ITF14.js",
  "pharmacode": "https://raw.github.com/lindell/JsBarcode/master/pharmacode.js",
  "JsBarcode":  "https://raw.github.com/lindell/JsBarcode/master/JsBarcode.js"
};

$(document).ready(function(){
  $("#download_btn").click(function(){
    var urls = [];
    var customName = "";
    $('#barcodeboxes input:checked').each(function() {
        urls.push(barcode_urls[$(this).val()]);
        customName = $(this).val() + (customName ? "." : "") + customName;
    });

    var fileName;
    if(urls.length == Object.keys(barcode_urls).length){
      fileName = "JsBarcode.all.min.js";
    }
    else if(urls.length <= 2){
      fileName = customName + ".min.js";
    }
    else{
      fileName = "JsBarcode.custom.min.js";
    }

    var params = { code_url : urls,
              compilation_level : "SIMPLE_OPTIMIZATIONS",
              output_info : "compiled_code",
              output_format : "json"};

    var succ = function(data, textStatus){
      var blob = new Blob([data["compiledCode"]], {type: "text/plain;charset=utf-8"});
      saveAs(blob, fileName);
    }

    var request = $.ajax({
        url: "http://closure-compiler.appspot.com/compile",
        method: "POST",
        data: $.param(params, true),
        dataType: "json",
        success : succ,
        error : error
    });
  });
});

function error(){
  alert("Error");
}

var baseUrl = "https://raw.githubusercontent.com/lindell/JsBarcode/";
var tagName = "";
var barcode_urls = {
  "CODE128":    "/barcodes/CODE128.js",
  "CODE39":     "/barcodes/CODE39.js",
  "EAN_UPC":    "/barcodes/EAN_UPC.js",
  "ITF":        "/barcodes/ITF.js",
  "ITF14":      "/barcodes/ITF14.js",
  "MSI":        "/barcodes/MSI.js",
  "pharmacode": "/barcodes/pharmacode.js",
  "JsBarcode":  "/JsBarcode.js"
};

$(document).ready(function(){
  //Get the tag of the latest release on github
  setLoading();
  $.ajax({
      url: "//api.github.com/repos/lindell/JsBarcode/releases",
      method: "GET",
      dataType: "json",
      success : function(data){
        tagName = data[0]["tag_name"];
        setDownload();
      },
      error : error
  });

  //Start the compilation
  $("#download_btn").click(function(){
    setLoading();

    var urls = [];
    var customName = "";
    $('#barcodeboxes input:checked').each(function() {
        urls.push(baseUrl + tagName + barcode_urls[$(this).val()]);
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
      setDownload();

      if(!data["serverErrors"]){
        var blob = new Blob([data["compiledCode"]], {type: "text/plain;charset=utf-8"});
        saveAs(blob, fileName);
      }
      else{
        alert(data["serverErrors"][0]["error"]);
      }
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

function setLoading(){
  $("#downloadicon").css({display: "none"});
  $("#loadingicon").css({display: "inline-block"});
  $("#download_btn").prop("disabled", true);
}

function setDownload(){
  $("#downloadicon").css({display: "inline-block"});
  $("#loadingicon").css({display: "none"});
  $("#download_btn").prop("disabled", false);
}

function error(){
  alert("Error");
}

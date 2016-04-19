var parent;
function doTests(p){
  parent = p;
  createTests(newTest);
}

function newTest(text, options){
  var testbox = document.createElement("div");
  testbox.className = "testbox";

  var format = (typeof options !== "undefined" && options.format) || "auto";

  testbox.innerHTML = '\
    <b>Format:</b> ' + format + '<br>\
    <b>Input:</b> ' + text + '<br>\
    <br>\
    <img class="barcode"/>';

  try{
    $('.barcode', testbox).JsBarcode(text, options);
  }
  catch(e){
    testbox.className = "errorbox";
    testbox.onclick = function(){
      throw e;
    }
  }

  parent.appendChild(testbox);
}

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
    <svg class="barcode"/>';

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

function createTests(newTest){
    newTest("123456789", {
        width: 4,
        height:	50,
        format:	"CODE128",
        displayValue: true,
        fontOptions: "bold",
        font: "bold",
        textAlign: "center",
        textMargin: 5,
        fontSize: 28,
        background: "white",
        lineColor: "#000",
        margin: 0,
        textLength: 270
    });
}
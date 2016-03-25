function createTests(parent){
  newTest(parent, "This has a \nnewline", {width: 1});
  newTest(parent, "A little test!", {format: "CODE128", width: 1});
  newTest(parent, "A LITTLE TEST", {format: "CODE39", width: 1});
  newTest(parent, "A little test", {format: "CODE39", width: 1});
  newTest(parent, "123456789999", {format: "UPC", width: 1});
  newTest(parent, "5901234123457", {format: "EAN", width: 1});
  newTest(parent, "590123412345", {format: "EAN", width: 1});
  newTest(parent, "96385074", {format: "EAN8", width: 1});
  newTest(parent, "9638507", {format: "EAN8", width: 1});
  newTest(parent, "12345678", {format: "ITF", width: 1});
  newTest(parent, "98765432109213", {format: "ITF14", width: 1});
  newTest(parent, "12345", {format: "pharmacode", width: 1});
  newTest(parent, "1337420", {format: "CODE128C", width: 1});
  newTest(parent, "12345674", {format: "MSI", width: 1});
  newTest(parent, "Such customize!", {
    width: 1,
    height:	50,
    format:	"CODE128",
    displayValue: true,
    fontOptions: "bold",
    font: "cursive",
    textAlign: "right",
    textMargin: 20,
    fontSize: 28,
    background: "#f00",
    lineColor: "#0ff",
    margin: 10,
    marginTop: 60,
    marginBottom: 5,
    marginLeft: 60,
    marginRight: 30
  });

}

function newTest(parent, text, options){
  var testbox = document.createElement("div");
  testbox.className = "testbox";

  var format = (typeof options !== "undefined" && options.format) || "auto";

  testbox.innerHTML = '\
    <b>Format:</b> ' + format + '<br>\
    <b>Input:</b> ' + text + '<br>\
    <br>\
    <img class="barcode"/>';

  try{
    JsBarcode(testbox.querySelector('.barcode'), text, options);
  }
  catch(e){
    testbox.className = "errorbox";
    testbox.onclick = function(){
      throw e;
    }
  }

  parent.appendChild(testbox);
}

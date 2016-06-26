var msnry;

window.onload = function(){
  msnry = new Masonry('.tile-box', {
    itemSelector: 'section',
    columnWidth: 'section',
    transitionDuration: 0
  });

  initBarcodes();

  hljs.initHighlighting();

  JsBarcode(".barcode").init();

  smenu(".main section", ".menu .inner", {
    titleScrollOnClick: true
  });


  var typePicker = document.querySelector(".type-picker");

  // Set default style
  var jsBarcodeType = "js";
  setStyle(jsBarcodeType);

  // Switch between styles of JsBarcode
  typePicker.onclick = function(){
    jsBarcodeType = jsBarcodeType == "js" ? "html" : "js";

    setStyle(jsBarcodeType);
  }

  function setStyle(type){
    var main = document.querySelector(".main");

    main.classList.remove("js");
    main.classList.remove("html");

    main.classList.add(type);

    msnry.layout();
  }

  function initBarcodes(){
    var examples = document.querySelectorAll(".example");
    for(var i = 0; i < examples.length; i++){
      var barcodeDiv = examples[i];
      var value = barcodeDiv.getAttribute("data-value");
      var options = JSON.parse(barcodeDiv.getAttribute("data-options"));

      var stringOptions = JSON.stringify(options);

      // Js version
      var jsPre = document.createElement("pre");
      var jsCode = document.createElement("code");
      jsCode.className = "js-code javascript";
      jsPre.appendChild(jsCode);
      barcodeDiv.appendChild(jsPre);

      jsCode.innerHTML = "JsBarcode('#barcode', '" + value + "', " + jsonFormater(options) + ");";

      // Html version
      var htmlPre = document.createElement("pre");
      var htmlCode = document.createElement("code");
      htmlCode.className = "html-code html";
      htmlPre.appendChild(htmlCode);
      barcodeDiv.appendChild(htmlPre);

      var html = createHTMLCode(value, options);
      var escapedHtml = html.replace(/</g,"&lt;").replace(/>/g,"&gt;")
      htmlCode.innerHTML = escapedHtml;

      // The barcode
      var barcodeContainer = document.createElement("div");
      barcodeContainer.className = "barcode-container";

      barcodeContainer.innerHTML = html;

      barcodeDiv.appendChild(barcodeContainer);
    }
  }

  msnry.layout();
}

function createHTMLCode(value, options){
  var ret = '<svg class="barcode"';

  ret += '\n  jsbarcode-value="' + value + '"';

  for(var i in options){
    ret += '\n  jsbarcode-' + i + '="' + options[i] + '"';
  }

  ret += "\n></svg>";

  return ret;
}

// Format the json to the javascript style used for options
function jsonFormater(json){
  var ret = "{";

  var first = true;
  for(var i in json){
    if(first){
      first = false;
    }
    else{
      ret += ",";
    }

    if(typeof json[i] === "number"){
      ret += "\n  " + i + ": " + json[i];
    }
    else{
      ret += "\n  " + i + ": '" + json[i] + "'";
    }
  }

  ret += "\n}";

  return ret;
}

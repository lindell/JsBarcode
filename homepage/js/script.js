JsBarcode(".barcode").init();

var barcodeStrings = ["JsBarcode!", "It is super easy.","this is and example"];
var barcodeStringsI = 0;

var start = null;

var state = "in";

nextBarcode();

function anim(timestamp){
  if(!start) start = timestamp;
  var progress = timestamp - start;
  var percentage = progress / 1000;
  if(percentage > 1) percentage = 1;

  if(state == "in") setRectsHeights(percentage);
  if(state == "out") setRectsHeights(1 - percentage );

  if(percentage < 1){
    window.requestAnimationFrame(anim);
  }
  else{
    start = null;

    if(state == "in"){
      state = "out";
      setTimeout(function(){
        window.requestAnimationFrame(anim);
      }, 2500);
    }

    else if(state == "out"){
      state = "in";
      nextBarcode();
      setRectsHeights(0);

      setTimeout(function(){
        window.requestAnimationFrame(anim);
      }, 300);
    }
  }
}

function setRectsHeights(percentage){
  var rects = document.querySelectorAll("#barcode rect");
  for (var i = 0, len = rects.length; i < len; i++) {
    var rectPart = (i / rects.length) ;
    var y =  Math.sin(rectPart * Math.PI)*2 + Math.easeInOutQuad(percentage)*3 - 2;
    if(y > 1) y = 1;
    if(y < 0) y = 0;

    rects[i].style.transform = "scale(1, " + y + ")";
  }
}

function nextBarcode(){
  JsBarcode("#barcode", barcodeStrings[barcodeStringsI++ % barcodeStrings.length], {
    displayValue: false,
    background: "rgba(0,0,0,0)",
    lineColor: "#f2f2f2",
    width: 2,
    height: 150
  });
}

window.requestAnimationFrame(anim);


Math.easeInOutQuad = function (t) {
	if (t <= 0.5) return t*t*2;
  t -= 0.5;
	return 2 * t * (1 - t) + 0.5;
};

window.onload = function(){
  JsBarcode(".barcode").init();

  var msnry = new Masonry( '.main', {
    itemSelector: 'section',
    columnWidth: 700,
    transitionDuration: 0
  });
  msnry.layout();

  smenu(".main section", ".menu .inner");
}

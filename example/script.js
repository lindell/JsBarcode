var canvas,
	ctx,
	input,
	info;

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	
	input = document.getElementById("input");
	info = document.getElementById("info");
	
	input.onkeyup = newUPC;
	
	newUPC();
}



function newUPC(){
	
	var text = input.value;
	
	ctx.clearRect(0,0,1000,100);
	
	var ean = new EAN(text);
	var code128 = new CODE128(text);
	
	if(ean.valid()){
		drawBinary(ean.encoded(), ctx);
		info.innerHTML = "Using EAN13";
	}
	else if(code128.valid()){
		drawBinary(code128.encoded(), ctx, {width:1,height:20});
		info.innerHTML = "Using Code128";
	}
	else{
		info.innerHTML = "Not a supported input!";
	}
	

}
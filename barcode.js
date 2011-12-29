function drawBinary(binaryString, context, options){

	var default_arg = {
		width:2,
		height:100,
		x:0,
		y:0,
		quietZone:10,
	}
	
	if(options == undefined){
		options = {};
	}
	
	for(var i in default_arg) {
		if(typeof options[i] == "undefined") options[i] = default_arg[i];
	}
	
	
	for(var i=0;i<binaryString.length;i++){
	
		var x = i*options.width+options.x+options.quietZone;
		var y = options.y;
		
		if(binaryString[i] == "1"){
			context.fillStyle = "#000";
		}
		else if(binaryString[i] == "0"){
			context.fillStyle = "#fff";
		}
		else{
			console.log("Not a binary number!");
		}
		
		context.fillRect(x,y,options.width,options.height);
	}
}
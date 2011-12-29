function drawBinary(binaryString, context, height, width){
	for(var i=0;i<binaryString.length;i++){
	
		var x = i*width;
		var y = 0;
		
		if(binaryString[i] == "1"){
			context.fillStyle = "#000";
		}
		else if(binaryString[i] == "0"){
			context.fillStyle = "#fff";
		}
		else{
			console.log("Not a binary number!");
		}
		
		context.fillRect(x,y,width,height);
	}
}
export default drawSVG;

import merge from "../help/merge.js";

var svgns = "http://www.w3.org/2000/svg";

function drawSVG(svg, encodings, options){
  var currentX = options.marginLeft;

	prepareSVG(svg, options, encodings);
	for(var i in encodings){
		var encodingOptions = merge(options, encodings[i].options);
    var group = createGroup(currentX, options.marginTop, svg);

		drawSvgBarcode(group, encodingOptions, encodings[i]);
		drawSVGText(group, encodingOptions, encodings[i]);

    currentX += encodings[i].width;
	}

	//restoreCanvas(canvas);
}

function drawSvgBarcode(parent, options, encoding){
  var binary = encoding.data;
  var text = encoding.text;

  // Creates the barcode out of the encoded binary
  var yFrom, yHeight;
  if(options.textPosition == "top"){
    yFrom = options.fontSize + options.textMargin;
  }
  else{
    yFrom = 0;
  }
  yHeight = options.height;

  // TODO fix line color here

  for(var b in binary){
    var x = b*options.width + encoding.barcodePadding;
    if(binary[b] === "0" && binary[b] === 0){

    }
    else if(binary[b] === "1"){
      drawLine(x, yFrom, options.width, options.height, parent);
    }
    else if(binary[b]){
      drawLine(x, yFrom, options.width, options.height * binary[b], parent);
    }
  }
}

function drawSVGText(parent, options, encoding){
  var textElem = document.createElementNS(svgns, 'text');

  // Draw the text if displayValue is set
  if(options.displayValue){
    var x, y;

    textElem.setAttribute("style",
      "font-family:" + options.font + ";" +
      "font-size:" + options.fontSize + "px;"
    );

    if(options.textPosition == "top"){
      y = options.fontSize;
      textElem.setAttribute("alignment-baseline", "baseline");
    }
    else{
      y = options.height + options.textMargin;
      textElem.setAttribute("alignment-baseline", "text-before-edge");
    }

    // Draw the text in the correct X depending on the textAlign option
    if(options.textAlign == "left" || encoding.barcodePadding > 0){
      x = 0;
      textElem.setAttribute("text-anchor", "start");
    }
    else if(options.textAlign == "right"){
      x = encoding.width-1;
      textElem.setAttribute("text-anchor", "end");
    }
    //In all other cases, center the text
    else{
      x = encoding.width / 2;
      textElem.setAttribute("text-anchor", "middle");
    }

    textElem.setAttribute("x", x);
    textElem.setAttribute("y", y);

    textElem.appendChild(document.createTextNode(encoding.text));

    parent.appendChild(textElem);
  }
}


var prepareSVG = function(svg, options, encodings){
	// Clear SVG
	// TODO

  var totalWidth = 0;
	for(var i in encodings){
		var textWidth = messureSVGtext(encodings[i].text, svg, options);
		var barcodeWidth = encodings[i].data.length * options.width;

		encodings[i].width =  Math.ceil(Math.max(textWidth, barcodeWidth));

		var barcodePadding = 0;
		if(options.displayValue && barcodeWidth < textWidth){
			if(options.textAlign == "center"){
				barcodePadding = Math.floor((textWidth - barcodeWidth)/2);
			}
			else if(options.textAlign == "left"){
				barcodePadding = 0;
			}
			else if(options.textAlign == "right"){
				barcodePadding = Math.floor(textWidth - barcodeWidth);
			}
		}
		encodings[i].barcodePadding = barcodePadding;

		totalWidth += encodings[i].width;
	}

	svg.setAttribute("width", totalWidth + options.marginLeft + options.marginRight);

	svg.setAttribute("height", options.height
		+ (options.displayValue ? options.fontSize : 0)
		+ options.textMargin
		+ options.marginTop
		+ options.marginBottom);

	// Paint the canvas
	/*ctx.clearRect(0,0,canvas.width,canvas.height);
	if(options.background){
		ctx.fillStyle = options.background;
		ctx.fillRect(0,0,canvas.width, canvas.height);
	}*/
}

var messureSVGtext = function(text, svg, options){
	// Create text element
	var text = document.createElementNS(svgns, 'text');
	text.style.fontFamily = options.font;

  text.setAttribute("style",
    "font-family:" + options.font + ";" +
    "font-size:" + options.fontSize + "px;"
  );

	var textNode = document.createTextNode(text);

	text.appendChild(textNode);

  //svg.appendChild(text);

	return text.getComputedTextLength();
}

function createGroup(x, y, svg){
	var group = document.createElementNS(svgns, 'g');

	group.setAttribute("transform", "translate(" + x +", " + y + ")");

	svg.appendChild(group);

	return group;
}

function drawLine(x, y, width, height, parent){
	var line = document.createElementNS(svgns, 'rect');

	line.setAttribute("x", x);
	line.setAttribute("y", y);
	line.setAttribute("width", width);
	line.setAttribute("height", height);
	line.setAttribute("style", "fill:rgb(0,0,0)");

	parent.appendChild(line);
}

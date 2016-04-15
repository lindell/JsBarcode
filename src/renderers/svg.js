export default renderSVG;

import merge from "../help/merge.js";

var svgns = "http://www.w3.org/2000/svg";

function renderSVG(svg, encodings, options){
  var currentX = options.marginLeft;

	prepareSVG(svg, options, encodings);
	for(var i in encodings){
		var encodingOptions = merge(options, encodings[i].options);

    var group = createGroup(currentX, encodingOptions.marginTop, svg);

    setGroupOptions(group, encodingOptions, encodings[i]);

		drawSvgBarcode(group, encodingOptions, encodings[i]);
		drawSVGText(group, encodingOptions, encodings[i]);

    currentX += encodings[i].width;
	}
}


function prepareSVG(svg, options, encodings){
  // Clear the SVG
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  var totalWidth = 0;
  var maxHeight = 0;
	for(var i in encodings){
    let options = merge(options, encodings[i].options);

    // Calculate the width of the encoding
		var textWidth = messureSVGtext(encodings[i].text, svg, options);
		var barcodeWidth = encodings[i].data.length * options.width;
		encodings[i].width =  Math.ceil(Math.max(textWidth, barcodeWidth));

    // Calculate the height of the encoding
    var height = options.height +
      ((options.displayValue && encodings[i].text.length > 0) ? options.fontSize : 0) +
      options.textMargin +
      options.marginTop +
      options.marginBottom;

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

    if(height > maxHeight){
      maxHeight = height;
    }

		totalWidth += encodings[i].width;
	}

	svg.setAttribute("width", totalWidth + options.marginLeft + options.marginRight);

	svg.setAttribute("height", maxHeight);

	if(options.background){
		svg.style.background = options.background;
	}
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

  for(var b in binary){
    var x = b*options.width + encoding.barcodePadding;
    if(binary[b] === "0" && binary[b] === 0){

    }
    else if(binary[b] === "1"){
      drawLine(x, yFrom, options.width, options.height, parent);
    }
    else if(binary[b] > 0){
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
      "font:" + options.fontOptions + " " + options.fontSize + "px "+options.font
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

//
// Help functions
//
function messureSVGtext(string, svg, options){
	// Create text element
	var text = document.createElementNS(svgns, 'text');
	text.style.fontFamily = options.font;

  text.setAttribute("style",
    "font-family:" + options.font + ";" +
    "font-size:" + options.fontSize + "px;"
  );

	var textNode = document.createTextNode(string);

	text.appendChild(textNode);

  svg.appendChild(text);

  var size = text.getComputedTextLength();

  svg.removeChild(text);

	return size;
}

function createGroup(x, y, svg){
	var group = document.createElementNS(svgns, 'g');

	group.setAttribute("transform", "translate(" + x +", " + y + ")");

	svg.appendChild(group);

	return group;
}

function setGroupOptions(group, options, encoding){
  group.setAttribute("style",
    "fill:" + options.lineColor + ";"
  );
}

function drawLine(x, y, width, height, parent){
	var line = document.createElementNS(svgns, 'rect');

	line.setAttribute("x", x);
	line.setAttribute("y", y);
	line.setAttribute("width", width);
	line.setAttribute("height", height);

	parent.appendChild(line);
}

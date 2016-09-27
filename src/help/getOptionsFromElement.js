import optionsFromStrings from "./optionsFromStrings.js";

function getOptionsFromElement(element){
	var options = {};

	var attributes = element.attributes;
	for(var i = 0; i < attributes.length; i++){
		var name = attributes[i].name;
		var value = attributes[i].value;

		var match = name.match(/(jsbarcode|data)-([A-Za-z0-9]+)/i);
		if(match){
			var property = match[2];

			options[property] = value;
		}
	}

	// Since all atributes are string they need to be converted to integers
	options = optionsFromStrings(options);

	return options;
}

export default getOptionsFromElement;

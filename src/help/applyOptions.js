export default applyOptions;

function applyOptions(optionsBlueprint, options) {
	var returnOptions = {};
	for (var name in optionsBlueprint) {
		if (optionsBlueprint.hasOwnProperty(name)) {
			if (typeof options[name] !== 'undefined') {
				returnOptions[name] = convertOption(options[name], optionsBlueprint[name].type);
			}
			else {
				returnOptions[name] = optionsBlueprint[name].default;
			}
		}
	}
	return returnOptions;
}

// Convert an option to a specified type
function convertOption(data, type) {
	if (type === 'string') {
		return '' + data;
	}
	else if (type === 'number') {
		return parseInt(data, 10);
	}
	else if (type === 'boolean') {
		return (typeof data === 'boolean' && data) || data === 'true' || data === 'True';
	}
	else {
		return data;
	}
}

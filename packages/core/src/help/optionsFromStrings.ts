// Convert string to integers/booleans where it should be
function optionsFromStrings(options: any) {
	var intOptions = [
		'width',
		'height',
		'textMargin',
		'fontSize',
		'margin',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight'
	];

	for (const intOption of intOptions) {
		if (typeof options[intOption] === 'string') {
			options[intOption] = parseInt(options[intOption], 10);
		}
	}

	if (typeof options['displayValue'] === 'string') {
		options['displayValue'] = options['displayValue'] !== 'false';
	}

	return options;
}

export default optionsFromStrings;

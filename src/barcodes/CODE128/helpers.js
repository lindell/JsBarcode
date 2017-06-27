const OPTIONS = [ 'ean128', 'ignoreBrackets', 'ignoreSpaces' ];

export const normalizeOptions = (options) => {
	OPTIONS.forEach((option) => {
		if (option in options) {
			const value = options[option];
			options[option] = value === true || value === 'true';
		}
	});
	return options;
};

export const formatData = (data, options) => {
	if (options.ignoreBrackets === true) {
		data = data.replace(/[()]/g, '');
	}
	if (options.ignoreSpaces === true) {
		data = data.replace(/ /g, '');
	}
	return data;
};

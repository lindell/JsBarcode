function InvalidInputException(symbology, input) {
	this.name = 'InvalidInputException';

	this.symbology = symbology;
	this.input = input;

	this.message = '"' + this.input + '" is not a valid input for ' + this.symbology;
}
InvalidInputException.prototype = Error.prototype;

function InvalidElementException() {
	this.name = 'InvalidElementException';
	this.message = 'Not supported type to render on';
}
InvalidElementException.prototype = Error.prototype;

function NoElementException() {
	this.name = 'NoElementException';
	this.message = 'No element to render on.';
}
NoElementException.prototype = Error.prototype;

export { InvalidInputException, InvalidElementException, NoElementException };

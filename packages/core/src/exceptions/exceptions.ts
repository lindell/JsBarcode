class InvalidInputException extends Error {
	public input: string;

	constructor(input: string) {
		super(`"${input}" is not a valid input`);
		this.name = 'InvalidInputException';
		this.input = input;
	}
}

class InvalidElementException extends Error {
	constructor() {
		super('Not supported type to render on');
		this.name = 'InvalidElementException';
	}
}

class NoElementException extends Error {
	constructor() {
		super('No element to render on.');
		this.name = 'NoElementException';
	}
}

export { InvalidInputException, InvalidElementException, NoElementException };

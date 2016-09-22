class Barcode{
	constructor(data, options){
		this.data = data;
		options.text = this.text = options.text || data;
		this.options = options;
	}
}

export default Barcode;

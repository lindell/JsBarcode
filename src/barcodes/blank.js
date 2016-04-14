class blank{
	constructor(string){
		this.size = parseInt(string, 10);
	}

	encode(){
    var binary = "";
    for(var i=0;i<this.size;i++){
      binary += "0";
    }
		return {
			data: binary,
			text: ""
		};
	}

	valid(){
		return this.size > 0;
	}
}

export {blank};

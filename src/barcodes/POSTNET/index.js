class POSTNET{
  constructor(string){
    this.string = string;
  }

  encode(){
    return {
      data: recursiveEncoding(this.number.toString(2),true).substr(2),
      text: this.number + ""
    };
  }

  valid(){
      return this.number >= 3 && this.number <= 131070;
  }
}

export default POSTNET;

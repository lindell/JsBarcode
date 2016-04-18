class pharmacode{
  constructor(string){
    this.number = parseInt(string);
  }

  encode(){
    return {
      data: recursiveEncoding(this.number.toString(2), true).substr(2),
      text: this.number + ""
    };
  }

  valid(){
      return this.number >= 3 && this.number <= 131070;
  }
}

function recursiveEncoding(code, state){
  // TODO explanation needed

  //End condition
  if(code.length === 0){
    return "";
  }

  var generated;
  var nextState = false;
  var nzeroes = zeroes(code);
  if(nzeroes === 0){
    generated = state ? "001" : "00111";
    nextState = state;
  }
  else{
    generated = repeatString("001", nzeroes - (state ? 1 : 0));
    generated += "00111";
  }
  return recursiveEncoding(code.substr(0, code.length - nzeroes - 1), nextState) + generated;
}

function repeatString(string, num){
  return new Array( num + 1 ).join( string );
}

//A help function to calculate the zeroes at the end of a string (the code)
function zeroes(code){
    var i = code.length - 1;
    var zeroes = 0;
    while(code[i] == "0" || i < 0){
        zeroes++;
        i--;
    }
    return zeroes;
}

export default pharmacode;

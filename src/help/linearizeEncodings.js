export default linearizeEncodings;

function linearizeEncodings(encodings){
  var linearEncodings = [];
  function nextLevel(encoded){
  	if(Array.isArray(encoded)){
  		for(let i = 0; i < encoded.length; i++){
  			nextLevel(encoded[i]);
  		}
  	}
  	else{
  		encoded.text = encoded.text || "";
  		encoded.data = encoded.data || "";
  		linearEncodings.push(encoded);
  	}
  }
  nextLevel(encodings);

  return linearEncodings;
}

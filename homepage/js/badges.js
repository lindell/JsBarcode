// Get github version
githubRequest = new XMLHttpRequest();

githubRequest.onreadystatechange = function(){
  if (githubRequest.readyState === XMLHttpRequest.DONE) {
    if (githubRequest.status === 200) {
      var json = JSON.parse(githubRequest.responseText);
      var element = document.getElementById("github-tag-name");
      element.innerHTML = json["tag_name"];
    } else {
      var element = document.getElementById("github-tag-name");
      element.innerHTML = "Unknown";
    }
  }
};

githubRequest.open('GET', 'https://api.github.com/repos/lindell/JsBarcode/releases/latest', true);
githubRequest.send(null);


// Get travis build status
travisRequest = new XMLHttpRequest();

travisRequest.onreadystatechange = function(){
  if (travisRequest.readyState === XMLHttpRequest.DONE) {
    if (travisRequest.status === 200) {
      // Data gotten from server
      var json = JSON.parse(travisRequest.responseText);
      var element = document.getElementById("travis-build-status");

      var text = "";
      if(json[0]["state"] == "finished"){
        if(json[0]["result"] == 0){
          text = "Passing";
        }
        else{
          text = "Failing";
        }
      }
      else{
        text = "Ongoing"
      }

      element.innerHTML = text;
    } else {
      var element = document.getElementById("travis-build-status");
      element.innerHTML = "Unknown";
    }
  }
};

travisRequest.open('GET', 'https://api.travis-ci.org/repos/lindell/JsBarcode/builds', true);
travisRequest.send(null);

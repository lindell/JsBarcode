window.addEventListener("load", function load(event){
  updateVersion("latest");

  jsdelivrRequest = new XMLHttpRequest();

  jsdelivrRequest.onreadystatechange = function(){
    if (jsdelivrRequest.readyState === XMLHttpRequest.DONE) {
      if (jsdelivrRequest.status === 200) {
        var json = JSON.parse(jsdelivrRequest.responseText);
        var version = json[0]['lastversion'];
        updateVersion(version);
      }
    }
  };

  jsdelivrRequest.open('GET', 'https://api.jsdelivr.com/v1/jsdelivr/libraries?name=jsbarcode', true);
  jsdelivrRequest.send(null);
});

function updateVersion(version) {
  var downloadLinks = document.querySelectorAll('a.jsdelivr-download');

  downloadLinks.forEach(function(downloadLink) {
    var filename = downloadLink.getAttribute('filename');
    var path = downloadLink.getAttribute('path');
    var url = "https://cdn.jsdelivr.net/jsbarcode/" + version + path + filename;
    downloadLink.setAttribute('href', url);
  });
}

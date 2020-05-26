window.addEventListener("load", function load(event){
  updateVersion("latest");

  jsdelivrRequest = new XMLHttpRequest();

  jsdelivrRequest.onreadystatechange = function(){
    if (jsdelivrRequest.readyState === XMLHttpRequest.DONE) {
      if (jsdelivrRequest.status === 200) {
        var json = JSON.parse(jsdelivrRequest.responseText);
        var version = json['tags']['latest'];
        updateVersion(version);
      }
    }
  };

  jsdelivrRequest.open('GET', 'https://data.jsdelivr.com/v1/package/npm/jsbarcode', true);
  jsdelivrRequest.send(null);
});

function updateVersion(version) {
  var downloadLinks = document.querySelectorAll('a.jsdelivr-download');

  downloadLinks.forEach(function(downloadLink) {
    var filename = downloadLink.getAttribute('filename');
    var path = downloadLink.getAttribute('path');
    var url = "https://cdn.jsdelivr.net/npm/jsbarcode@"+ version + "/dist" + path + filename;
    downloadLink.setAttribute('href', url);
  });
}

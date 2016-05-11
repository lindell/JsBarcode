import optionsFromStrings from "./optionsFromStrings.js";

function getOptionsFromElement(element, defaults){
  var options = {};
  for(var property in defaults){
    // jsbarcode-*
    if(element.hasAttribute("jsbarcode-" + property.toLowerCase())){
      options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
    }

    // data-*
    if(element.hasAttribute("data-" + property.toLowerCase())){
      options[property] = element.getAttribute("data-" + property.toLowerCase());
    }
  }

  options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

  // Since all atributes are string they need to be converted to integers
  options = optionsFromStrings(options);

  return options;
}

export default getOptionsFromElement;

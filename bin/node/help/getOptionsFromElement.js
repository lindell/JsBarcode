"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _optionsFromStrings = require("./optionsFromStrings.js");

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionsFromElement(element, defaults) {
  var options = {};
  for (var property in defaults) {
    // jsbarcode-*
    if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
      options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
    }

    // data-*
    if (element.hasAttribute("data-" + property.toLowerCase())) {
      options[property] = element.getAttribute("data-" + property.toLowerCase());
    }
  }

  options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

  // Since all atributes are string they need to be converted to integers
  options = (0, _optionsFromStrings2.default)(options);

  return options;
}

exports.default = getOptionsFromElement;
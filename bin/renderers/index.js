'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRendererClass = undefined;

var _canvas = require('./canvas.js');

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = require('./svg.js');

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRendererClass(name) {
	switch (name) {
		case "canvas":
			return _canvas2.default;
		case "svg":
			return _svg2.default;
		default:
			throw new Error("Invalid rederer");
	}
}

exports.getRendererClass = getRendererClass;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('./canvas.js');

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = require('./svg.js');

var _svg2 = _interopRequireDefault(_svg);

var _object = require('./object.js');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint no-console: 0 */

var ErrorHandler = function () {
	function ErrorHandler(api) {
		_classCallCheck(this, ErrorHandler);

		this.api = api;
	}

	ErrorHandler.prototype.handleCatch = function handleCatch(e) {
		// If babel supported extending of Error in a correct way instanceof would be used here
		if (e.name === "InvalidInputException") {
			if (this.api._options.valid !== this.api._defaults.valid) {
				this.api._options.valid(false);
			} else {
				throw e.message;
			}
		} else {
			throw e;
		}

		this.api.render = function () {};
	};

	ErrorHandler.prototype.wrapBarcodeCall = function wrapBarcodeCall(func) {
		try {
			var result = func.apply(undefined, arguments);
			this.api._options.valid(true);
			return result;
		} catch (e) {
			this.handleCatch(e);

			return this.api;
		}
	};

	return ErrorHandler;
}();

exports.default = ErrorHandler;
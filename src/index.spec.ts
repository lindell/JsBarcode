const assert = require('assert');
import jsbarcode from '.';
import { CODE128 } from './barcodes/CODE128';
import code39 from './barcodes/CODE39';
import canvasRenderer from './renderers/canvas';

const { createCanvas } = require('canvas');

describe('node-canvas generation', function () {
	it('should generate normal canvas', function () {
		var canvas = createCanvas();
		jsbarcode(canvas, 'Hello', {
			encoder: CODE128(),
			renderer: canvasRenderer,
		});
	});

	it('checking width', function () {
		var canvas1 = createCanvas();
		var canvas2 = createCanvas();

		jsbarcode(canvas1, 'HELLO', { encoder: CODE128(), renderer: canvasRenderer });
		jsbarcode(canvas2, 'HELLO', { encoder: code39(), renderer: canvasRenderer });

		assert.notEqual(canvas1.width, canvas2.width);
	});
});

import CanvasRenderer from './canvas.js';
import SVGRenderer from './svg.js';

function getRendererClass(name){
	switch (name) {
		case "canvas":
			return CanvasRenderer;
		case "svg":
			return SVGRenderer;
		default:
			throw new Error("Invalid rederer");
	}
}

export {getRendererClass};

"use strict";

// Resources
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
// Utils
import * as input from "./input.js";
import Camera from "./camera.js";
import Transform from "./transform.js";
import Renderable from "./renderable.js";
// Local to this file
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";


function init(htmlCanvasId) {
	glSys.init(htmlCanvasId);
	vertexBuffer.init();
	shaderResources.init();
	input.init();
}

function clearCanvas(color) {
	let gl = glSys.getGL();
	gl.clearColor(color[0], color[1], color[2], color[3]);
	gl.clear(gl.COLOR_BUFFER_BIT);	
}

export default { 
	text, xml, // Resource support
	input,     // Input support
	Camera, Renderable, Transform,
	init, clearCanvas
}
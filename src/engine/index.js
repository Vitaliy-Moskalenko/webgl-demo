"use strict";

// Utils
import Camera from "./camera";
import Transform from "./transform.js";
import Renderable from "./renderable.js";

import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";


function init(htmlCanvasId) {
	glSys.init(htmlCanvasId);
	vertexBuffer.init();
	shaderResources.init();
}

function clearCanvas(color) {
	var gl = glSys.getGL();
	gl.clearColor(color[0], color[1], color[2], color[3]);
	gl.clear(gl.COLOR_BUFFER_BIT);	
}

export default { Camera, Renderable, Transform, init, clearCanvas }
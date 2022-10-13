"use strict";

// Resources
import * as audio from "./resources/audio.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import * as texture from "./resources/texture.js";
// Utils
import * as input from "./input.js";
import Scene from "./scene.js";
import Camera from "./camera.js";
import Transform from "./transform.js";
// Renderables
import Renderable from "./renderables/renderable.js";
import TextureRenderable from "./renderables/texture_renderable.js";
// Local to this file
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import * as loop from "./core/loop.js";


function init(htmlCanvasId) {
	glSys.init(htmlCanvasId);
	vertexBuffer.init();
	shaderResources.init();
	input.init();
	audio.init();
}

function cleanUp() {
	loop.cleanUp();
	audio.cleanUp();
	input.cleanUp();
	shaderResources.cleanUp();
	vertexBuffer.cleanUp();
	glSys.cleanUp();
}

function clearCanvas(color) {
	let gl = glSys.getGL();
	gl.clearColor(color[0], color[1], color[2], color[3]);
	gl.clear(gl.COLOR_BUFFER_BIT);	
}

export default { 
	audio, text, xml, texture, // Resource support
	input,                     // Input support
	Camera, Scene, Renderable, TextureRenderable, Transform,
	init, cleanUp, clearCanvas
}
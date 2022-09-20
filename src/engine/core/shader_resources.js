"use strict";

import SimpleShader from "../simple_shader.js";

let simpleVS = "src/shaders/simple_vs.glsl";
let simpleFS = "src/shaders/simple_fs.glsl";

let mConstColorShader = null;

function createShaders() {
	mConstColorShader = new SimpleShader(simpleVS, simpleFS);
}

function init() {
	createShaders();
}

function getConstColorShader() {
	return mConstColorShader;
}

export { init, getConstColorShader }
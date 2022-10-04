"use strict";

import SimpleShader from "../simple_shader.js";
import * as text from "../resources/text.js";
import * as map from "./resource_map.js";

let simpleVS = "src/shaders/simple_vs.glsl";
let simpleFS = "src/shaders/simple_fs.glsl";

let mConstColorShader = null;

function createShaders() {
	mConstColorShader = new SimpleShader(simpleVS, simpleFS);
}

function init() {  console.log("Shader_res_init");
	var loadPromise = new Promise(
		async function(resolve) {
			await Promise.all([
				text.load(simpleVS),
				text.load(simpleFS)
			]);
			resolve();
		})
		.then (
			function resolve() { createShaders(); }
		);

	map.pushPromise(loadPromise);
}

function getConstColorShader() {
	return mConstColorShader;
}

export { init, getConstColorShader }
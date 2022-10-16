"use strict";

import SimpleShader from "../shaders/simple_shader.js";
import TextureShader from "../shaders/texture_shader.js";
import SpriteShader from "../shaders/sprite_shader.js";
import * as text from "../resources/text.js";
import * as map from "./resource_map.js";

// Simple shader
var simpleVS = "src/shaders/simple_vs.glsl";
var simpleFS = "src/shaders/simple_fs.glsl";
var mConstColorShader = null;

// Texture shader
var textureVS = "src/shaders/texture_vs.glsl";
var textureFS = "src/shaders/texture_fs.glsl";
var mTextureShader = null;
var mSpriteShader = null;

function createShaders() {
	mConstColorShader = new SimpleShader(simpleVS, simpleFS);
	mTextureShader    = new TextureShader(textureVS, textureFS);
	mSpriteShader     = new SpriteShader(textureVS, textureFS);
}

function init() { 
	var loadPromise = new Promise(
		async function(resolve) {
			await Promise.all([
				text.load(simpleVS),
				text.load(simpleFS),
				text.load(textureVS),
				text.load(textureFS)
			]);
			resolve();
		})
		.then (
			function resolve() { createShaders(); }
		);

	map.pushPromise(loadPromise);
}

function getConstColorShader() { return mConstColorShader; }
function getTextureShader() { return mTextureShader; }
function getSpriteShader() { return mSpriteShader; }

function cleanUp() {
	mConstColorShader.cleanUp();
	mTextureShader.cleanUp();
	mSpriteShader.cleanUp();

	text.unload(simpleVS);
	text.unload(simpleFS);
	text.unload(textureVS);
	text.unload(textureFS);
}

export {
	init, cleanUp,
	getConstColorShader, getTextureShader, getSpriteShader
}
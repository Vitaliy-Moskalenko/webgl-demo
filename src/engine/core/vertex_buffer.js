"use strict";

import * as glSys from "./gl.js";

var mVertexBuffer = null;
var mTextureCoordBuffer = null;

var vertices = [
     0.5,  0.5, 0.0,
    -0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

var textureCoordinates = [
    1.0, 1.0, 
    0.0, 1.0, 
    1.0, 0.0, 
    0.0, 0.0
];

function init() {
	let gl = glSys.getGL();
	
	mVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    mTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

}

function get() { return mVertexBuffer; }

function getTextCoord() { return mTextureCoordBuffer; }

function cleanUp() {
    var gl = glSys.getGL();
    if(mVertexBuffer !== null) {
        gl.deleteBuffer(mVertexBuffer);
        mVertexBuffer = null;
    }

    if(mTextureCoordBuffer !== null) {
        gl.deleteBuffer(mTextureCoordBuffer);
        mTextureCoordBuffer = null;
    }
}

export { init, get, getTextCoord, cleanUp }
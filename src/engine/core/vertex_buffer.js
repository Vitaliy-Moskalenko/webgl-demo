"use strict";

import * as glSys from "./gl.js";

let mVertexBuffer = null;

function get() { return mVertexBuffer; }

let vertices = [
     0.5,  0.5, 0.0,
    -0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

function init() {
	let gl = glSys.getGL();
	
	mVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function cleanUp() {
    if(mVertexBuffer !== null) {
        glSys.getGL().deleteBuffer(mVertexBuffer);
        mVertexBuffer = null;
    }
}

export { init, get, cleanUp }
"use strict";

import * as glSys from "../core/gl.js";
import * as shaderResources from "../core/shader_resources.js";
import Transform from "../transform.js";


class Renderable {
	constructor() {
		this.mShader = shaderResources.getConstColorShader();
		this.mColor  = [1, 1, 1, 1];
		this.mXform  = new Transform();
	}
	
	draw(camera) {   
		var gl = glSys.getGL();  
		this.mShader.activate(this.mColor, this.mXform.getTRSMatrix(), camera.getCameraMatrix());
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	
	getXform() { return this.mXform; }

	setColor(color) { this.mColor = color; }	
	getColor() { return this.mColor; }	

	_setShader(s) { this.mShader = s; }
}

export default Renderable;
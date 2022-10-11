"use strict";

import * as glSys from "../core/gl.js";
import * as vertexBuffer from "../core/vertex_buffer.js";
import * as text from "../resources/text.js";

class SimpleShader {
	
	constructor(vertexShaderPath, fragmentShaderPath) {
		this.mCompiledShader    = null; // ref to the compiled shader in webgl context
		this.mVertexPositionRef = null; // ref to vertex position in v-shader
		this.mPixelColorRef     = null; // ref to pixelColor uniform in f-shadr
		this.mModelMatrixRef    = null; // ref to model transform matrix in v-shader
		this.mCameraMatrixRef   = null; // ref to View/Projection matrix in the vertex shader
		
		let gl = glSys.getGL();
		
		this.mVertexShader   = _compileShader(vertexShaderPath, gl.VERTEX_SHADER);
		this.mFragmentShader = _compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);
		
		this.mCompiledShader = gl.createProgram();
		gl.attachShader(this.mCompiledShader, this.mVertexShader);
		gl.attachShader(this.mCompiledShader, this.mFragmentShader);
		gl.linkProgram(this.mCompiledShader);
		
		if(!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
			throw new Error("Shader linking error!");
			return null;
		}
		
		this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");		
		this.mPixelColorRef     = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
		this.mModelMatrixRef    = gl.getUniformLocation(this.mCompiledShader, "uModelXformMatrix");
		this.mCameraMatrixRef   = gl.getUniformLocation(this.mCompiledShader, "uCameraXformMatrix");
	}
	
	activate(pixelColor, trsMatrix, cameraMatrix) {
		let gl = glSys.getGL();
		
		gl.useProgram(this.mCompiledShader);
		
		// bind vertex buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
		gl.vertexAttribPointer(this.mVertexPositionRef, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.mVertexPositionRef);

		// load uniforms
		gl.uniform4fv(this.mPixelColorRef, pixelColor);
		gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
		gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
	}

	cleanUp() {
		var gl = glSys.getGL();
		gl.detachShader(this.mCompiledShader, this.mVertexShader);
		gl.detachShader(this.mCompiledShader, this.mFragmentShader);
		gl.deleteShader(this.mVertexShader);
		gl.deleteShader(this.mFragmentShader);
		gl.deleteProgram(this.mCompiledShader);
	}
}

/**************************************************
/* Private methods. Not visible outside this file *
**************************************************/

// Return compiled shader to the DOM. The id is id of the shader source script.
function _compileShader(filePath, shaderType) {
	var shaderSrc = null, compiledShader = null;
	let gl = glSys.getGL();
	
	shaderSrc = text.get(filePath);
	if(shaderSrc === null) {
		throw new Error("WARNING: " + filePath + " loading failed");
		return null;
	}

	/* Sync old-styled request 	
	var xmlReq = new XMLHttpRequest();
	xmlReq.open('GET', filePath, false);
	try { xmlReq.send(); }
	catch(err) {
		throw new Error("Failed to load shader file: " + filePath);
		return null;
	}
	
	shaderSrc = xmlReq.responseText;
    if (shaderSrc === null) {
        throw new Error("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }	*/
	
	compiledShader = gl.createShader(shaderType);
	
	gl.shaderSource(compiledShader, shaderSrc);
	gl.compileShader(compiledShader);
	
	if(!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
		throw new Error("Shader compiling error: " + gl.getShaderInfoLog(compiledShader));			
	}

	return compiledShader;	
}

export default SimpleShader;
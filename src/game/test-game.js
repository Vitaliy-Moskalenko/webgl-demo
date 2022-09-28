"use strict";

// const { vec2, vec3, mat4 } = glMatrix;

import * as glSys from "../engine/core/gl.js";

import engine from "../engine/index.js"


class TestGame {
	constructor(htmlCanvasId) {
		engine.init(htmlCanvasId);
		
		this.mBlueSquare = new engine.Renderable();
		this.mBlueSquare.setColor([0.25, 0.25, 1, 1]);

		this.mRedSquare = new engine.Renderable();
		this.mRedSquare.setColor([1, 0.25, 0.25, 1]);
		
		this.mTLSq = new engine.Renderable();
		this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);

		this.mTRSq = new engine.Renderable();
		this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);

		this.mBLSq = new engine.Renderable();
		this.mBLSq.setColor([0.1, 0.1, 0.9, 1]);

		this.mBRSq = new engine.Renderable();
		this.mBRSq.setColor([0.1, 0.1, 0.1, 1]);     
		
		engine.clearCanvas([0.9, 0.9, 0.9, 1]); // Clear the entire canvas first
		
		var gl = glSys.getGL();

		gl.viewport(20, 40, 600, 300);  // Set up the viewport: canvas area to be drawn, x,y position of lower-left corner of draw area 
		gl.scissor(20, 40, 600, 300);   // Set up corresponding scissor(clip) area to limit crear surface
		gl.enable(gl.SCISSOR_TEST);     // Enable the clip area, clear and then disable
		engine.clearCanvas([0.7, 0.7, 0.7, 1.0]);
		gl.disable(gl.SCISSOR_TEST);

		// Set up camera transform matrix, assume camera position and dimensions
		var cameraCenter = vec2.fromValues(20, 60); 
		var wcSize       = vec2.fromValues(20, 10);
		var cameraMatrix = mat4.create();
		// Scale to (-1, -1) to (1, 1) - 2x2 square at origin
		mat4.scale(cameraMatrix, mat4.create(), vec3.fromValues(2.0 / wcSize[0], 2.0 / wcSize[1], 1.0));
		// Translate camera center to origin
		mat4.translate(cameraMatrix, cameraMatrix, vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 0));  console.log('Start to draw');

		// Blue square
		this.mBlueSquare.getXform().setPosition(20, 60);
		this.mBlueSquare.getXform().setRotationRad(0.2);
		this.mBlueSquare.getXform().setSize(5.5);
		this.mBlueSquare.draw(cameraMatrix);

		// Red square
		this.mRedSquare.getXform().setPosition(15, 55);
		this.mRedSquare.getXform().setSize(2, 2);
		this.mRedSquare.draw(cameraMatrix);

		// Top left
		this.mTLSq.getXform().setPosition(10, 65);
		this.mTLSq.draw(cameraMatrix);

		// Top right
		this.mTRSq.getXform().setPosition(30, 65);
		this.mTRSq.draw(cameraMatrix);

		// Bottom left
		this.mBLSq.getXform().setPosition(10, 55);
		this.mBLSq.draw(cameraMatrix);

		// Bottom right
		this.mBRSq.getXform().setPosition(30, 55);
		this.mBRSq.draw(cameraMatrix);


		/* var trsMatrix = mat4.create(); // create new identity transform operator
		mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0.0));
		mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
		mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));
		this.mWhiteSquare.draw(trsMatrix);
		
		mat4.identity(trsMatrix); // Reset matrix to identity
		mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
		mat4.rotateZ(trsMatrix, trsMatrix, -0.765);
		mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));
		this.mBlueSquare.draw(trsMatrix); */		
	}	
}

window.onload = function() {
	new TestGame('GlCanvas');
}


/* Old 2 squres drawing no transform stuff
	this.mWhiteSquare.draw();
	this.mRedSquare.draw();  */

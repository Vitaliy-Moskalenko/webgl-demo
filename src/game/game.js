"use strict";

import engine from "../engine/index.js"

const { vec2, vec3, mat4 } = glMatrix;

class Game {
	constructor(htmlCanvasId) {
		engine.init(htmlCanvasId);
		
		this.mWhiteSquare = new engine.Renderable();
		this.mWhiteSquare.setColor([1, 1, 1, 1]);
		
		this.mBlueSquare = new engine.Renderable();
		this.mBlueSquare.setColor([0, 0, 1, 1]);		
		
		engine.clearCanvas([0, 0.8, 0, 0.9]);		
		
		var trsMatrix = mat4.create(); // create new identity transform operator
		
		// Transform
		mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0.0));
		mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
		mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));
		// Draw
		this.mWhiteSquare.draw(trsMatrix);
		
		mat4.identity(trsMatrix); // Reset matrix to identity
		
		// Transform
		mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
		mat4.rotateZ(trsMatrix, trsMatrix, -0.765);
		mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));
		// Draw
		this.mBlueSquare.draw(trsMatrix);		
	}	
}

window.onload = function() {
	new Game('GlCanvas');
}


/* Old 2 squres drawing no transform stuff
	this.mWhiteSquare.draw();
	this.mRedSquare.draw();  */

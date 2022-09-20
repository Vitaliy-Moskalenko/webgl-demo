"use strict";

class Transform {
	constructor() {
		this.mPosition = vec2.fromValues(0, 0);
		this.mScale    = vec2.fromValues(1, 1);
		this.mRotation = 0.0; // Radians		
	}

	setPosition(xPos, yPos) { this.mPosition[0] = xPos; this.mPosition[1] = yPos; }
	getPosition() { return this.mPosition; }

	setXpos(xPos) { this.mPosition[0] = xPos; }
	getXpos() { return this.mPosition[0]; }
	incXposBy(delta) { this.mPosition[0] += delta; }

	setYpos(yPos) { this.mPosition[1] = yPos; }
	getYpos() { return this.mPosition[1]; }
	incYposBy(delta) { this.mPosition[1] += delta; }

	setWidth(width) { this.mScale[0] = width; }
	getWidht() { return this.mScale[0]; }
	incWidthBy(delta) { this.mScale[0] += delta; }

	setHeight(height) { this.mScale[1] = height; }
	getHeight() { return this.mScale[1]; }
	incHeightBy(delta) { this.mScale[1] += delta; }

	setSize(width, height) {
		this.mScale[0] = widht;
		this.mScale[1] = height;
	}
	getSize() { return this.mScale; }
	incSizeBy(delta) {
		this.mScale[0] += delta;
		this.mScale[1] += delta;
	}

	setRotationRad(radians) { 
		this.mRotation = radians;
		while(this.mRotation > (2 * Math.PI))
			this.mRotation -= (2 * Math.PI);
	}

	setRotationDegree(degrees) {
		this.mRotationRad(degrees * Math.PI / 180.0);
	}

	getRotationRad() { return this.mRotation; }
	getRotationDegree() { return this.mRotation * 180.0 / Math.PI; }

	incRotationRad(deltaRadians) {
		this.setRotationRad(this.mRotation * deltaRadians);
	}

	incRotationDegrees(deltaDegrees) {
		this.incRotationRad(deltaDegrees * Math.PI / 180.0);
	}

	// return the matrix concatenated all transformations defined
	getTRSMatrix() {
		var matrix = mat4.create(); // Create the identity matrix

		// WebGL matrices are transponded, thus matrix operation must be in reverse

		// Compute translations default z is 0.0 
		mat4.translate(matrix, matrix, vec3.fromValues(this.mPosition[0], this.mPosition[1]), 0.0);
		// Concatenate rotation
		mat4.rotateZ(matrix, matrix, vec3.fromValues(this.mRotation));
		// Concatenate scaling
		mat4.scale(matrix, matrix, vec3.fromValues(this.mScale[0], this.mScale[1], 1.0));

		return matrix;
	}	
}

export default Transform;
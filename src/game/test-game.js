"use strict";

// Accessing engine internal is not very cool, this must be resolved
import * as loop from "../engine/core/loop.js";
import engine from "../engine/index.js"


class Game {
	constructor() {
		this.mWhiteSq = null;
		this.mRedSq   = null;

		this.mCamera = null;
	}

	init() {
		this.mCamera = new engine.Camera(
			vec2.fromValues(20, 60), 20, [20, 40, 600, 300]
		);
		this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

		this.mWhiteSq = new engine.Renderable();
		this.mWhiteSq.setColor([1, 1, 1, 1]);

		this.mWhiteSq.getXform().setPosition(20, 60);
		this.mWhiteSq.getXform().setRotationRad(0.4);
		this.mWhiteSq.getXform().setSize(6, 6);

		this.mRedSq = new engine.Renderable();
		this.mRedSq.setColor([1, 0, 0, 1]);

		this.mRedSq.getXform().setPosition(25, 55);
		this.mRedSq.getXform().setSize(2, 2);
	}

	draw() {
		engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
		this.mCamera.setViewAndCameraMatrix();
		this.mWhiteSq.draw(this.mCamera);
		this.mRedSq.draw(this.mCamera);
	}

	update() {
		// Move the white square and pulse red
		var dX = 0.05;

		var whiteXform = this.mWhiteSq.getXform();

		if(whiteXform.getXpos() > 30)
			whiteXform.setPosition(10, 60);
		whiteXform.incXposBy(dX);
		whiteXform.incRotationDegrees(3);

		var redXform = this.mRedSq.getXform();
		if(redXform.getWidth() > 5)
			redXform.setSize(2, 2);
		redXform.incSizeBy(0.05);
	}
}

window.onload = function() {
	engine.init("GlCanvas");
	var game = new Game();
	loop.start(game);
}
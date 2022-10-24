"use strict";

import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";


class Game extends engine.Scene {
	// Scene resource async loading requests perform in loop.start - (SceneObj).load call.
	// Unload and clear funcs calls live in Abstract Scene super-class.
	constructor() {
		super();

		this.fontImg      = "assets/consolas-72.png";
		this.minionSprite = "assets/minion_sprite.png";
		// this.robo          = "assets/minion_portal.png";
		// this.roboCollector = "assets/minion_collector.png";

		this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
		this.mCue = "assets/sounds/game_cue.wav";

		this.mCamera = null;

		this.mHero = null;
		this.mRobo = null;
		this.mRoboCollector = null;
		this.mSupportObject = null;
		this.mFontImg = null;
		this.mMinion = null;
	}

	init() {
		this.mCamera = new engine.Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
		this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

		this.mHero = new engine.SpriteRenderable(this.minionSprite);
		this.mHero.setColor([1, 1, 1, 0]);
		this.mHero.getXform().setPosition(20, 60);
		this.mHero.getXform().setSize(2, 3);
		this.mHero.setElementPixelPosition(0, 120, 0, 180);

		this.mRobo = new engine.SpriteRenderable(this.minionSprite);
		this.mRobo.setColor([1, 0, 0, 0.2]); // tints red
		this.mRobo.getXform().setPosition(25, 60);
		this.mRobo.getXform().setSize(3, 3);
		this.mRobo.setElementPixelPosition(0, 204, 356, 560);

		this.mRoboCollector = new engine.SpriteRenderable(this.minionSprite);
		this.mRoboCollector.setColor([0, 0, 0, 0]);
		this.mRoboCollector.getXform().setPosition(15, 60);
		this.mRoboCollector.getXform().setSize(3, 3);
		this.mRoboCollector.setElementUVCoordinate(0.308, 0.483, 0, 0.352);

		this.mMinion = new engine.SpriteRenderable(this.minionSprite);
		this.mMinion.setColor([1, 1, 1, 0]);
		this.mMinion.getXform().setPosition(21, 60);
		this.mMinion.getXform().setSize(3, 3);
		this.mMinion.setElementPixelPosition(130, 310, 0, 180);

		this.mFontImg = new engine.SpriteRenderable(this.fontImg);
		this.mFontImg.setColor([1, 1, 1, 0]);
		this.mFontImg.getXform().setPosition(13, 62);
		this.mFontImg.getXform().setSize(4, 4);

		// engine.audio.playBackground(this.mBackgroundAudio, 1.0);
	}

	load() {
		engine.texture.load(this.fontImg);
		engine.texture.load(this.minionSprite);

		engine.audio.load(this.mBackgroundAudio);
		engine.audio.load(this.mCue);
	}

	unload() {
		engine.texture.unload(this.fontImg);
		engine.texture.unload(this.minionSprite);

		engine.audio.stopBackground();
		engine.audio.unload(this.mBackgroundAudio);
		engine.audio.unload(this.mCue);
	}

	draw() {
		engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
		this.mCamera.setViewAndCameraMatrix();

		this.mRobo.draw(this.mCamera);
		this.mRoboCollector.draw(this.mCamera);
		this.mMinion.draw(this.mCamera);
		this.mFontImg.draw(this.mCamera);
		this.mHero.draw(this.mCamera);
	}

	update() {
		var dX = 0.075;
		var xForm = this.mHero.getXform();
		var xFormRobo = this.mRobo.getXform();
		var xFormRoboCollector = this.mRoboCollector.getXform();

		// Hero movements
		if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
			engine.audio.playCue(this.mCue, 0.5);
			// engine.audio.incBackgroundVolume(0.05);
			// debug: engine.audio.getMap().showRefCounter(this.mCue);
			xForm.incXposBy(dX);
			if(xForm.getXpos() > 30)
				xForm.setPosition(12, 60);
		}

		if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
			engine.audio.playCue(this.mCue, 1.5);
			// engine.audio.incBackgroundVolume(-0.05);
			xForm.incXposBy(-dX);
			if(xForm.getXpos() < 11)
				xForm.setPosition(20);      // this.next();
		}

		var c = this.mRobo.getColor(); // Continuously change texture tinting
		var ca = c[3] + dX;
		if(ca > 1) ca = 0;
		c[3] = ca;

		// New update code for changing sub-texture regions being shown
		var dT = 0.001;

		// Font image
		// For font: zoom to upper left corner by changing bottom-right
		var texCoord = this.mFontImg.getElementUVCoordinateArray();

		// console.log( texCoord[engine.eTexCoordArrayIndex.eBottom + dT );

		//      mTexRight,  mTexTop,          // x,y of top-right
		//      mTexLeft,   mTexTop,
		//      mTexRight,  mTexBottom,
		//      mTexLeft,   mTexBottom
		var b = texCoord[engine.eTexCoordArrayIndex.eBottom] + dT;
		var r = texCoord[engine.eTexCoordArrayIndex.eRight] - dT;

		if(b > 1.0) b = 0;
		if(r < 0)   r = 1.0;



		this.mFontImg.setElementUVCoordinate(texCoord[engine.eTexCoordArrayIndex.eLeft],
			r, b, texCoord[engine.eTexCoordArrayIndex.eTop]);

		// Minion Image
		// For minion: zoom to bottom-right corner by changing top-left
		texCoord = this.mMinion.getElementUVCoordinateArray();
		//      mTexRight,  mTexTop,          // x,y of top-right
		//      mTexLeft,   mTexTop,
		//      mTexRight,  mTexBottom,
		//      mTexLeft,   mTexBottom
		var t = texCoord[engine.eTexCoordArrayIndex.eTop] - dT;
		var l = texCoord[engine.eTexCoordArrayIndex.eLeft] + dT;

		if(l > 0.5) l = 0;
		if(t < 0.5) t = 1.0;

		// this.mMinion.setElementUVCoordinate(l, texCoord[engine.eTexCoordArrayIndex.eRight],
		//    texCoord[engine.eTexCoordArrayIndex.eBottom], t);

		if(engine.input.isKeyPressed(engine.input.keys.Q))
			this.stop();
	}

	next() {
		super.next();

		var nextLevel = new BlueLevel();
		nextLevel.start();
	}
}

export default Game;

window.onload = function() {
	engine.init("GlCanvas");
	var game = new Game();

	game.start(game);
}
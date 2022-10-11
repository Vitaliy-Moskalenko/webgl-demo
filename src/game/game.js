"use strict";

import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";


class Game extends engine.Scene {
    // Scene resource async loading requests perform in loop.start - (SceneObj).load call.
    // Unload and clear funcs calls live in Abstract Scene super-class.
    constructor() {
        super();

        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/game_cue.wav";

        this.mCamera = null;

        this.mHero = null;
        this.mSupportObject = null;
    }    

    init() { 
        this.mCamera = new engine.Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mSupportObject = new engine.Renderable();
        this.mSupportObject.setColor([0.8, 0.2, 0.8, 1]);
        this.mSupportObject.getXform().setPosition(20, 60);
        this.mSupportObject.getXform().setSize(5, 5);

        this.mHero = new engine.Renderable();
        this.mHero.setColor([0, 0, 1, 1]);
        this.mHero.getXform().setPosition(20, 60);
        this.mHero.getXform().setSize(2, 3);

        // engine.audio.playBackground(this.mBackgroundAudio, 1.0);
    }

    load() {
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);        
    }

    unload() {
        engine.audio.stopBackground();

        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        this.mSupportObject.draw(this.mCamera);
        this.mHero.draw(this.mCamera);

        /* for(var i=0; i<this.mSquareSet.length; ++i)
            this.mSquareSet[i].draw(this.mCamera); */
    }

    update() {
        var dX = 0.075;
        var xForm = this.mHero.getXform();

        if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
            engine.audio.playCue(this.mCue, 0.5);
            engine.audio.incBackgroundVolume(0.05);

            // debug: engine.audio.getMap().showRefCounter(this.mCue);

            xForm.incXposBy(dX);
            if(xForm.getXpos() > 30) 
                xForm.setPosition(12, 60);                
        }

        if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
            engine.audio.playCue(this.mCue, 1.5);
            engine.audio.incBackgroundVolume(-0.05);

            xForm.incXposBy(-dX);
            if(xForm.getXpos() < 11)
                this.next();
        }        

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
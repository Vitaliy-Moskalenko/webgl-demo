"use strict";

import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";


class Game extends engine.Scene {
    // Scene resource async loading requests perform in loop.start - (SceneObj).load call.
    // Unload and clear funcs calls live in Abstract Scene super-class.
    constructor() {
        super();

        this.robo          = "assets/minion_portal.png";
        this.roboCollector = "assets/minion_collector.png";

        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/game_cue.wav";

        this.mCamera = null;

        this.mHero = null;
        this.mRobo = null;
        this.mRoboCollector = null;
        this.mSupportObject = null;
    }    

    init() { 
        this.mCamera = new engine.Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mRobo = new engine.TextureRenderable(this.robo);
        this.mRobo.setColor([1, 0, 0, 0.2]); // Tints red
        this.mRobo.getXform().setPosition(25, 60);
        this.mRobo.getXform().setSize(3, 3);

        this.mRoboCollector = new engine.TextureRenderable(this.roboCollector);
        this.mRoboCollector.setColor([0, 0, 0, 0]); // No tinting
        this.mRoboCollector.getXform().setPosition(15, 60);
        this.mRoboCollector.getXform().setSize(2, 3);

        this.mSupportObject = new engine.Renderable();
        this.mSupportObject.setColor([0.8, 0.2, 0.8, 1]);
        this.mSupportObject.getXform().setPosition(20, 60);
        this.mSupportObject.getXform().setSize(5, 5);

        this.mHero = new engine.Renderable();
        this.mHero.setColor([0, 0, 1, 1]);
        this.mHero.getXform().setPosition(20, 60);
        this.mHero.getXform().setSize(2, 3);

        engine.audio.playBackground(this.mBackgroundAudio, 1.0);
    }

    load() {
        engine.texture.load(this.robo);
        engine.texture.load(this.roboCollector);

        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);        
    }

    unload() {
        engine.texture.unload(this.robo);
        engine.texture.unload(this.roboCollector);

        engine.audio.stopBackground();

        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        this.mRobo.draw(this.mCamera);
        this.mRoboCollector.draw(this.mCamera);
        this.mSupportObject.draw(this.mCamera);
        this.mHero.draw(this.mCamera);

        /* for(var i=0; i<this.mSquareSet.length; ++i)
            this.mSquareSet[i].draw(this.mCamera); */
    }

    update() {
        var dX = 0.075;
        var xForm = this.mHero.getXform();
        var xFormRobo = this.mRobo.getXform();
        var xFormRoboCollector = this.mRoboCollector.getXform();

        if(engine.input.isKeyPressed(engine.input.keys.A)) {
            engine.audio.playCue(this.mCue, 0.5);
            xFormRobo.incXposBy(-dX);
            if(xFormRobo.getXpos() < 0)
                xFormRobo.setPosition(30, 60);
        }

        if(engine.input.isKeyPressed(engine.input.keys.D)) {
            engine.audio.playCue(this.mCue, 0.5);
            xFormRobo.incXposBy(dX);
            if(xFormRobo.getXpos() > 30)
                xFormRobo.setPosition(0, 60);
        }

        if(engine.input.isKeyPressed(engine.input.keys.W)) {
            engine.audio.playCue(this.mCue, 0.5);
            xFormRoboCollector.incSizeBy(0.05);
            if(xFormRoboCollector.getWidth > 5)
                xFormRoboCollector.setSize(2, 3);
        }
       
        if(engine.input.isKeyPressed(engine.input.keys.S)) {
            engine.audio.playCue(this.mCue, 0.5);
            xFormRoboCollector.decSizeBy(0.05);
            if(xFormRoboCollector.getWidth < 1)
                xFormRoboCollector.setSize(2, 3);
        }        

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

        var c = this.mRobo.getColor(); // Continuously change texture tinting
        var ca = c[3] + dX;
        if(ca > 1) ca = 0;
        c[3] = ca;

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
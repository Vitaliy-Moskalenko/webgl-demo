"use strict";

import engine from "../engine/index.js";

import DyePack from "./objects/dye_pack.js";
// import Minion from "./objects/minion.js";
import Hero from "./objects/hero.js";
import Brain from "./objects/brain.js";
import FontRenderable from "../engine/renderables/font_renderable";

class Game extends engine.Scene {
    constructor() {
        super();

        this.minionSprite = "assets/minion_sprite.png";
        this.mCamera = null;

        this.mMsg = null;

        this.mHero      = null;
        this.mBrain     = null;
        // this.mMinionSet = null;
        this.mDyePack   = null;

        // Mode of running.
        // H: Player drive brain 
        // J: Dye drive brain - immediate orientation change
        // K: Dye drive brain - gradual orientation change 
        this.mode = 'H';
    }

    load() {
        engine.texture.load(this.minionSprite);
    }

    unload() {
        engine.texture.unload(this.minionSprite);
    }

    init() {
        this.mCamera = new engine.Camera(vec2.fromValues(50, 37.5), 100, [0, 0, 640, 480]);
        this.mCamera.setBackgroundColor([1, 1, 1, 1]);

        this.mDyePack = new DyePack(this.minionSprite);
        // this.mMinionSet = new engine.GameObjectSet();
        this.mBrain = new Brain(this.minionSprite);
        this.mHero = new Hero(this.minionSprite);

        /* var i, randomX, randomY, mMinion;
        for(i=0; i<5; i++) {
            randomY = Math.random() * 65;
            randomX = Math.random() * 100;
            mMinion = new Minion(this.minionSprite, randomX, randomY);
            this.mMinionSet.addToSet(mMinion);
        } */

        this.mMsg = new FontRenderable("Status..");
        this.mMsg.setColor([0, 0, 1, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);
    }
  
    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        this.mHero.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        // this.mMinionSet.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }

    update() {
        var msg  = "Brain: [H:keys J:imm  K:grad]  ";
        var rate = 1;

        this.mHero.update();

        var heroBBox  = this.mHero.getBBox();
        var brainBBox = this.mBrain.getBBox();
        
        // this.mMinionSet.update();
        this.mDyePack.update();        

        switch(this.mode) {
            case 'H': this.mBrain.update(); break;
            case 'K': rate = 0.02;
            case 'J': 
                if(!heroBBox.intersectsBound(brainBBox)) { // Stops brain when touches hero
                    this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
                    // Defautl GameObject: only move forward
                    engine.GameObject.prototype.update.call(this.mBrain);
                }
                break; 
        }

        // Check for hero going outside 80% of WC window bound
        var status = this.mCamera.collideWCBound(this.mHero.getXform(), 0.8);

        if(engine.input.isKeyClicked(engine.input.keys.H)) this.mode = 'H';
        if(engine.input.isKeyClicked(engine.input.keys.J)) this.mode = 'J';
        if(engine.input.isKeyClicked(engine.input.keys.K)) this.mode = 'K';

        this.mMsg.setText(msg + this.mode + " [Hero.bounds=" + status + "]");
    }
}

window.onload = function() {
    engine.init("GlCanvas");

    var game = new Game();
    game.start();
}
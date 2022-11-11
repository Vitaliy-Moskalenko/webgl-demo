"use strict";

import engine from "../engine/index.js";

import DyePack from "./objects/dye_pack.js";
import Minion from "./objects/minion.js";
import Hero from "./objects/hero.js";
import FontRenderable from "../engine/renderables/font_renderable";

class Game extends engine.Scene {
    constructor() {
        super();

        this.minionSprite = "assets/minion_sprite.png";
        this.mCamera = null;

        this.mMsg = null;

        this.mHero      = null;
        this.mMinionSet = null;
        this.mDyePack   = null;
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

        this.mMinionSet = new engine.GameObjectSet();

        var i, randomX, randomY, mMinion;
        for(i=0; i<5; i++) {
            randomY = Math.random() * 65;
            randomX = Math.random() * 100;
            mMinion = new Minion(this.minionSprite, randomX, randomY);
            this.mMinionSet.addToSet(mMinion);
        }

        this.mHero = new Hero(this.minionSprite);

        this.mMsg = new FontRenderable("Status..");
        this.mMsg.setColor([0, 0, 1, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);
    }
  
    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        this.mHero.draw(this.mCamera);
        this.mMinionSet.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }

    update() {
        this.mHero.update();
        this.mMinionSet.update();
        this.mDyePack.update();        
    }
}

window.onload = function() {
    engine.init("GlCanvas");

    var game = new Game();
    game.start();
}
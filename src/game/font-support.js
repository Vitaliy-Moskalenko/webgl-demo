"use strict";

import engine from "../engine/index.js";

class Game extends engine.Scene {
    constructor() {
        super();
        this.fontImage = "assets/consolas-72.png";
        this.minionSprite = "assets/minion_sprite.png";

        this.fontCons16 = "assets/fonts/consolas-16";
        this.fontCons24 = "assets/fonts/consolas-24";
        this.fontCons32 = "assets/fonts/consolas-32";
        this.fontCons72 = "assets/fonts/consolas-72";
        this.fontSeg96  = "assets/fonts/segment7-96";

        this.mCamera = null;

        this.mHero      = null;
        this.mFontImage = null;
        this.mMinion    = null;

        this.mTextSysFont = null;
        this.mTextCons16  = null;
        this.mTextCons24  = null;
        this.mTextCons32  = null;
        this.mTextCons72  = null;
        this.mTextSeg96   = null;
        
        this.mTextToWork = null;
    }

    init() {
        this.mCamera = new engine.Camera(vec2.fromValues(50, 33), 100, [0, 0, 600, 400]);
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mFontImage = new engine.SpriteRenderable(this.fontImage);
        this.mFontImage.setColor([1, 0, 1, 0]);
        this.mFontImage.getXform().setPosition(15, 20);
        this.mFontImage.getXform().setSize(20, 20);

        this.mMinion = new engine.SpriteAnimateRenderable(this.minionSprite);
        this.mMinion.setColor([1, 1, 1, 0]);
        this.mMinion.getXform().setPosition(15, 25);
        this.mMinion.getXform().setSize(24, 19.2);
        this.mMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
        this.mMinion.setAnimationType(engine.eAnimationType.eSwing);
        this.mMinion.setAnimationSpeed(15);

        this.mHero = new engine.SpriteRenderable(this.minionSprite);
        this.mHero.setColor([1, 1, 1, 0]);
        this.mHero.getXform().setPosition(35, 50);
        this.mHero.getXform().setSize(12, 18);
        this.mHero.setElementPixelPosition(0, 120, 0, 180);

        // Create all fonts stuff
        this.mTextSysFont = new engine.FontRenderable("System Font: Red");
        this._initText(this.mTextSysFont, 50, 60, [1, 0, 0, 1], 3);

        this.mTextCons16 = new engine.FontRenderable("Consolas 16: Black");
        this.mTextCons16.setFontName(this.fontCons16);
        this._initText(this.mTextCons16, 50, 55, [0, 0, 0, 1], 2);

        this.mTextCons24 = new engine.FontRenderable("Consolas 24: Black");
        this.mTextCons16.setFontName(this.fontCons24);
        this._initText(this.mTextCons24, 50, 50, [0, 0, 0, 1], 3);

        this.mTextCons32 = new engine.FontRenderable("Consolas 32: White");
        this.mTextCons32.setFontName(this.fontCons32);
        this._initText(this.mTextCons32, 40, 40, [1, 1, 1, 1], 4);

        this.mTextCons72 = new engine.FontRenderable("Consolas 72: Blue");
        this.mTextCons72.setFontName(this.fontCons72);
        this._initText(this.mTextCons72, 30, 30, [0, 0, 1, 1], 6);

        this.mTextSeg96 = new engine.FontRenderable("Segment7-96");
        this.mTextSeg96.setFontName(this.fontSeg96);
        this._initText(this.mTextSeg96, 30, 15, [1, 1, 0, 1], 7);

        this.mTextToWork = this.mTextCons16;
    }

    _initText(font, posX, posY, color, textH) {
        font.setColor(color);
        font.getXform().setPosition(posX, posY);
        font.setTextHeight(textH);
    }    

    load() {
        engine.texture.load(this.fontImage);
        engine.texture.load(this.minionSprite);

        engine.font.load(this.fontCons16);
        engine.font.load(this.fontCons24);
        engine.font.load(this.fontCons32);
        engine.font.load(this.fontCons72);
        engine.font.load(this.fontSeg96);
    }

    unload() {
        engine.texture.unload(this.fontImage);
        engine.texture.unload(this.minionSprite);

        engine.font.unload(this.fontCons16);
        engine.font.unload(this.fontCons24);
        engine.font.unload(this.fontCons32);
        engine.font.unload(this.fontCons72);
        engine.font.unload(this.fontSeg96);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        this.mHero.draw(this.mCamera);
        this.mMinion.draw(this.mCamera);
        this.mFontImage.draw(this.mCamera);

        this.mTextSysFont.draw(this.mCamera);
        this.mTextCons16.draw(this.mCamera);
        this.mTextCons24.draw(this.mCamera);
        this.mTextCons32.draw(this.mCamera);
        this.mTextCons72.draw(this.mCamera);
        this.mTextSeg96.draw(this.mCamera);
    }

    update() {
        var dX = 0.5, dT = 0.05;
        var xForm = this.mHero.getXform();
        // Hero
        if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
            xForm.incXposBy(dX);
            if(xForm.getXpos() > 100) 
                xForm.setPosition(0, 50);
        }

        if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
            xForm.incXposBy(-dX);
            if(xForm.getXpos() < 0)
                xForm.setPosition(100, 50);
        }
        // System font image
        var texCoord = this.mFontImage.getElementUVCoordinateArray();
        var b = texCoord[engine.eTexCoordArrayIndex.eBottom] + dT;
        var r = texCoord[engine.eTexCoordArrayIndex.eRight] - dT;

        if(b > 1.0) b = 0;
        if(r < 0) r = 1.0;

        this.mFontImage.setElementUVCoordinate(
            texCoord[engine.eTexCoordArrayIndex.eLeft], r, b, 
            texCoord[engine.eTexCoordArrayIndex.eTop]);
        // Minion
        this.mMinion.updateAnimation();

        // Interactive control of Display size
        if(engine.input.isKeyClicked(engine.input.keys.ZERO))
            this.mTextToWork = this.mTextCons16;

        if(engine.input.isKeyClicked(engine.input.keys.ONE))
            this.mTextToWork = this.mTextCons24;

        if(engine.input.isKeyClicked(engine.input.keys.THREE))
            this.mTextToWork = this.mTextCons32;

        if(engine.input.isKeyClicked(engine.input.keys.FOUR))
            this.mTextToWork = this.mTextCons72;

        var dF = 0.005;
        // Up + X; Up + Y
        if(engine.input.isKeyClicked(engine.input.keys.UP)) {
            if(engine.input.isKeyPressed(engine.input.keys.X))
                this.mTextToWork.getXform().incWidthBy(dF);
        
            if(engine.input.isKeyPressed(engine.input.keys.Y))
                this.mTextToWork.getXform().incHeightBy(dF);   
                
            this.mTextSysFont.setText(
                this.mTextToWork.getXform().getWidth().toFixed(2)+"x"+
                this.mTextToWork.getXform().getHeight().toFixed(2)
            );     
        }
        // Down + X; Down + Y
        if(engine.input.isKeyClicked(engine.input.keys.DOWN)) {
            if(engine.input.isKeyPressed(engine.input.keys.X))
                this.mTextToWork.getXform().incWidthBy(-dF);
        
            if(engine.input.isKeyPressed(engine.input.keys.Y))
                this.mTextToWork.getXform().incHeightBy(-dF);
               
            this.mTextSysFont.setText(
                this.mTextToWork.getXform().getWidth().toFixed(2)+"x"+
                this.mTextToWork.getXform().getHeight().toFixed(2)
            );                
        }
    }
}

export default Game;

window.onload = function() {
    engine.init("GlCanvas");

    var game = new Game();
    game.start();
}
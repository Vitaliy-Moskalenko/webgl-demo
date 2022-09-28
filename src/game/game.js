"use strict";

import engine from "../engine/index";

class Game {
    constructor(htmlCanvasId) {
        engine.init(htmlCanvasId);

        this.mCamera = new engine.Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);

        this.mBlueSq = new engine.Renderable();
        this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);

        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0.25, 0.25, 1]);

        this.mTLSq = new engine.Renderable();
        this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);

        this.mTRSq = new engine.Renderable();
        this.mTRSq.setColor([0.6, 0.5, 0.4, 1]);

        this.mBRSq = new engine.Renderable();
        this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);

        this.mBLSq = new engine.Renderable();
        this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

        engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        this.mCamera.setViewAndCameraMatrix();

        this.mBlueSq.getXform().setPosition(20, 60);
        this.mBlueSq.getXform().setRotationRad(0.2);
        this.mBlueSq.getXform().setSize(5, 5);
        this.mBlueSq.draw(this.mCamera);

        this.mRedSq.getXform().setPosition(20, 60);
        this.mRedSq.getXform().setSize(2, 2);
        this.mRedSq.draw(this.mCamera);

        // top left
        this.mTLSq.getXform().setPosition(10, 65);
        this.mTLSq.draw(this.mCamera);

        // top right
        this.mTRSq.getXform().setPosition(30, 65);
        this.mTRSq.draw(this.mCamera);

        // bottom right
        this.mBRSq.getXform().setPosition(30, 55);
        this.mBRSq.draw(this.mCamera);

        // bottom left
        this.mBLSq.getXform().setPosition(10, 55);
        this.mBLSq.draw(this.mCamera);
    }
}

window.onload = function() {
    new Game('GlCanvas');
}
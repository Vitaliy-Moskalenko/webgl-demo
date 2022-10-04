"use strict";

import * as loop from "../engine/core/loop.js";
import engine from "../engine/index";

class Game {
    constructor() {
        this.mBlueSq  = null;
        this.mGreenSq = null;

        this.mCamera = null;
    }    

    init() {
        this.mCamera = new engine.Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mBlueSq = new engine.Renderable();
        this.mBlueSq.setColor([0, 0, 1, 1]);
        this.mBlueSq.getXform().setPosition(20, 60);
        this.mBlueSq.getXform().setRotationRad(0.2);
        this.mBlueSq.getXform().setSize(5, 5);

        this.mGreenSq = new engine.Renderable();
        this.mGreenSq.setColor([0, 1, 0, 1]);
        this.mGreenSq.getXform().setPosition(10, 60);
        this.mGreenSq.getXform().setSize(2, 2);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        this.mBlueSq.draw(this.mCamera);
        this.mGreenSq.draw(this.mCamera);
    }

    update() {
        var dX = 0.05;
        var blueXform  = this.mBlueSq.getXform();
        var greenXform = this.mGreenSq.getXform();

        if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
            if(blueXform.getXpos() > 30)
                blueXform.setPosition(10, 60);

            blueXform.incXposBy(dX);    
        }

        if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
            if(blueXform.getXpos() < 0)
                blueXform.setPosition(60, 60);

            blueXform.incXposBy(-dX);    
        }        

        if(engine.input.isKeyPressed(engine.input.keys.UP)) {
            blueXform.incRotationDegrees(2);
        }

        if(engine.input.isKeyPressed(engine.input.keys.DOWN)) {
            if(greenXform.getWidth() > 5)
                greenXform.setSize(1, 1);

                greenXform.incSizeBy(0.1);   
            
            console.clear();
            console.log( blueXform.getSize() );
        }
    }
}

window.onload = function() {
    engine.init("GlCanvas");
    var game = new Game();

    loop.start(game);
}
"use strict";

import * as loop from "../engine/core/loop.js";
import engine from "../engine/index.js";
import SceneFileParser from "./util/scene_file_parser.js";

class Game {
    constructor() {
        this.mSceneFile = "assets/scene.xml";
        this.mSquareSet  = [];

        this.mCamera = null;
    }    

    init() { 
        var sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));

        this.mCamera = sceneParser.parseCamera();

        sceneParser.parseSquares(this.mSquareSet);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        var i;
        for(i=0; i<this.mSquareSet.length; ++i)
            this.mSquareSet[i].draw(this.mCamera);
    }

    update() {
        var xForm = this.mSquareSet[0].getXform();
        var dX = 0.05;

        if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
            if(xForm.getXpos() > 30) 
                xForm.setPosition(10, 60);

            xForm.incXposBy(dX);    
        }

        if(engine.input.isKeyPressed(engine.input.keys.UP)) {
            xForm.incRotationDegrees(1);
        }

        xForm = this.mSquareSet[1].getXform();

        if(engine.input.isKeyPressed(engine.input.keys.DOWN)) {
            if(xForm.getWidth() > 5)
                xForm.setWidth(2, 2);

            xForm.incSizeBy(dX);
        }
    }

    load() {
        engine.xml.load(this.mSceneFile);
    }

    unload() {
        engine.xml.unload(this.mSceneFile);
    }
}

window.onload = function() {
    engine.init("GlCanvas");
    var game = new Game();

    loop.start(game);
}
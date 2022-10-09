import engine from "../engine/index.js";
import Game from "./game.js";
import SceneFileParser from "./util/scene_file_parser.js";

class BlueLevel extends engine.Scene {
    constructor() {
        super();

        this.mSceneFile = "assets/blue_level.xml";
        this.mSqSet = [];
        this.mCamera = null;
    }

    init() {
        var sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));

        this.mCamera = sceneParser.parseCamera();

        sceneParser.parseSquares(this.mSqSet);
    }

    draw() {
        this.mCamera.setViewAndCameraMatrix();

        let i;
        for(i=0; i<this.mSqSet.length; ++i)
            this.mSqSet[i].draw(this.mCamera);
    }

    update() {
        var dX = 0.07;
        var xForm = this.mSqSet[1].getXform();

        if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
            xForm.incXposBy(dX);
            if(xForm.getXpos() > 30)
                xForm.setPosition(12, 60);
        }

        if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
            xForm.incXposBy(-dX);
            if(xForm.getXpos() < 11)
                this.next();
        }

        if(engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop();
    }

    next() {
        super.next();
        var nextLevel = new Game();
        nextLevel.start();
    }

    load() {
        engine.xml.load(this.mSceneFile);
    }

    unload() {
        engine.xml.unload(this.mSceneFile);
    }
}

export default BlueLevel;
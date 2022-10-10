import engine from "../engine/index.js";
import Game from "./game.js";
import SceneFileParser from "./util/scene_file_parser.js";

class BlueLevel extends engine.Scene {
    constructor() {
        super();

        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/game_cue.wav";

        this.mSceneFile = "assets/blue_level.xml";
        this.mSqSet = [];
        this.mCamera = null;
    }

    init() {
        var sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));
        this.mCamera = sceneParser.parseCamera();
        sceneParser.parseSquares(this.mSqSet);

        engine.audio.playBackground(this.mBackgroundAudio, 0.5);
    }

    load() {
        engine.xml.load(this.mSceneFile);
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);
    }

    unload() {
        engine.audio.stopBackground();

        engine.xml.unload(this.mSceneFile);
        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);
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
            engine.audio.playCue(this.mCue, 0.5);

            xForm.incXposBy(dX);
            if(xForm.getXpos() > 30)
                xForm.setPosition(12, 60);
        }

        if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
            engine.audio.playCue(this.mCue, 1.0);

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
}

export default BlueLevel;
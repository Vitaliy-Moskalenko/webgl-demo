import engine from "../engine/index.js";
import Game from "./game.js";
import SceneFileParser from "./util/scene_file_parser.js";

class BlueLevel extends engine.Scene {
    constructor() {
        super();

        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/game_cue.wav";

        this.mSceneFile = "assets/blue_level.xml";

        this.robo = "assets/minion_portal.jpg";
        this.roboCollector = "assets/minion_collector.jpg";

        this.mSqSet  = [];
        this.mCamera = null;
    }

    init() {
        var sceneParser = new SceneFileParser(this.mSceneFile);
        this.mCamera = sceneParser.parseCamera();

        sceneParser.parseSquares(this.mSqSet);   
        sceneParser.parseTextureSquares(this.mSqSet);
console.log('Elmnts parsed:');
console.log(this.mSqSet);        

        engine.audio.playBackground(this.mBackgroundAudio, 0.5);
    }

    load() {
        engine.xml.load(this.mSceneFile);

        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);

        engine.texture.load(this.robo);
        engine.texture.load(this.roboCollector);
    }

    unload() {
        engine.audio.stopBackground();

        engine.xml.unload(this.mSceneFile);
        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);

        engine.texture.unload(this.robo);
        engine.texture.unload(this.roboCollector);
    }

    draw() {  
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();

        let i;
        for(i=0; i<this.mSqSet.length; ++i)
            this.mSqSet[i].draw(this.mCamera);
    }

    update() {
        var dX = 0.07;
        var xForm = this.mSqSet[0].getXform();
        
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

        var c = this.mSqSet[2].getColor();
        var ca = c[3] + dX;
        if(ca > 1) ca = 0;
        c[3] = ca;

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
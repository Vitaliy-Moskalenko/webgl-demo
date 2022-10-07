import engine from "../engine/index.js";
import Game from "./game.js";
import SceneFileParser from "./util/scene_file_parser";

class BlueLevel extends engine.Scene {
    constructor() {
        super();

        this.mSceneFile = "assets/blue_leve.xml";
        this.mSqSet = [];
        this.mCamera = null;
    }

    init() {}

    draw() {}

    update() {}

    next() {}

    load() {}

    unload() {}
}
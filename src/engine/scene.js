"use strict";

import * as loop from "./core/loop.js";
import engine from "./index.js";

var abstractClassError  = new Error("Abstract Class");
var abstractMethodError = new Error("Abstract Method");

class Scene {
    constructor() {
        if(this.constructor === Scene) 
            throw abstractClassError;
    }

    async start() {
        await loop.start(this);
    }

    // Expected to be virtual function
    next() {
        loop.stop(); 
        this.unload();
    }

    stop() {
        loop.stop();
        this.unload();
        engine.cleanUp();
    }

    init() { /* Initialize the level, called from loop.start() */ }

    load() { /* Load necessary resources */ }

    unload() {}

    draw() { throw abstractMethodError ; }

    update() { throw abstractMethodError; }
}

export default Scene;
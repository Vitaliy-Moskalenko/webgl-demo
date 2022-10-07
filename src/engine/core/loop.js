"use strict";

import * as map from "./resource_map.js";
import * as input from "../input.js";

const UPS = 60;          // Updates per second
const MPF = 1000 / UPS;  // Milliseconds per update

var mPrevTime;
var mLagTime;

var isRunning     = false;
var mCurrentScene = null;
var frameId       = -1;

async function start(scene) {
    if(isRunning) throw new Error("Loop already running");

    mCurrentScene = scene;
    mCurrentScene.load();
    
    await map.waitOnPromises(); // Wait for any async requests before game load
;
    mCurrentScene.init();

    mPrevTime = performance.now();
    mLagTime  = 0.0;
    isRunning = true;
    frameId   = requestAnimationFrame(loopOnce);
}

function loopOnce() {
    if(isRunning) {
        frameId = requestAnimationFrame(loopOnce); // Setup next call to loopOnce

        mCurrentScene.draw(); // draw() MUST be called before update() as update may stop the loop

        var currentTime = performance.now(); // compute how much time elapsed since last loopOnce
        var elapsedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elapsedTime;

        while((mLagTime >= MPF) && isRunning) {
            input.update();
            mCurrentScene.update();
            mLagTime -= MPF;
        }
    }
}

function stop() {
    isRunning = false;
    cancelAnimationFrame(frameId);
}

export { start, stop }

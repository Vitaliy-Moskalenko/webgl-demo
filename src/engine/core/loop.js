"use strict";

const UPS = 60;          // Updates per second
const MPF = 1000 / UPS;  // Milliseconds per update

var mPrevTime;
var mLagTime;

var isRunning     = false;
var mCurrentScene = null;
var frameId       = -1;

function loopOnce() {
    if(isRunning) {
        frameId = requestAnimationFrame(loopOnce); // Setup next call to loopOnce

        mCurrentScene.draw(); // draw() MUST be called before update() as update may stop the loop

        var currentTime = performance.now(); // compute how much time elapsed since last loopOnce
        var elapsedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elapsedTime;

        while((mLagTime >= MPF) && isRunning) {
            mCurrentScene.update();
            mLagTime -= MPF;
        }
    }
}

function start(scene) {
    if(isRunning) throw new Error("Loop already running");

    mCurrentScene = scene;
    mCurrentScene.init();

    mPrevTime = performance.now();
    mLagTime  = 0.0;
    isRunning = true;
    frameId   = requestAnimationFrame(loopOnce);
}

function stop() {
    isRunning = false;
    cancelAnimationFrame(frameId);
}

export { start, stop }

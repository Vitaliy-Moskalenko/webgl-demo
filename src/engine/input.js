"use strict";

const keys = {
    LEFT: 37,  // arrows
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    SPACE: 32, // space bar

    ZERO: 48,  // numbers 
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE : 53,
    SIX : 54,
    SEVEN : 55,
    EIGHT : 56,
    NINE : 57,

    A : 65, // Alphabets
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    Q : 81,
    R : 82,
    S : 83,
    W : 87,

    LAST_KEY_CODE: 222    
}

var mKeyPreviousState = [];
var mKeyPressed = [];
var mKeyClicked = [];

function onKeyDown(event) {
    mKeyPressed[event.keyCode] = true;
}

function onKeyUp(event) {
    mKeyPressed[event.keyCode] = false;
}

function init() {
    var i;
    for(i=0; i<keys.LAST_KEY_CODE; ++i) 
        mKeyPressed[i] = mKeyPreviousState[i] = mKeyClicked[i] = false;

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);
}

function update() {
    var i;
    for(i=0; i<keys.LAST_KEY_CODE; ++i) {
        mKeyClicked[i] = (!mKeyPreviousState[i]) && mKeyPressed[i];
        mKeyPreviousState[i] = mKeyPressed[i];
    }
}

function isKeyPressed(keyCode) { 
    return mKeyPressed[keyCode];
}

function isKeyClicked(keyCode) {
    return mKeyClicked[keyCode];
}

function cleanUp() {} // Nothing to do here for now

export { keys, init, update, isKeyClicked, isKeyPressed, cleanUp }
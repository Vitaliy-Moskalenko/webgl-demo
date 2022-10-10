"use strict";

import * as map from "../core/resource_map.js";

var unload = map.unload;
var has    = map.has;

var mAudioContext    = null;
var mBackgroundAudio = null;

// volume control support
// https://www.davrous.com/2015/11/05/creating-fun-immersive-audio-experiences-with-web-audio/
// https://developer.mozilla.org/en-US/docs/Web/API/GainNode/gain
// https://www.html5rocks.com/en/tutorials/webaudio/positional_audio/
var mBackgroundGain = null;
var mCueGain        = null;
var mMasterGain     = null;

var defaultGain = 0.1;

/* Note that: the latest policy for some browers, including Chrome, is that audio will not be
 * allowed to play until first interaction from the user. This means, the above context
 * creation will result in initial warning from Chrome (output to runtime browser console). The audio will only be played
 * after user input (e.g., mouse click, or keybaord events)
 *     https://stackoverflow.com/questions/50490304/how-to-make-audio-autoplay-on-chrome
 */
function init() {
    try {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        mAudioContext = new AudioContext();

        mMasterGain = mAudioContext.createGain();   // Connect Master volume control
        mMasterGain.connect(mAudioContext.destination);
        mMasterGain.gain.value = defaultGain;       // Set default Master value

        mBackgroundGain = mAudioContext.createGain; // Connect background volume control
        mBackgroundGain.connect(mMasterGain);
        mBackgroundGain.gain.value = 1.0;

        mCueGain = mAudioContext.createGain();
        mCueGain.connect(mMasterGain);
        mCueGain.gain.value = 1.0;
    } catch(e) {
        throw new Error("Web Audio is not supported. Engine init failed.");
    }
}

function decodeResource(data) {
    return data.arrayBuffer();
}

function parseResource(data) {
    return mAudioContext.decodeAudioData(data);
}

function load(path) {
    return map.loadDecodeParse(path, decodeResource, parseResource);
}

function playCue(path, volume) {
    var source = mAudioContext.createBufferSource();
    source.buffer = map.get(path);
    source.start(0);

    source.connect(mCueGain);
    mCueGain.gain.value = volume;
}

function playBackground(path, volume) {
    if(has(path)) {
        stopBackground();
        mBackgroundAudio = mAudioContext.createBufferSource();
        mBackgroundAudio.buffer = map.get(path);
        mBackgroundAudio.loop(true);
        mBackgroundAudio.start(0);

        mBackgroundAudio.connect(mBackgroundGain);
        setBackgroundVolume(valume);
    }
}

function setBackgroundVolume(volume) {
    if(mBackgroundGain !== null) {
        mBackgroundGain.gain.value = volume;
    }
}

function incBackgroundVolume(increment) {
    if(mBackgroundGain !== null) {
        mBackgroundGain.gain.value += increment;

        if(mBackgroundGain.gain.value < 0)
            setBackgroundVolume(0);
    }
}

function setMasterVolume(volume) {
    if(mMasterGain !== null)
        mMasterGain.gain.value = volume;
}

function incMasterVolume(increment) {
    if(mMasterGain !== null) {
        mMasterGain.gain.value += increment;

        if(mMasterGain.gain.value < 0)
            mMasterGain.gain.value = 0;
    }
}

function stopBackground() {
    if(mBackgroundAudio !== null) {
        mBackgroundAudio.stop(0);
        mBackgroundAudio = null;
    }
}

function isBackgroundPlaying() {
    return (mBackgroundAudio !== null);
}

function cleanUp() {
    mAudioContext.close();
    mAudioContext = null;
}

export {
    init, cleanUp,
    has, load, unload,
    playCue,
    playBackground, stopBackground, isBackgroundPlaying,
    setBackgroundVolume, incBackgroundVolume,
    setMasterVolume, incMasterVolume
}
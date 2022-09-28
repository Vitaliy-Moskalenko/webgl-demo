"use strict";

import * as glSys from "./core/gl.js";

const eViewport = Object.freeze({
    eOrgX:   0,
    eOrgY:   1,
    eWidth:  2,
    eHeight: 3
});

class Camera {
    /*  wcCenter: vec2
        wcWidth: width of user defined wc. Height of wc is implicitly defined by the viewport aspect ratio
        veiwportRect: array of 4 elements:
            [0],[1] - (x, y) position of lower-left corner on the canvas (in pixel)
            [2],[3] - width and height of viewport

            wcHeight = wcWidth * viewportRect[3] / viewportRect[2]    */
    constructor(wcCenter, wcWith, viewportArray) {
        this.mWCCenter = wcCenter;
        this.mWCWidth  = wcWith;
        this.mViewport = viewportArray;

        this.mCameraMatrix = mat4.create(); // Camera transform operator

        this.mBGColor = [0.8, 0.8, 0.8, 1];
    }

    setWCCenter(xPos, yPos) { this.mWCCenter[0] = xPos; this.mWCCenter[1] = yPos; }
    getWCCenter() { return this.mWCCenter; }

    setWCWidth(width) { this.mWCWidth = width; }
    getWCWidth() { return this.mWCWidth; }

    getWCHeight() {
        var ratio = this.mViewport[eViewport.eHeight] / this.mViewport[eViewport.eWidth];
        return this.getWCWidth() * ratio;
    }

    setViewport(viewportArray) { this.mViewport = viewportArray; }
    getViewport() { return this.mViewport; }

    setBackgroundColor(color) { this.mBGColor = color; }
    getBackgroundColor() { return this.mBGColor; }

    setViewAndCameraMatrix() {
        var gl = glSys.getGL();

        gl.viewport(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
        gl.scissor(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);

        gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3]);

        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        var center = this.getWCCenter();
        mat4.scale(this.mCameraMatrix, mat4.create(), vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0));
        mat4.translate(this.mCameraMatrix, this.mCameraMatrix, vec3.fromValues(-center[0], -center[1], 0));
    }

    getCameraMatrix() {
        return this.mCameraMatrix;
    }
}

export default Camera;
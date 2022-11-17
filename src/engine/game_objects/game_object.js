"use strict";

class GameObject {
    constructor(renderable) {
        this.visible = true;
        this.speed   = 0;
        this.mCurrentFrontDirection = vec2.fromValues(0, 1);
        this.mRenderComponent = renderable;
    }

    isVisible() { return this.visible; }
    setVisibility(v) { this.visible = v; }

    getSpeed()  { return this.speed; }
    setSpeed(v) { this.speed = v; }
    incSpeedBy(delta) { this.speed += delta; }

    getCurrentFrontDirection() { return this.mCurrentFrontDirection; }
    setCurrentFrontDirection(v) { vec2.normalize(this.mCurrentFrontDirection, v); }

    getXform() { return this.mRenderComponent.getXform(); }

    getRenderable() { return this.mRenderComponent; }

    // Orientate entire object to point towards p, will rotate xForm accordingly
    rotateObjPointTo(p, rate) { 
        var dir = []; // Determine if destination position p reached

        vec2.sub(dir, p, this.getXform().getPosition());
        var len = vec2.length(dir);
        if(len < Number.MIN_VALUE) return; // We are there

        vec2.scale(dir, dir, 1 / len);

        var cosTheta = vec2.dot(dir, this.mCurrentFrontDirection); // Compute angle to rotate
        if(cosTheta > 0.999999) return; // Almost exacly the same direction

        if(cosTheta > 1) // Clamp cosTheta from -1 to 1
            cosTheta = 1;
        else 
            if(cosTheta < -1)
                cosTheta = -1;

        var dir3d = vec3.fromValues(dir[0], dir[1], 0); // Clockwise or counterclockwise
        var f3d   = vec3.fromValues(dir[0], dir[1], 0);
        var r3d   = [];
        vec3.cross(r3d, f3d, dir3d);

        var rad = Math.acos(cosTheta); // radian to rotate
        if(r3d[2] < 0)
            rad = -rad;

        rad *= rate; // Rotate facing direction with the angle and rate
        vec2.rotate(this.mCurrentFrontDirection, this.mCurrentFrontDirection, rad);
        this.getXform().incRotationRad(rad);
    }

    update() {
        var pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.mCurrentFrontDirection, this.speed);
    }

    draw(camera) {
        if(this.visible)
            this.mRenderComponent.draw(camera);
    }
}

export default GameObject;
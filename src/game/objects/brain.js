"use strict";

import engine from "../../engine/index.js";


class Brain extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);

        this.deltaDegree = 1;
        this.deltaRad    = Math.PI * this.deltaDegree / 180;
        this.dV          = 0.01;

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(50, 10);
        this.mRenderComponent.getXform().setSize(3, 5.4);
        this.mRenderComponent.setElementPixelPosition(600, 700, 0, 100);

        this.setSpeed(0.05);
    }

    update() {
        super.update();

        var xForm = this.getXform();
        var frontDirection = this.getCurrentFrontDirection();

        if(engine.input.isKeyPressed(engine.input.keys.LEFT)) {
            xForm.incRotationDegrees(this.deltaDegree);
            vec2.rotate(frontDirection, frontDirection, this.deltaRad);
        }

        if(engine.input.isKeyPressed(engine.input.keys.RIGHT)) {
            xForm.incRotationRad(-this.deltaRad);
            vec2.rotate(frontDirection, frontDirection, -this.deltaRad);
        }
        
        if(engine.input.isKeyPressed(engine.input.keys.UP)) {
            this.incSpeedBy(this.dV);
        }

        if(engine.input.isKeyPressed(engine.input.keys.DOWN)) {
            this.incSpeedBy(-this.dV);
        }
    }
}

export default Brain;
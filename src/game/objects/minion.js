"use strict";

import engine from "../../engine/index.js";

class Minion extends engine.GameObject {
    constructor(spriteTexture, atX, atY) {
        super(null);

        this.delta = 0.2;

        this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);                          
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(atX, atY);
        this.mRenderComponent.getXform().setSize(12, 9.6);

        this.mRenderComponent.setSpriteSequence(
            512, 0, 
            204, 164, 
            5, 0
        );
        this.mRenderComponent.setAnimationType(engine.eAnimationType.eSwing);
        this.mRenderComponent.setAnimationSpeed(15);
    }

    update() {
        this.mRenderComponent.updateAnimation();

        var xForm = this.getXform();

        xForm.incXposBy(-this.delta);

        if(xForm.getXpos() < 0) {
            xForm.setXpos(100);
            xForm.setYpos(65 * Math.random());
        }
    }
}

export default Minion;
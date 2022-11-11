"use strict";

import engine from "../../engine/index.js";

class Hero extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);

        this.delta = 0.3;

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(35, 50);
        this.mRenderComponent.getXform().setSize(9, 12);
        // this.mRenderComponent.setElementPixelPosition(0, 120, 0, 180);
        this.mRenderComponent.setElementPixelPosition(720, 860, 0, 180);
    }

    update() {   
        var xForm = this.getXform();

        if(engine.input.isKeyPressed(engine.input.keys.W))
            xForm.incYposBy(this.delta);        

        if(engine.input.isKeyPressed(engine.input.keys.S))
            xForm.incYposBy(-this.delta);

        if(engine.input.isKeyPressed(engine.input.keys.A))
            xForm.incXposBy(-this.delta);

        if(engine.input.isKeyPressed(engine.input.keys.D))
            xForm.incXposBy(this.delta);
    }
}

export default Hero;
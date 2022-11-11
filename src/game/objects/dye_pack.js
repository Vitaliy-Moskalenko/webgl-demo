"use strict";

import engine from "../../engine/index.js"

class DyePack extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);

        this.refWidth  = 80;
        this.refHeight = 130;

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0.1]);
        this.mRenderComponent.getXform().setPosition(50, 33);
        this.mRenderComponent.getXform().setSize(this.refWidth / 50, this.refHeight / 50);
        this.mRenderComponent.setElementPixelPosition(510, 595, 23, 153);
    }
}

export default DyePack;
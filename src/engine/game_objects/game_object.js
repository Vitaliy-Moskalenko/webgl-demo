"use strict";

class GameObject {
    constructor(renderable) {
        this.mRenderComponent = renderable;
    }

    getXform() { return this.mRenderComponent.getXform(); }

    getRenderable() { return this.mRenderComponent; }

    draw(camera) {
        this.mRenderComponent.draw(camera);
    }

    update() {}
}

export default GameObject;
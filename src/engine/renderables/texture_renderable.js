"use strict";

import Renderable from "./renderable.js";
import * as texture from "../resources/texture.js";
import * as shaderResources from "../core/shader_resources.js";

class TextureRenderable extends Renderable {
    constructor(texture) {  // console.log('Renderable constructor: ' + texture);
        super();
        super.setColor([1, 1, 1, 0]);
        super._setShader(shaderResources.getTextureShader());
        this.mTexture = texture;        
    }

    draw(camera) {
        texture.activate(this.mTexture);
        super.draw(camera);
    }

    getTexture() { return this.mTexture; }
    setTexture(newTexture) { this.mTexture = newTexture; }
}

export default TextureRenderable;
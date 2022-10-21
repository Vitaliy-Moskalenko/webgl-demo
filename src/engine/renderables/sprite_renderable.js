"use strict";

import TextureRenderable from "./texture_renderable";
import * as texture from "../resources/texture.js";
import * as shaderResources from "../core/shader_resources.js";

// The expected resource coordinates array of 8 floats where:
// [0][1] - uv coords of Top-Right
// [2][3] - uv coords of Top-Left
// [4][5] - uv coords of Bottom-Right
// [6][7] - uv coords of Bottom-Left
// Convention: eName is an enumerated data type
var eTexCoordArrayIndex = {
    eLeft:   2,
    eRight:  0,
    eTop:    1,
    eBottom: 5
}

class SpriteRenderable extends TextureRenderable {
    constructor(texture) {
        super(texture);
        super._setShader(shaderResources.getSpriteShader());
        // Sprite coordinates
        this.elmLeft   = 0.0; // bounds of texture coord (0 is left, 1 is right)
        this.elmRight  = 1.0;
        this.elmTop    = 1.0;
        this.elmBottom = 0.0;
    }

    // Specify element region by uv-coordinates (0, 1)
    setElementUVCoordinate(left, right, bottom, top) {
        this.elmLeft   = left;
        this.elmRight  = right;
        this.elmTop    = top;
        this.elmBottom = bottom;
    }

    // Specify element region by pixel xy-position (0, img.resolution)
    setElementPixelPosition(left, right, bottom, top) {        
        var texInfo = texture.get(this.mTexture);
        var imgW = texInfo.width; // Entire image width, height
        var imgH = texInfo.height;

        this.elmLeft   = left / imgW;
        this.elmRight  = right / imgW;
        this.elmTop    = top / imgH;
        this.elmBottom = bottom / imgH;                       
        // console.log(this);  
        // console.log('Sprite renderable:51 Set sprite coords');
    }

    getElementUVCoordinateArray() {
        return [
            this.elmRight, this.elmTop,  // x, y of top-right
            this.elmLeft,  this.elmTop,
            this.elmRight, this.elmBottom,
            this.elmLeft,  this.elmBottom
        ];
    }

    draw(camera) {
        // Set current texture coords
        //
        // Activate the texture
        this.mShader.setTextureCoords(this.getElementUVCoordinateArray());
        super.draw(camera);
    }
}

export default SpriteRenderable;
export { eTexCoordArrayIndex }



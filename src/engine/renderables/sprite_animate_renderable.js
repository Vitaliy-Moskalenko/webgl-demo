"use strict";

import SpriteRenderable from "./sprite_renderable.js";
import * as texture from "../resources/texture.js";
import * as shaderResource from "../core/shader_resources.js";

// First sprite in the animation is always the left most element
var eAnimationType = {
    eRight: 0, // Animate from first (left) towards right
    eLeft:  1, // Find last element (right) , start from the right
    sSwing: 2  // From left towards right, when hit the end - animate back
};

class SpriteAnimateRenderable extends SpriteRenderable {
    constructor(texture) {
        super(texture);
        super._setShader(shaderResource.getSpriteShader());
        // All coords is UV
        this.firstElmLeft = 0.0; // 0.0 - is left corner of image
        this.elmTop       = 1.0;
        this.elmWidth     = 1.0;
        this.elmHeight    = 1.0;
        this.widthPadding = 0.0;
        this.numElements  = 1;
        // Per animation settings
        this.updateInterval = 1;
        this.animationType  = eAnimationType.eRight;

        this.currentAnimAdvance = -1;
        this.currentElm = 0;

        this._initAnimation();
    }

    _initAnimation() {
        this.currentTick = 0; // Currently running animation

        switch(this.animationType) {
            case eAnimationType.eRight:
                this.currentElm = 0;
                this.currentAnimAdvance = 1; // either 1 or -1
                break;
            case eAnimationType.eLeft:
                this.currentElm = this.numElements - 1;
                this.currentAnimAdvance = -1;
                break;
            case eAnimationType.sSwing:
                this.currentAnimAdvance = -1 * this.currentAnimAdvance;
                this.currentElm += 2 * this.currentAnimAdvance;
                // this.currentElm += this.currentAnimAdvance << 1;
                break;
        }

        this._setSpriteElement();
    }

    _setSpriteElement() {
        var left = this.firstElmLeft + (this.currentElm * (this.elmWidth + this.widthPadding));
        super.setElementUVCoordinate(
            left,
            left + this.elmWidth,
            this.elmTop - this.elmHeight,
            this.elmTop
        );
    }

    setSpriteSequence(
        topPixel,  // offset from top-left
        leftPixel,
        elmWidthInPixels,
        elmHeightInPixels,
        numElements,
        paddingInPixels
    ) {
        var texInfo = texture.get(this.mTexture);
        var imageW  = texInfo.width; // Entire image width, height
        var imageH  = texInfo.height;
// console.log(texInfo);
        this.numElements  = numElements;
        this.firstElmLeft = leftPixel / imageW;
        this.elmTop       = topPixel / imageH;
        this.elmWidth     = elmWidthInPixels / imageW;
        this.elmHeight    = elmHeightInPixels / imageH;
        this.widthPadding = paddingInPixels / imageW;
// console.log(this);
        this._initAnimation();
    }

    // Number of update calls before advancing the animation
    setAnimationSpeed(tickInterval) { this.updateInterval = tickInterval; }

    incAnimationSpeed(delta) { this.updateInterval += delta; }

    setAnimationType(animationType) {
        this.animationType = animationType;
        this.currentAnimAdvance = -1;
        this.currentElm = 0;

        this._initAnimation();
    }

    updateAnimation() {   // console.log( this.currentElm );
        this.currentTick++;

        if(this.currentTick >= this.updateInterval) {
            this.currentTick = 0;
            this.currentElm += this.currentAnimAdvance;

            if((this.currentElm >= 0) && (this.currentElm < this.numElements))
                this._setSpriteElement();
            else {
                this._initAnimation();
                // console.log('Init animation fired')
            }
        }
    }
}

export { eAnimationType }
export default SpriteAnimateRenderable;
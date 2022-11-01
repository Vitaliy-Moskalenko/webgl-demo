"use strict";

import Transform from "../transform.js";
import SpriteRenderable from "./sprite_renderable.js";
import * as defalutResources from "../resources/default_resources.js";
import * as font from "../resources/font.js";

class FontRenderable {
    constructor(str) {
        this.fontName   = defalutResources.getDefaultFontName();
        this.mSingleChar = new SpriteRenderable(font.getImageName(this.fontName));
        this.mXform      = new Transform();
        this.txt         = str;
    }

    draw(camera) { 
        // We draw text string by calling to mSingleChar for each char
        var oneCharWidth  = this.mXform.getWidth() / this.txt.length;
        var oneCharHeight = this.mXform.getHeight();
        // this.mSingleChar.getXform().setRotationRad(this.mXform.getRotationRad());
        var yPos = this.mXform.getYpos();

        // Center position of the first char
        var xPos = this.mXform.getXpos() - (oneCharWidth >> 1) + (oneCharWidth * 0.5);

        var charIndex, char, charInfo, xSize, ySize, xOffset, yOffset;
        for(charIndex=0; charIndex<this.txt.length; charIndex++) {
            char = this.txt.charCodeAt(charIndex);
            charInfo = font.getCharInfo(this.fontName, char);
         
            // Set texture coords
            this.mSingleChar.setElementUVCoordinate(
                charInfo.texCoordLeft, charInfo.texCoordRight,
                charInfo.texCoordBottom, charInfo.texCoordTop
            );    

            // Size of the char
            xSize = oneCharWidth * charInfo.charWidth;
            ySize = oneCharHeight * charInfo.charHeight;
            this.mSingleChar.getXform().setSize(xSize, ySize);
            
            // How much to offset from center
            xOffset = oneCharWidth * charInfo.charWidthOffset * 0.5;
            yOffset = oneCharHeight * charInfo.charHeightOffset * 0.5;

            this.mSingleChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);

            this.mSingleChar.draw(camera);

            xPos += oneCharWidth;
        }
    }

    update() {}

    // Experimenal function, need testing
    getStringWidth(h) {
        var strWidht = 0;
        var charSize = h;
        var charIndex, char, charInfo;

        for(charIndex=0; charIndex<this.txt.length; charIndex++) {
            char = this.txt.charCodeAt(charIndex);
            charInfo = font.getCharInfo(this.fontName, char);
            stringWidth += charSize * charInfo.charWidth;
        }   

        return stringWidth;
    }

    getXform() { return this.mXform; }
    
    getText() { return this.txt; }
    setText(text) { 
        this.txt = text;
        this.setTextHeight(this.getXform().getHeight());
    }

    setTextHeight(height) {
        var charInfo = font.getCharInfo(this.fontName, "A".charCodeAt(0));
        var width = height * charInfo.charAspectRatio;
        this.getXform().setSize(width * this.txt.length, height);
    }

    getFontName() { return this.fontName; }
    setFontName(fntName) { 
        this.fontName = fntName;
        this.mSingleChar.setTexture(font.getImageName(this.fontName));
    }

    getColor() { return this.mSingleChar.getColor(); }
    setColor(color) { this.mSingleChar.setColor(color); }
}

export default FontRenderable;
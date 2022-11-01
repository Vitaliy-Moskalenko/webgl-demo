"use strict";

import * as texture from "./texture.js";
import * as xml from "./xml.js";

var imageExt = ".png";
var descExt  = ".fnt";

// All returned sizes are normalized unit
class CharacterInfo {
    constructor() {
        // Texture coordinates
        this.texCoordLeft   = 0;
        this.texCoordRight  = 1;
        this.texCoordBottom = 0;
        this.texCoordTop    = 0;
        // Reference to the nominal character size, 1 is char's "standart w/h".
        this.charWidth  = 1;
        this.charHeight = 1;
        this.charWidthOffset  = 0;
        this.charHeightOffset = 0;
        // Reference to char width/height ratio
        this.charAspectRatio = 1;    
    }
}

function getImageName(fontName) { return fontName + imageExt; }
function getDescName(fontName) { return fontName + descExt; }

function has(fontName) {
    return texture.has(getImageName(fontName)) && xml.has(getDescName(fontName));
}

function load(fontName) {
    texture.load(getImageName(fontName));
    xml.load(getDescName(fontName));
}

function unload() {
    texture.unload(getImageName(fontName));
    xml.unload(getDescName(fontName));
}

function getCharInfo(fontName, char) {
    var returnInfo = null;
    var fontInfo = xml.get(getDescName(fontName));  
    var commonPath = "font/common";
    var commonInfo = fontInfo.evaluate(commonPath, fontInfo, null, XPathResult.ANY_TYPE, null);

    commonInfo = commonInfo.iterateNext();
    if(commonInfo === null)
        return returnInfo; 

    var charHeight = commonInfo.getAttribute("base");
    var charPath = "font/chars/char[@id=" + char + "]";
    var charInfo = fontInfo.evaluate(charPath, fontInfo, null,  XPathResult.ANY_TYPE, null);    
    charInfo = charInfo.iterateNext();    
    if(charInfo === null)
        return returnInfo;    

    returnInfo = new CharacterInfo();
    var texInfo = texture.get(getImageName(fontName));   
    var leftPixel = Number(charInfo.getAttribute("x"));
    var rightPixel = leftPixel + Number(charInfo.getAttribute("width")) - 1;
    var topPixel = (texInfo.height - 1) - Number(charInfo.getAttribute("y"));
    var bottomPixel = topPixel - Number(charInfo.getAttribute("height")) + 1;

    // texture coordinate information
    returnInfo.texCoordLeft   = leftPixel   / (texInfo.width - 1);
    returnInfo.texCoordTop    = topPixel    / (texInfo.height - 1);
    returnInfo.texCoordRight  = rightPixel  / (texInfo.width - 1);
    returnInfo.texCoordBottom = bottomPixel / (texInfo.height - 1);

    // relative character size
    var charWidth = charInfo.getAttribute("xadvance");
    returnInfo.charWidth        = charInfo.getAttribute("width") / charWidth;
    returnInfo.charHeight       = charInfo.getAttribute("height") / charHeight;
    returnInfo.charWidthOffset  = charInfo.getAttribute("xoffset") / charWidth;
    returnInfo.charHeightOffset = charInfo.getAttribute("yoffset") / charHeight;
    returnInfo.charAspectRatio  = charWidth / charHeight;
// console.log( returnInfo );
    return returnInfo;
}

export { 
    has, load, unload,
    getImageName, getDescName,
    CharacterInfo,
    getCharInfo
}
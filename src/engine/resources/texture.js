"use strict";

import * as glSys from "../core/gl.js";
import * as map from "../core/resource_map.js";

var has = map.has;
var get = map.get;

class TextureInfo {
    constructor(w, h, id) {
        this.width     = w;
        this.height    = h;
        this.mGlTextID = id;
    }
}

// Convert image to gl texture format, should called once texture is loaded
function processLoadedImage(path, img) {
    var gl = glSys.getGL();
    var textureID = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, textureID);

    /* Load texture into data structure with descriptive info
        1. Which binding point or target text loaded to
        2. Level of detail used for mipmapping. 0 - base texture level
        3. Internal format, composition of each element i.e. pixels
        4. Format of texel data. Must match internal format
        5. Data type of texel data.
        6. Texture data */
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);  
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    var texInfo = new TextureInfo(img.naturalWidth, img.naturalHeight, textureID);
    map.set(path, texInfo);
}

function load(textureName) {
    var texturePromise = null;
    if(map.has(textureName)) {
        map.incRef(textureName);
    }
    else {
        map.loadRequested(textureName);

        var image = new Image();
        texturePromise = new Promise(
            function(resolve) {
                image.onload = resolve;
                image.src = textureName;
            })
            .then(
                function resolve() {
                    processLoadedImage(textureName, image);
                }
            );
        map.pushPromise(texturePromise);        
    }

    return texturePromise;
}

function unload(textureName) {
    var textInfo = get(textureName);
    if(map.unload(textureName)) {
        var gl = glSys.getGL();
        gl.deleteTexture(textInfo.mGlTextID);
    }
}

function activate(textureName) {      
    var gl = glSys.getGL();
    var texInfo = get(textureName);  

    gl.activeTexture(gl.TEXTURE0); 
    gl.bindTexture(gl.TEXTURE_2D, texInfo.mGlTextID);
    // To prevent texture wrapping
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Handle magnification and minimization filters will work
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); 
    // For pixel graphics stuff - texture looks "sharp"
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); 
}

function deactivate() {
    var gl = glSys.getGL();
    gl.bindTexture(gl.TEXTURE_2D, null);
}

export {
    has, get, load, unload,
    TextureInfo,
    activate, deactivate
}
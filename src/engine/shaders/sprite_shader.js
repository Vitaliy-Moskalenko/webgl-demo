"use strict";

import * as glSys from "../core/gl.js";
import TextureShader from "./texture_shader.js";

class SpriteShader extends TextureShader {
    constructor(vertexShaderPath, fragmetShaderPath) {
        super(vertexShaderPath, fragmetShaderPath);

        this.mTexCoordBuffer = null;

        var initTexCoords = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ]

        var gl = glSys.getGL();
        this.mTexCoordBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoords), gl.DYNAMIC_DRAW);
    }

    _getTexCoordBuffer() { return this.mTexCoordBuffer; }

    setTextureCoords(texCoords) {
        var gl = glSys.getGL;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoords));
    }

    cleanUp() {
        var gl = glSys.getGL();
        gl.deleteBuffer(this.mTexCoordBuffer);
        super.cleanUp();
    }
}

export default SpriteShader;
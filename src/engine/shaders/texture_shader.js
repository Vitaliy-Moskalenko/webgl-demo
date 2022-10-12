"use strickt";

import * as glSys from "../core/gl.js";
import { getTextureShader } from "../core/shader_resources";
import * as vertexBuffer from "../core/vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

class TextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);

        this.mTextureCoordRef = null; // Reference to texture coordinates whithin shader

        var gl = glSys.getGL();
        this.mTextureCoordRef = gl.getTextureShader




    }

    activate() {

        // Enable texture coordinates array
        var gl = glSys.getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer());
        gl.vertexAttributePointer(this.mTextureCoordRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mTextureCoordRef);
        // Bind uSampler
        gl.uniform1i



    }

    _getTexCoordBuffer() {
        return vertexBuffer.getTextCoord();
    }
}

export default getTextureShader;
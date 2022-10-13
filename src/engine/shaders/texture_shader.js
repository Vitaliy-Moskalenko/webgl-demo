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
        this.mTextureCoordRef = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
        this.mSampleRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");
    }

    activate(pixelColor, trsMatrix, cameraMatrix) {
        super.activate(pixelColor, trsMatrix, cameraMatrix);

        var gl = glSys.getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer());
        gl.vertexAttribPointer(this.mTextureCoordRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mTextureCoordRef, 0);

        gl.uniform1i(this.mSampleRef, 0); // Bind uSampler to texture 0
    }

    _getTexCoordBuffer() {
        return vertexBuffer.getTextCoord();
    }
}

export default TextureShader;
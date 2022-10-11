attribute vec3 aVertexPosition;
attribute vec2 aTextureCoordinate;

varying vec2 vTexCoord; // Texels that maps image to the triangles

uniform mat4 uModelXformMatrix;
uniform mat4 uCameraXformMatrix;

void main(void) {
    // Cast vec3 to vec4 for scan and transforming with model and camera matrix
    gl_Position = uCameraXformMatrix * uModelXformMatrix * vec4(aVertexPosition, 1.0);

    vTexCoord = aTextureCoordinate;
}
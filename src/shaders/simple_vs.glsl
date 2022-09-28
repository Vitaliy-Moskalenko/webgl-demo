attribute vec3 aVertexPosition;

uniform mat4 uModelXformMatrix;  // This uniform variable represents the Martix Transform operator T
uniform mat4 uCameraXformMatrix;


void main(void) {
	// p` = Tp
	gl_Position = uCameraXformMatrix * uModelXformMatrix * vec4(aVertexPosition, 1.0);
}
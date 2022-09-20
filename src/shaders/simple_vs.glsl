attribute vec3 aVertexPosition;

uniform mat4 uModelXformMatrix; // This uniform variable represents the Martix Transform operator T

void main(void) {
	// p` = Tp
	gl_Position = uModelXformMatrix * vec4(aVertexPosition, 1.0);
}
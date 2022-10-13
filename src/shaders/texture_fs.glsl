precision mediump float;

// Object  to fetch data from texture, must be set outside the shader
uniform sampler2D uSampler;
uniform vec4 uPixelColor;

varying vec2 vTexCoord;

void main(void) {
    // Texel color looks up based on interpolated UV value vTexCoord
    vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));

    // Different options: e.g. tint transparent area also
    // vec4 result = c * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a
    // or: tint the textured area and leave transparent area as defined by texture
    vec3 r = vec3(c) * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, c.a);

    // or: ignore pixel tinting
    // vec4 result = c;

    // or: simply multiply pixel color with texture color
    // vec4 result = c * uPixelColor;

    gl_FragColor = result;
}
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImageRes;

vec2 CoverUV(vec2 uv, vec2 screen, vec2 image) {
	float res = screen.x / screen.y; // Aspect screen size
	float aspect = image.x / image.y; // Aspect image size
  
	vec2 st = res < aspect ? vec2(image.x * screen.y / image.y, screen.y) : vec2(screen.x, image.y * screen.x / image.x); // New st
	vec2 o = (res < aspect ? vec2((st.x - screen.x) / 2.0, 0.0) : vec2(0.0, (st.y - screen.y) / 2.0)) / st; // Offset
	return uv * screen / st + o;
}

varying vec2 vUv;
void main() {
	vec2 uv = CoverUV(vUv, uRes, uImageRes);
	vec3 tex = texture2D(uTex, uv).rgb;
	gl_FragColor = vec4(tex, 1.0);
}

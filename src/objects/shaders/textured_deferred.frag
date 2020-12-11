
uniform bool use_uvs;
uniform sampler2D tex;
uniform float diffuse_intensity;
uniform float specular_intensity;
uniform float specular_power;

in vec3 pos;
in vec3 nor;
in vec2 uvs;

layout (location = 0) out vec4 out_color;
layout (location = 1) out vec4 normal;

void main()
{
	vec3 n = normalize(gl_FrontFacing ? nor : -nor);
    out_color = vec4(use_uvs ? texture(tex, vec2(uvs.x, 1.0 - uvs.y)).rgb: triplanarMapping(tex, n, pos), diffuse_intensity);
	int intensity = int(floor(specular_intensity * 15.0));
	int power = int(floor(specular_power*0.5));
    normal = vec4(0.5 * n + 0.5, float(power << 4 | intensity)/255.0);
}
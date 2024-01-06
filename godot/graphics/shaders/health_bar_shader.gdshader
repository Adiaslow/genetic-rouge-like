shader_type canvas_item;

uniform float health_pct : hint_range(0.0, 1.0) = 1.0;

void fragment() {
	vec4 tex_color = texture(TEXTURE, UV);
	float health_cutoff = 1.0 - health_pct;
	if (UV.x > health_cutoff) {
		COLOR = vec4(0.0, 0.0, 0.0, 0.0); // Transparent where health is lost
	} else {
		COLOR = tex_color; // Original texture color where health remains
	}
}
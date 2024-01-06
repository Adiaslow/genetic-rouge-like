extends Camera2D

@onready var player: RigidBody2D = get_node("../Player")
@export var follow_damping: float = 0.5

var map_size = Vector2(2048, 1536)  # Replace with your map size
var viewport_half_size = Vector2()

var target_position: Vector2
var factor: float
func _ready():
	position = player.global_position
	viewport_half_size = get_viewport_rect().size * 0.5 * 0.5

func _process(delta):
	target_position = player.global_position
	factor = 1.0 - pow(1.0 - follow_damping, delta * Engine.get_frames_per_second())
	position = clamp_position(position.lerp(target_position, factor))

func clamp_position(pos: Vector2) -> Vector2:
	var clamped_x = clamp(pos.x, viewport_half_size.x, map_size.x - viewport_half_size.x)
	var clamped_y = clamp(pos.y, viewport_half_size.y, map_size.y - viewport_half_size.y)
	return Vector2(clamped_x, clamped_y)

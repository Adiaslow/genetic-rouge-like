extends MarginContainer

@onready var health_bar = $HPBar
@onready var player = get_node("../../../Player")
@onready var health_bar_animation: AnimatedSprite2D = get_node("HealthBarAnimation")

var animation_width = 256  # Width of a single animation frame
var num_animations = 3    # Number of animations to display side by side

var player_health = 100
var current_health = 100
var max_health = 100

# Called when the node enters the scene tree for the first time.
func _ready():
	player_health = player.stats.health
	create_extended_animation()
	pass

func create_extended_animation():
	for i in range(0, num_animations):
		var new_anim = health_bar_animation.duplicate()
		new_anim.position.x = i * animation_width
		add_child(new_anim)
		new_anim.play("bar")

"""
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	health_bar.value = player_health
	var health_pct = current_health / max_health
	var material = health_bar.material as ShaderMaterial
	if material:
		material.set_shader_param("health_pct", health_pct)
	pass
"""

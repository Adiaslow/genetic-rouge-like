class_name GraphicsManager
extends Node2D

@onready var input_manager = get_node("../Input")

@onready var character: AnimatedSprite2D = $Character
@onready var vfx: AnimatedSprite2D = $VFX
@onready var shadow: Sprite2D = $Shadow

@export var character_frames: SpriteFrames
@export var character_speed_scale: float = 1
@export var vfx_frames: SpriteFrames
@export var vfx_speed_scale: float = 1

var axis: Vector2 = Vector2.ZERO

@export var shadow_alpha: float = 1
@export var jump_peak_height = 10.0
@export var jump_duration = 0.4
var is_jumping = false
var jump_elapsed = 0.0
var jump_start_position: Vector2


func _ready() -> void:
	character.frames = character_frames
	character.speed_scale = character_speed_scale
	vfx.frames = vfx_frames
	vfx.speed_scale = vfx_speed_scale
	shadow.modulate.a = shadow_alpha
	
	input_manager.connect("axis_changed", _on_axis_changed)
	input_manager.connect("dash_inputted", _on_dash_inputted)
	input_manager.connect("jump_inputted", _on_jump_inputted)
	input_manager.connect("melee_inputted", _on_melee_inputted)
	input_manager.connect("ranged_inputted", _on_ranged_inputted)
	input_manager.connect("special_inputted", _on_special_inputted)

func _process(delta: float) -> void:
	if is_jumping:
		animate_jump(delta)
		play_animation("idle")
	elif not character.is_playing() and axis == Vector2.ZERO:
		play_animation("idle")
	elif not character.is_playing():
		handle_ground_movement_animations()
	elif axis == Vector2.ZERO:
		play_animation("idle")
		
func _on_axis_changed(new_axis: Vector2):
	axis = new_axis
	handle_ground_movement_animations()

func handle_ground_movement_animations():
	if axis.x > 0:
		play_animation("walk", "right")
	elif axis.x < 0:
		play_animation("walk", "left")
	elif axis.y > 0:
		play_animation("walk", "right")
	elif axis.y < 0:
		play_animation("walk", "right")
	elif axis.x != 0 or axis.y != 0:
		play_animation("walk", "right")

func _on_dash_inputted():
	if axis.x > 0:
		play_animation("dash", "right", Vector2(0,0), false)
	elif axis.x < 0:
		play_animation("dash", "left", Vector2(0,0), false)
	elif axis.y > 0:
		play_animation("dash", "right", Vector2(0,0), false)
	elif axis.y < 0:
		play_animation("dash", "right", Vector2(0,0), false)
	elif axis.x != 0 or axis.y != 0:
		play_animation("dash", "right", Vector2(0,0), false)
	

func _on_jump_inputted():
	if not is_jumping:
		is_jumping = true
		jump_start_position = Vector2(0,0)
		jump_elapsed = 0.0
		play_animation("jump", "default", Vector2(0,10))

# Coroutine for jump animation
func animate_jump(delta):
	if is_jumping:
		jump_elapsed += delta
		var t = jump_elapsed / jump_duration
		if t > 1.0:
			t = 1.0
			is_jumping = false
		var jump_height = -4 * jump_peak_height * t * (t - 1)
		character.offset.y = jump_start_position.y - jump_height
		if not is_jumping:
			character.offset.y = jump_start_position.y
			play_landing_vfx()

func play_landing_vfx():
	if vfx.sprite_frames.has_animation("land"):
		var fx_instance = vfx.duplicate(true)
		fx_instance.global_position = global_position + Vector2(0,25)
		var current_scene_root = get_tree().current_scene
		if current_scene_root:
			current_scene_root.add_child(fx_instance)
		else:
			print("Error: Current scene root not found.")
			
		fx_instance.play("land")
	else:
		print("land animation not found for VFX!")
func _on_melee_inputted():
	if axis.x > 0:
		play_animation("melee", "right")
	elif axis.x < 0:
		play_animation("melee", "left")
	else:
		if randf() > 0.5:
			play_animation("melee", "right")
		else:
			play_animation("melee", "left")

func _on_ranged_inputted():
	play_animation("ranged")

func _on_special_inputted():
	play_animation("special")
	
func play_animation(animation_name: String, direction: String = "default", vfx_offset: Vector2 = Vector2(0,0), shadow_active: bool = true):
	# Play character animation
	if character.sprite_frames.has_animation(animation_name):
		set_character_direction(direction)
		character.play(animation_name)
	else:
		print(animation_name + " animation not found for character!")

	# Play VFX animation
	if vfx.sprite_frames.has_animation(animation_name):
		var fx_instance = vfx.duplicate(true)
		fx_instance.global_position = global_position + vfx_offset
		var current_scene_root = get_tree().current_scene
		if current_scene_root:
			current_scene_root.add_child(fx_instance)
		else:
			print("Error: Current scene root not found.")
			
		fx_instance.play(animation_name)
	else:
		# print(animation_name + " animation not found for VFX!")
		pass
	if shadow_active:
		shadow.modulate.a = shadow_alpha
	else:
		shadow.modulate.a = 0

func set_character_direction(direction: String) -> void:
	match direction:
		"right":
			character.flip_h = false
		"left":
			character.flip_h = true
		"random":
			character.flip_h = randf() < 0.5
		_, "default":
			character.flip_h = false

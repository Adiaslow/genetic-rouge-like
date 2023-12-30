class_name GraphicsManager
extends Node2D

@onready var input_manager: InputManager = get_node("../Input")

@onready var character: AnimatedSprite2D = $Character
@onready var vfx: AnimatedSprite2D = $VFX

@export var character_frames: SpriteFrames
@export var character_speed_scale: float = 1
@export var vfx_frames: SpriteFrames
@export var vfx_speed_scale: float = 1

func _ready() -> void:
	character.frames = character_frames
	character.speed_scale = character_speed_scale
	vfx.frames = vfx_frames
	vfx.speed_scale = vfx_speed_scale
		
	input_manager.connect("dash_inputted", _on_dash_inputted)
	input_manager.connect("jump_inputted", _on_jump_inputted)
	input_manager.connect("melee_inputted", _on_melee_inputted)
	input_manager.connect("ranged_inputted", _on_ranged_inputted)
	input_manager.connect("special_inputted", _on_special_inputted)

func _process(_delta: float) -> void:
	if not character.is_playing():
		play_animation("idle")

func _on_dash_inputted():
	play_animation("dash")

func _on_jump_inputted():
	play_animation("jump")

func _on_melee_inputted():
	play_animation("melee")

func _on_ranged_inputted():
	play_animation("ranged")

func _on_special_inputted():
	play_animation("special")
	
func play_animation(animation_name: String, direction: String = "default"):
	# Play character animation
	if character.sprite_frames.has_animation(animation_name):
		set_character_direction(direction)
		character.play(animation_name)
	else:
		print(animation_name + " animation not found for character!")

	# Play VFX animation
	if vfx.sprite_frames.has_animation(animation_name):
		var fx_instance = vfx.duplicate(true)
		fx_instance.global_position = global_position
		var current_scene_root = get_tree().current_scene
		if current_scene_root:
			current_scene_root.add_child(fx_instance)
		else:
			print("Error: Current scene root not found.")

		fx_instance.play(animation_name)
	else:
		print(animation_name + " animation not found for VFX!")

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

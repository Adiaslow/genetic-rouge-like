class_name AudioManager
extends Node2D

@onready var input_manager: InputManager = get_node("../Input")

@onready var dash: AudioStreamPlayer = $Dash
@onready var death: AudioStreamPlayer = $Death
@onready var hurt: AudioStreamPlayer = $Hurt
@onready var idle: AudioStreamPlayer = $Idle
@onready var jump: AudioStreamPlayer = $Jump
@onready var melee: AudioStreamPlayer = $Melee
@onready var ranged: AudioStreamPlayer = $Ranged
@onready var special: AudioStreamPlayer = $Special
@onready var walk: AudioStreamPlayer = $Walk

@export var dash_sound: AudioStream
@export var dash_volume_db: float = -20
@export var dash_pitch_bounds: Vector2 = Vector2(1,1)

@export var death_sound: AudioStream
@export var death_volume_db: float = -20
@export var death_pitch_bounds: Vector2 = Vector2(1,1)

@export var hurt_sound: AudioStream
@export var hurt_volume_db: float = -20
@export var hurt_pitch_bounds: Vector2 = Vector2(1,1)

@export var idle_sound: AudioStream
@export var idle_volume_db: float = -20
@export var idle_pitch_bounds: Vector2 = Vector2(1,1)

@export var jump_sound: AudioStream
@export var jump_volume_db: float = -20
@export var jump_pitch_bounds: Vector2 = Vector2(1,1)

@export var melee_sound: AudioStream
@export var melee_volume_db: float = -20
@export var melee_pitch_bounds: Vector2 = Vector2(1,1)

@export var ranged_sound: AudioStream
@export var ranged_volume_db: float = -20
@export var ranged_pitch_bounds: Vector2 = Vector2(1,1)

@export var special_sound: AudioStream
@export var special_volume_db: float = -20
@export var special_pitch_bounds: Vector2 = Vector2(1,1)

@export var walk_sound: AudioStream
@export var walk_volume_db: float = -20
@export var walk_pitch_bounds: Vector2 = Vector2(1,1)


func _init() -> void:
	pass

func _ready() -> void:
	dash.stream = dash_sound if dash_sound else null
	death.stream = death_sound if death_sound else null
	hurt.stream = hurt_sound if hurt_sound else null
	idle.stream = idle_sound if idle_sound else null
	jump.stream = jump_sound if jump_sound else null
	melee.stream = melee_sound if melee_sound else null
	ranged.stream = ranged_sound if ranged_sound else null
	special.stream = special_sound if special_sound else null
	walk.stream = walk_sound if walk_sound else null
	
	input_manager.connect("started_moving", _on_started_moving)
	input_manager.connect("stopped_moving", _on_stopped_moving)
	input_manager.connect("dash_inputted", play_dash_sound)
	input_manager.connect("jump_inputted", play_jump_sound)
	input_manager.connect("melee_inputted", play_melee_sound)
	input_manager.connect("ranged_inputted", play_ranged_sound)
	input_manager.connect("special_inputted", play_special_sound)

func play_dash_sound() -> void:
	if dash.stream:
		dash.volume_db = dash_volume_db
		dash.pitch_scale = randf_range(dash_pitch_bounds.x,dash_pitch_bounds.y)
		dash.play()
	else:
		print("Dash sound not found!")

func play_death_sound() -> void:
	if death.stream:
		death.volume_db = death_volume_db
		death.pitch_scale = randf_range(death_pitch_bounds.x, death_pitch_bounds.y)
		death.play()
	else:
		print("Death sound not found!")

func play_hurt_sound() -> void:
	if hurt.stream:
		hurt.volume_db = hurt_volume_db
		hurt.pitch_scale = randf_range(hurt_pitch_bounds.x, hurt_pitch_bounds.y)
		hurt.play()
	else:
		print("Hurt sound not found!")
			
func play_idle_sound() -> void:
	if idle.stream:
		idle.volume_db = idle_volume_db
		idle.pitch_scale = randf_range(idle_pitch_bounds.x, idle_pitch_bounds.y)
		idle.play()
	else:
		print("Idle sound not found!")
		
func play_jump_sound() -> void:
	if jump.stream:
		jump.volume_db = jump_volume_db
		jump.pitch_scale = randf_range(jump_pitch_bounds.x, jump_pitch_bounds.y)
		jump.play()
	else:
		print("Jump sound not found!")
		
func play_melee_sound() -> void:
	if melee.stream:
		melee.volume_db = melee_volume_db
		melee.pitch_scale = randf_range(melee_pitch_bounds.x, melee_pitch_bounds.y)
		melee.play()
	else:
		print("Melee sound not found!")
		
func play_ranged_sound() -> void:
	if ranged.stream:
		ranged.volume_db = ranged_volume_db
		ranged.pitch_scale = randf_range(ranged_pitch_bounds.x, ranged_pitch_bounds.y)
		ranged.play()
	else:
		print("Ranged sound not found!")
		
func play_special_sound() -> void:
	if special.stream:
		special.volume = special_volume_db
		special.pitch_scale = randf_range(special_pitch_bounds.x, special_pitch_bounds.y)
		special.play()
	else:
		print("Special sound not found!")
		
func _on_started_moving():
	if not walk.playing:
		play_walk_sound()
		
func _on_stopped_moving():
	walk.stop()
		
func play_walk_sound() -> void:
	if walk.stream:
		walk.volume_db = walk_volume_db
		walk.pitch_scale = randf_range(walk_pitch_bounds.x, walk_pitch_bounds.y)
		walk.play()
	else:
		print("Walk sound not found!")

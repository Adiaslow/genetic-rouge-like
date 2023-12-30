class_name EnemyManager
extends RigidBody2D

@export_group("General")
@export var enemy_scene: PackedScene
@export var enemy_stats: StatsManager

@export_group("Visual")
@export var animated_sprite_path: NodePath
@export var vfx_sprite_path: NodePath

@export_group("Audio")
@export var walk_sound_path: AudioStream
@export var attack_sound_path: AudioStream
@export var hurt_sound_path: AudioStream
@export var death_sound_path: AudioStream
@export var sound_player_path: NodePath

var stats_manager: StatsManager
var animation_manager: AnimationManager
var vfx_manager: VFXManager
var audio_manager: AudioManager

func _init():
	# Initialize animation manager
	var animated_sprite: AnimatedSprite2D = get_node_or_null(animated_sprite_path)
	if animated_sprite:
		animation_manager = AnimationManager.new(animated_sprite)
		
	# Initialize VFX manager
	var vfx_sprite: AnimatedSprite2D = get_node_or_null(vfx_sprite_path)
	if vfx_sprite:
		vfx_manager = VFXManager.new(vfx_sprite)

	# Initialize audio manager
	var audio_player: AudioStreamPlayer = get_node_or_null(sound_player_path)
	if audio_player:
		audio_manager = AudioManager.new(walk_sound_path, attack_sound_path, hurt_sound_path, death_sound_path, audio_player)

func _enter_tree():
	# Code that runs when the node enters the scene tree
	pass

func _ready():
	pass
	
	
func _process(_delta):
	# Per-frame logic here
	pass

func _physics_process(_delta):
	# Physics-related per-frame logic here
	pass

func _exit_tree():
	# Cleanup code here
	pass

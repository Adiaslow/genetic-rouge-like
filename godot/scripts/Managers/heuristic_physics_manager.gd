class_name HeuristicPhysicsManager
extends Node2D

@onready var rigid_body: RigidBody2D = get_node("..")
@onready var input_manager = get_node("../Input")

@onready var applied_force = preload("res://scripts/resources/forces/applied_force.tres")
@onready var drag_force = preload("res://scripts/resources/forces/drag_force.tres")
@onready var frictional_force = preload("res://scripts/resources/forces/frictional_force.tres")
@onready var gravitational_force = preload("res://scripts/resources/forces/gravitational_force.tres")
@onready var movement_input_force = preload("res://scripts/resources/forces/movement_input_force.tres")
@onready var normal_force = preload("res://scripts/resources/forces/normal_force.tres")
# @onready var spring_force = preload("res://scripts/resources/forces/spring_force.tres")

@export var movement_force_multiplier: float = 100
@export var dash_force_multiplier: float = 1000

var axis: Vector2 = Vector2.ZERO

func _ready() -> void:
	input_manager.connect("axis_changed", _on_axis_changed)
	# input_manager.connect("started_moving", _on_started_moving)
	# input_manager.connect("stopped_moving", _on_stopped_moving)
	input_manager.connect("dash_inputted", _on_dash_inputted)
	# input_manager.connect("jump_inputted", play_jump_sound)
	# input_manager.connect("melee_inputted", play_melee_sound)
	# input_manager.connect("ranged_inputted", play_ranged_sound)
	# input_manager.connect("special_inputted", play_special_sound)
	

func _process(_delta) -> void:
	pass

func _physics_process(_delta):
	rigid_body.apply_central_impulse(axis * movement_force_multiplier)
	
func _on_axis_changed(new_axis: Vector2):
	axis = new_axis

func _on_dash_inputted():
	rigid_body.apply_central_impulse(axis * dash_force_multiplier)

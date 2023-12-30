class_name HeuristicPhysicsManager
extends Node2D

@onready var applied_force = preload("res://scripts/resources/forces/applied_force.tres")
@onready var drag_force = preload("res://scripts/resources/forces/drag_force.tres")
@onready var frictional_force = preload("res://scripts/resources/forces/frictional_force.tres")
@onready var gravitational_force = preload("res://scripts/resources/forces/gravitational_force.tres")
@onready var movement_input_force = preload("res://scripts/resources/forces/movement_input_force.tres")
@onready var normal_force = preload("res://scripts/resources/forces/normal_force.tres")
# @onready var spring_force = preload("res://scripts/resources/forces/spring_force.tres")

func _ready() -> void:
	pass
	

func _process(_delta) -> void:
	pass

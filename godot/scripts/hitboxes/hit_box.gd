class_name HitBox2D
extends Area2D

@export var damage := 10
@export var knockback := 10

func _init():
	collision_layer = 2
	collision_mask = 0

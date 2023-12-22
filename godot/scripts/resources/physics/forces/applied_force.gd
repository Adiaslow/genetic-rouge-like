@tool
extends Resource
class_name AppliedForce

const vector_utilities = preload("res://utilities/vector_utilities.gd")

@export var scaling_factor : Vector3 = Vector3(1, 1, 1);

var _this_force : Vector3

func get_force(force) -> Vector3:
	_this_force = vector_utilities.hadamard_product(force, scaling_factor)
	return _this_force

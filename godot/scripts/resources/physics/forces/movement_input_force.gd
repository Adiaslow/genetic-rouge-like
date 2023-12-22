@tool
extends Resource
class_name MovementInputForce

const vector_utilities = preload("res://utilities/vector_utilities.gd")

@export_group("Parameters")
@export var input_scaling_factor : Vector3 = Vector3(8, 6, 100);

var _this_force : Vector3

func get_force(normalized_movement_input) -> Vector3:
	_this_force = vector_utilities.hadamard_product(normalized_movement_input, input_scaling_factor)
	return _this_force

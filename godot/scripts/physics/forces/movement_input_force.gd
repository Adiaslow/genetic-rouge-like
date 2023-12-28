@tool
extends Resource
class_name MovementInputForce

@export_group("Parameters")
@export var input_scaling_factor : Vector3 = Vector3(8, 6, 100);

var _this_force : Vector3

func get_force(input) -> Vector3:
	_this_force = input.normalized() * input_scaling_factor
	return _this_force

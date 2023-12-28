@tool
extends Resource
class_name  SpringForce

@export_group("Parameters")
@export var spring_constant : float = 0.5

var _this_force : Vector3

func get_force(reference_vector) -> Vector3:
	_this_force = (-1) * spring_constant * reference_vector
	return _this_force

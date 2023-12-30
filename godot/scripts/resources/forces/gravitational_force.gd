@tool
extends Resource
class_name GravitationalForce

@export_group("Parameters")
@export var g : float = 9.8;

var _this_force : Vector3

func get_force() -> Vector3:
	_this_force = Vector3 (0,0,-g)
	return _this_force

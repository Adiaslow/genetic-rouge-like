@tool
extends Resource
class_name AppliedForce

var _this_force : Vector3

func get_force(force) -> Vector3:
	_this_force = force
	return _this_force

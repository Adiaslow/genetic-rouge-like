@tool
extends Resource
class_name NormalForce

@export_group("Parameters")
@export var z_axis_multiplier : float = -1

var _this_force : Vector3

func get_force(net_force) -> Vector3:
	_this_force = Vector3(0, 0, z_axis_multiplier * net_force.z)
	return _this_force

@tool
extends Resource
class_name NormalForce

var _this_force : Vector3

func get_force(net_force: Vector3, position: Vector3, surface_normal: Vector3 = Vector3(0,0,1)) -> Vector3:
	if position.z <= 0:  # Assuming z = 0 is the surface level
		# Project the net force onto the surface normal
		var force_perpendicular_to_surface = net_force.dot(surface_normal) * surface_normal
		# The normal force is equal and opposite to the force perpendicular to the surface
		_this_force = -force_perpendicular_to_surface
	else:
		_this_force = Vector3.ZERO

	return _this_force

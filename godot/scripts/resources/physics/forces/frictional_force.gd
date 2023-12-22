@tool
extends Resource
class_name FrictionalForce

const vector_utilities = preload("res://utilities/vector_utilities.gd")

@export_group("Parameters")
@export var static_friction_coefficient : float = 0.7
@export var kinetic_friction_coefficient : float = 0.25

var _this_force : Vector3
var _is_moving : bool
var _coefficient_of_friction : float
var _this_force_magnitude : float

func get_force(normal_force, velocity) -> Vector3:
	if velocity.length() > 0.0:
		_is_moving = true
		
	_coefficient_of_friction = kinetic_friction_coefficient \
							 if _is_moving \
							 else static_friction_coefficient
	
	if (_is_moving):
		_this_force_magnitude = _coefficient_of_friction \
							  * normal_force.length()
		_this_force = vector_utilities.hadamard_product(velocity.normalized(), \
														Vector3(1,1,0) * (-1))
	else:
		_this_force = Vector3(0,0,0);
	return _this_force

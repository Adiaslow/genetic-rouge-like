@tool
extends Resource
class_name DragForce

const vector_utilities = preload("res://utilities/vector_utilities.gd")

@export_group("Parameters")
@export var drag_coefficient : float = 1.28
@export var fluid_density : float = 1.225
@export var drag_scaling_factor : Vector3 = Vector3(0.2, 0.2, 0.05);
@export var shape_scaling_factor : Vector3 = Vector3(0.01, 0.01, 0.01);

var _this_force : Vector3
var _is_moving : bool
var _cross_sectional_area : float
var _drag_magnitude : float
var _drag_direction : Vector3
var _scaled_shape : Vector3

func get_force(shape, velocity) -> Vector3:
	if velocity.length() > 0.0:
		_is_moving = true
	
	if (_is_moving):
		_scaled_shape = vector_utilities.hadamard_product(shape, \
														  shape_scaling_factor);
		_cross_sectional_area = PI \
							  * _scaled_shape.x \
							  * _scaled_shape.x # Assume shape is a sphere
		# F_d = 0.5 * Cd * A * rho * v^2
		_drag_magnitude = 0.5 \
						* drag_coefficient \
						* _cross_sectional_area \
						* fluid_density \
						* velocity.length_squared()
		
		_drag_direction = vector_utilities.hadamard_product(velocity.normalized(), \
															(-1) * drag_scaling_factor)
	else:
		_this_force = Vector3(0,0,0);
	return _this_force

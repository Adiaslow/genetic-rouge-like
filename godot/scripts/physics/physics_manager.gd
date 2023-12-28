extends Node2D

@export var delta_scaler : float = 0.01


@onready var _applied_force = preload("res://scripts/resources/physics/forces/applied_force.tres")
@onready var _drag_force = preload("res://scripts/resources/physics/forces/drag_force.tres")
@onready var _frictional_force = preload("res://scripts/resources/physics/forces/frictional_force.tres")
@onready var _gravitational_force = preload("res://scripts/resources/physics/forces/gravitational_force.tres")
@onready var _movement_input_force = preload("res://scripts/resources/physics/forces/movement_input_force.tres")
@onready var _normal_force = preload("res://scripts/resources/physics/forces/normal_force.tres")
# @onready var _spring_force = preload("res://scripts/resources/physics/forces/spring_force.tres")



var _adjusted_delta : float

var _transform3d : Vector3 = Vector3.ZERO
var _position3d : Vector3 = Vector3.ZERO
var _new_position3d : Vector3 = Vector3.ZERO
var _velocity : Vector3 = Vector3.ZERO
var _new_velocity : Vector3 = Vector3.ZERO
var _acceleration : Vector3 = Vector3.ZERO
var _new_acceleration : Vector3 = Vector3.ZERO
var _average_acceleration : Vector3 = Vector3.ZERO

var _net_force : Vector3 = Vector3.ZERO
var _applied_force_value : Vector3 = Vector3.ZERO
var _drag_force_value : Vector3 = Vector3.ZERO
var _frictional_force_value : Vector3 = Vector3.ZERO
var _gravitational_force_value : Vector3 = Vector3.ZERO
var _movement_input_force_value : Vector3 = Vector3.ZERO
var _normal_force_value : Vector3 = Vector3.ZERO
# var _spring_force_value : Vector3 = Vector3.ZERO
var _new_net_force : Vector3 = Vector3.ZERO
var _movement_input : Vector3 = Vector3.ZERO

var _new_applied_force : bool = false

func apply_force(force : Vector3):
	_new_applied_force = true
	_applied_force_value = _applied_force.get_force(force)
	
func compute_net_force(shape):
	# print("Applied Force: ", _applied_force_value)
	_drag_force_value = _drag_force.get_force(shape, _velocity) * 0.005
	# print("Drag Force: ", _drag_force_value)
	_gravitational_force_value = _gravitational_force.get_force()
	# print("Gravitational Force: ", _gravitational_force_value)
	_movement_input_force_value = _movement_input_force.get_force(_movement_input)
	# print("Movement Input Force: ", _movement_input_force_value)
	_normal_force_value = _normal_force.get_force(_gravitational_force_value, _position3d)
	# print("Normal Force: ", _normal_force_value)
	_frictional_force_value = _frictional_force.get_force(_normal_force_value, _velocity, _net_force) * 0.1
	# print("Frictional Force: ", _frictional_force_value)
	_new_net_force =  _drag_force_value + _frictional_force_value \
				   + _gravitational_force_value + _movement_input_force_value \
				   + _normal_force_value
	if _new_applied_force:
		_new_net_force += _applied_force_value
		print(_new_net_force)
		_new_applied_force = false
	# print("Net Force: ", _new_net_force, "\n")

	return _new_net_force

func compute_average_acceleration(mass):
	_new_acceleration = _new_net_force / mass
	_average_acceleration = (_new_acceleration + _acceleration) * 0.5
	return _average_acceleration

func compute_velocity(velocity):
	_new_velocity = velocity + 0.5 * (_average_acceleration)#  * _adjusted_delta
	return _new_velocity

func compute_position():
	# Calculate the new position
	_new_position3d = _position3d + _velocity * _adjusted_delta + 0.5 * _acceleration#  * _adjusted_delta * _adjusted_delta
	return _new_position3d
	
func update_physics(_transform, velocity, shape, mass, axis, delta):
	velocity = Vector3(velocity.x, velocity.y, 0)
	_movement_input = Vector3(axis.x, axis.y, 0)
	_adjusted_delta = delta * delta_scaler
	_transform3d = Vector3(_transform.get_origin().x, _transform.get_origin().y, _transform3d.z)
	_net_force = compute_net_force(shape)
	_acceleration = compute_average_acceleration(mass)
	_velocity = compute_velocity(velocity)
	_position3d = compute_position()
	if _position3d.z < 0:
		_acceleration.z = 0
		_velocity.z = 0
		_position3d.z = 0
	return [_position3d, _velocity, _acceleration, _net_force]

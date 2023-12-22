extends Resource
class_name PhysicsResource

@export_group("Physical Constants")
@export var g = 9.8

@export_group("Agent Properties")
@export var mass = 1

@export_group("Forces")
@export var applied_force = Resource
@export var drag_force = Resource
@export var frictional_force = Resource
@export var gravitational_force = Resource
@export var movement_input_force = Resource
@export var normal_force = Resource
@export var spring_force = Resource

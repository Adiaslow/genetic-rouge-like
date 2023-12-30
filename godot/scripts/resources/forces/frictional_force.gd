@tool
extends Resource
class_name FrictionalForce

@export var static_friction_coefficient: float = 0.7
@export var kinetic_friction_coefficient: float = 0.50
@export var velocity_threshold: float = 0.1  # Threshold for considering an object in motion

func get_force(normal_force: Vector3, velocity: Vector3, applied_force: Vector3 = Vector3.ZERO) -> Vector3:
	var friction_force = Vector3.ZERO
	var normal_force_magnitude = normal_force.length()
	var velocity_magnitude = velocity.length()

	if velocity_magnitude > velocity_threshold:
		# Object is moving, apply kinetic friction
		friction_force = velocity.normalized() * -kinetic_friction_coefficient * normal_force_magnitude
	else:
		# Object is not moving, apply static friction
		var max_static_friction = static_friction_coefficient * normal_force_magnitude
		var applied_force_magnitude = applied_force.length()
		
		if applied_force_magnitude < max_static_friction:
			# Applied force is not enough to overcome static friction
			friction_force = -applied_force
		else:
			# Applied force overcomes static friction, apply kinetic friction instead
			friction_force = velocity.normalized() * -kinetic_friction_coefficient * normal_force_magnitude

	return friction_force * Vector3(1, 1, 0)

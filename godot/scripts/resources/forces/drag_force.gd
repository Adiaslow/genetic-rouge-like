@tool
extends Resource
class_name DragForce

@export_group("Parameters")
@export var drag_coefficient: float = 1.0
@export var fluid_density: float = 1.225 # Typical air density at sea level in kg/m^3

func get_force(shape, velocity) -> Vector3:
	if velocity.length_squared() <= 0.1:
		return Vector3.ZERO  # No drag if there's minimal movement

	# Calculate the cross-sectional area based on the shape of the object
	var cross_sectional_area = calculate_cross_sectional_area(shape)

	# Drag force calculation: F_d = 0.5 * Cd * A * rho * v^2
	var drag_magnitude = 0.5 * drag_coefficient * cross_sectional_area * fluid_density * velocity.length_squared()
	var drag_direction = -velocity.normalized()  # Opposite to the direction of velocity

	var drag_force = drag_magnitude * drag_direction
	return drag_force

func calculate_cross_sectional_area(shape) -> float:
	# Assuming the shape is a 2D shape with a defined area property
	# For more complex shapes, this calculation will need to be adapted
	if shape.has_method("get_area"):
		return shape.get_area()
	else:
		# Default area calculation if not specifically defined
		# You might want to log an error or warning here
		return 1.0  # Default area

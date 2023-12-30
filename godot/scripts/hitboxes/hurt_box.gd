class_name HurtBox2D
extends Area2D

# @onready var hit_sound : AudioStreamPlayer = get_node("../HitSound")

func _init():
	collision_layer = 0
	collision_mask = 2
	
func _ready() -> void:
	connect("area_entered", _on_area_entered)

func _on_area_entered(hit_box: HitBox2D) -> void:
	if hit_box == null or hit_box.owner == owner:
		return

	var entry_direction = (hit_box.global_position - global_position).normalized()

	var hit_was_successful = false

	if owner.is_in_group("player") and hit_box.owner.is_in_group("enemy"):
		# Player hit by enemy
		process_hit(hit_box, entry_direction)
		hit_was_successful = true
	elif owner.is_in_group("enemy") and hit_box.owner.is_in_group("player"):
		# Enemy hit by player
		process_hit(hit_box, entry_direction)
		hit_was_successful = true
	if hit_was_successful:
		# hit_sound.pitch_scale = randf_range(1.8,2)
		# hit_sound.play()
		pass

func process_hit(hit_box: HitBox2D, entry_direction: Vector2) -> void:
	if owner.has_method("take_damage"):
		owner.take_damage(hit_box.damage)
	if owner.has_method("take_knockback"):
		owner.take_knockback(entry_direction * -hit_box.knockback)


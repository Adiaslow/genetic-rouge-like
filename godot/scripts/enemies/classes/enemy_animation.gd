extends Node
class_name EnemyAnimation

# Private member variables for each animation
var _idle_animation: Animation
var _walk_animation: Animation
var _attack_animation: Animation
var _death_animation: Animation

# Constructor
func _init(idle: Animation, walk: Animation, attack: Animation, death: Animation):
	_idle_animation = idle
	_walk_animation = walk
	_attack_animation = attack
	_death_animation = death

# Public methods to control animations
func play_idle() -> void:
	# Logic to play idle animation
	play_animation(_idle_animation)

func play_walk() -> void:
	# Logic to play walking animation
	play_animation(_walk_animation)

func play_attack() -> void:
	# Logic to play attack animation
	play_animation(_attack_animation)

func play_death() -> void:
	# Logic to play death animation
	play_animation(_death_animation)

# Private method to handle animation playing
func play_animation(animation: Animation) -> void:
	# Logic to play the given animation
	# This could involve interfacing with an AnimationPlayer node, for example
	pass

# Additional methods for animation-related logic can be added here

class_name InputManager
extends Node2D

@onready var timers = get_node("../Timers")

var previous_axis = Vector2.ZERO

signal axis_changed(new_axis)
signal started_moving
signal stopped_moving
signal dash_inputted
signal jump_inputted
signal melee_inputted
signal ranged_inputted
signal special_inputted

func _process(_delta):
	check_axis_input()
	check_action_input("dash", "dash_inputted")
	check_action_input("jump", "jump_inputted")
	check_action_input("melee", "melee_inputted")
	check_action_input("ranged", "ranged_inputted")
	check_action_input("special", "special_inputted")

func check_axis_input():
	var new_axis = Vector2.ZERO
	new_axis.x = int(Input.is_action_pressed("right")) - int(Input.is_action_pressed("left"))
	new_axis.y = int(Input.is_action_pressed("down")) - int(Input.is_action_pressed("up"))
	new_axis = new_axis.normalized()
	if new_axis != previous_axis:
		emit_signal("axis_changed", new_axis)
		if new_axis != Vector2.ZERO and previous_axis == Vector2.ZERO:
			emit_signal("started_moving")
		elif new_axis == Vector2.ZERO and previous_axis != Vector2.ZERO:
			emit_signal("stopped_moving")
		previous_axis = new_axis

func check_action_input(action_name: String, signal_name: String):
	if Input.is_action_just_pressed(action_name) and timers.cooldown_timers[action_name].time_left <= 0:
		emit_signal(signal_name)
		timers.cooldown_timers[action_name].start(timers.cooldowns[action_name])

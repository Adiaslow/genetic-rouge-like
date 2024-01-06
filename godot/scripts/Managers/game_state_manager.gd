extends Node2D

enum GameState { TITLE, GAME }
var current_state = GameState.TITLE
var current_scene = null

@onready var title_scene = preload("res://scenes/title.tscn")
@onready var world_scene = preload("res://scenes/world.tscn")

func _ready():
	pass

func change_state(new_state: GameState):
	print("Changing state to: ", new_state)
	if current_scene:
		current_scene.queue_free()
		
	current_state = new_state
	match current_state:
		GameState.TITLE:
			current_scene = title_scene.instantiate()
		GameState.GAME:
			current_scene = world_scene.instantiate()
	add_child(current_scene)

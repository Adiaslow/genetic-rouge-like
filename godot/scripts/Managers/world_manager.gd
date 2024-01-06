extends Node2D

@onready var music = $Music
@onready var under_water = $UnderWater
@onready var door_sound = $DoorSound
# @onready var meta_population := $MetaPopulation

func _init():
	pass
	
func _enter_tree():
	pass
		
# Called when the node enters the scene tree for the first time.
func _ready():
	for effect_instance in get_tree().get_nodes_in_group("effects"):
		effect_instance.disable_effect()
	door_sound.play()
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	# meta_population.update_meta_population()
	pass

func _physics_process(_delta):
	# Physics-related per-frame logic here
	pass

func _exit_tree():
	# Cleanup code here
	pass

extends Node2D

@onready var music = $Music
@onready var under_water := $UnderWater
@onready var door_sound := $DoorSound
@onready var meta_population := $MetaPopulation

# Called when the node enters the scene tree for the first time.
func _ready():
	music.play()
	under_water.play()
	door_sound.play()
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	meta_population.update_meta_population()

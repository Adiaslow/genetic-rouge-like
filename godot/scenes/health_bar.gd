extends MarginContainer

@onready var health_bar = $HPBar
@onready var player = get_node("../../Player")

var player_health

# Called when the node enters the scene tree for the first time.
func _ready():
	pass

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	player_health = player.health
	health_bar.value = player_health

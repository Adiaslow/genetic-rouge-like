extends TextureButton

@export var bobbing_amplitude = 1
@export var bobbing_frequency = 5
var original_position = Vector2()  # To store the original position of the button
var elapsed_time = 0.0

# Called when the node enters the scene tree for the first time.
func _ready():
	connect("pressed", _on_Button_pressed)
	original_position = position
	
func _process(delta):
	elapsed_time += delta
	var new_y = original_position.y + bobbing_amplitude * sin(bobbing_frequency * elapsed_time)
	position.y = new_y
	
func _on_Button_pressed():
	if GameStateManager:
		GameStateManager.change_state(GameStateManager.GameState.GAME)
	else:
		print("GameStateManager not found.")

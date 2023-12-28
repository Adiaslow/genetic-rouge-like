extends Node
class_name EnemySound

# Private member variables for each sound
var _walk_sound: AudioStream
var _attack_sound: AudioStream
var _hurt_sound: AudioStream
var _death_sound: AudioStream
var _sound_player: AudioStreamPlayer

# Constructor
func _init(walk: AudioStream, attack: AudioStream, hurt: AudioStream, death: AudioStream, sound_player: AudioStreamPlayer):
	_walk_sound = walk
	_attack_sound = attack
	_hurt_sound = hurt
	_death_sound = death
	_sound_player = sound_player

# Public methods to control sounds
func play_walk_sound():
	play_sound(_walk_sound)

func play_attack_sound():
	play_sound(_attack_sound)

func play_hurt_sound():
	play_sound(_hurt_sound)

func play_death_sound():
	play_sound(_death_sound)

# Private method to handle sound playing
func play_sound(sound: AudioStream):
	if _sound_player and sound:
		_sound_player.stream = sound
		_sound_player.play()

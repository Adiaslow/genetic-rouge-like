extends Resource
class_name PlayerStatsResource

@export_group("General")
@export var health : float = 100.0
@export var verticle_walk_speed : float = 6.0
@export var horizontal_walk_speed : float = 8.0
@export var melee_damage : float = 10.0
@export var projectile_damage : float = 5.0
@export var mass : float = 3.0

@export_group("Cooldown Durations")
@export var melee_cooldown_duration : int = 500
@export var projectile_cooldown_duration : int = 500
@export var hurt_cooldown_duration : int = 1000
@export var jump_cooldown_duration : int = 300
@export var dash_cooldown_duration : int = 10000

func _init(_health = 100.0, _verticle_walk_speed = 6.0,\
		   _horizontal_walk_speed = 8.0, _melee_damage = 10.0, \
		   _projectile_damage = 5.0, _mass = 3.0, \
		   _melee_cooldown_duration = 500, _projectile_cooldown_duration = 500, \
		   _hurt_cooldown_duration = 1000, _jump_cooldown_duration = 300, \
		   _dash_cooldown_duration = 10000):
	health = _health
	verticle_walk_speed = _verticle_walk_speed
	horizontal_walk_speed = _horizontal_walk_speed
	melee_damage = _melee_damage
	projectile_damage = _projectile_damage
	mass = _mass
	melee_cooldown_duration = _melee_cooldown_duration
	projectile_cooldown_duration = _projectile_cooldown_duration
	hurt_cooldown_duration = _hurt_cooldown_duration
	jump_cooldown_duration = _jump_cooldown_duration
	dash_cooldown_duration = _dash_cooldown_duration

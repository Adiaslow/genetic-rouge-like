extends Resource
class_name EnemyStatsResource

@export_group("General")
@export var health: float = 100.0
@export var vertical_walk_speed: float = 6.0
@export var horizontal_walk_speed: float = 8.0
@export var melee_damage: float = 10.0
@export var projectile_damage: float = 5.0
@export var mass: float = 3.0

@export_group("Cooldown Durations")
@export var melee_cooldown_duration: int = 500
@export var projectile_cooldown_duration: int = 500
@export var hurt_cooldown_duration: int = 1000
@export var jump_cooldown_duration: int = 300
@export var dash_cooldown_duration: int = 10000

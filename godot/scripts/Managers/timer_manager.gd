class_name TimerManager
extends Node2D

@onready var dash_cooldown_timer: Timer = $DashCooldown
@onready var death_timer: Timer = $DeathTimer
@onready var jump_cooldown_timer: Timer = $JumpCooldown
@onready var melee_cooldown_timer: Timer = $MeleeCooldown
@onready var ranged_cooldown_timer: Timer = $RangedCooldown
@onready var special_cooldown_timer: Timer = $SpecialCooldown

@export var damage_cooldown: float = 1
@export var dash_cooldown: float = 1
@export var death_length: float = 1
@export var jump_cooldown: float = 1
@export var melee_cooldown: float = 1
@export var ranged_cooldown: float = 1
@export var special_cooldown: float = 1

var cooldown_timers: Dictionary
var cooldowns: Dictionary

# Called when the node enters the scene tree for the first time.
func _ready():
	cooldown_timers = {"dash": dash_cooldown_timer, \
					   "jump": jump_cooldown_timer, \
					   "melee": melee_cooldown_timer, \
					   "ranged": ranged_cooldown_timer, \
					   "special": special_cooldown_timer, \
					  }
	cooldowns = {"dash": dash_cooldown, \
				 "jump": jump_cooldown, \
				 "melee": melee_cooldown, \
				 "ranged": ranged_cooldown, \
				 "special": special_cooldown, \
				}

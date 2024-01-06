class_name PlayerManager
extends RigidBody2D

@onready var stats: StatsManager = $Stats
@onready var input: InputManager = $Input
@onready var physics_collider: CollisionShape2D = $PhysicsCollider
@onready var classical_physics: ClassicalPhysicsManager = $ClassicalPhysics
@onready var heuristic_physics: HeuristicPhysicsManager = $HeuristicPhysics
@onready var audio: AudioManager = $Audio
@onready var h_boxes:  = $HBoxes
@onready var graphics: GraphicsManager = $Graphics
@onready var timers: TimerManager = $Timers

func _init():
	add_to_group("enemy")
	
func _enter_tree():
	pass

func _ready():
	pass
	
func _process(_delta):
	pass	

func _physics_process(_delta):
	pass

func _exit_tree():
	pass

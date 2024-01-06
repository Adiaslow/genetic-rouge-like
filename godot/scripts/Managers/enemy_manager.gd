class_name EnemyManager
extends RigidBody2D

@onready var stats: StatsManager = $Stats
@onready var brain = $Brain
@onready var physics_collider: CollisionShape2D = $PhysicsCollider
@onready var classical_physics: ClassicalPhysicsManager = $ClassicalPhysics
@onready var heuristic_physics: HeuristicPhysicsManager = $HeuristicPhysics
@onready var audio: AudioManager = $Audio
@onready var h_boxes:  = $HBoxes
@onready var graphics: GraphicsManager = $Graphics
@onready var timers: TimerManager = $Timers

var base_enemy
var player

var enemy_id
var fitness : float = 0.0
var score : float = 0.0
var lifespan : int
var is_dead : bool
var has_spawned : bool
var decisions : Array
var vision : Array

var distance_to_player
var move_angle : float = 0
var move_vector : Vector3 = Vector3(0,0,0)
	
func _init():
		add_to_group("enemy")
		brain = Brain.new(4, 2)
		score = 1
		is_dead = false
		has_spawned = false
		decisions = []
		vision = []
	
func _enter_tree():
	player = get_tree().get_root().get_node("Player")

func _ready():
	base_enemy = preload("res://scenes/enemy.tscn")
	
func _process(_delta):
	pass	

func _physics_process(_delta):
	pass

func _exit_tree():
	pass
	
func update_enemy():
	if is_dead:
		handle_death()
	else:
		look()
		think()
		premove()
		update_score()
		handle_attack()

func clone():
	var enemy_clone = base_enemy.instantiate()
	enemy_clone.brain = brain.clone()
	return enemy_clone

func crossover(parent):
	var child = base_enemy.instantiate()
	if parent.fitness < fitness:
		child.brain = brain.crossover(parent.brain)
	else:
		child.brain = parent.brain.crossover(brain)
	child.brain.mutate()
	return child
	
func look():
	distance_to_player = position.distance_to(player.position)
	var target_angle = atan2(player.position.y - position.y, \
							 player.position.x - position.x)
	vision = [linear_velocity.x, linear_velocity.y, distance_to_player, target_angle]
	# print("Distance = ", current_distance_to_player)
func think():
	decisions = brain.feed_forward(vision)

func premove():
	if decisions.size() > 0:
		move_angle = decisions[0] * 2 * PI
		move_vector = Vector3(cos(move_angle),sin(move_angle),0)

func move():
	axis = move_vector
	
func update_score():
	var proximity_score = 1-exp(-pow(distance_to_player, -1))
	score += proximity_score
	lifespan+=1

func calculate_fitness():
	var normalized_distance = pow(distance_to_player+1,-1)
	fitness = score * normalized_distance
		
func die():
	graphics.play_animation("death")
	audio.play_death_sound()
	is_dead = true
	timers.death_timer.start(timers.death_length)
	# get_parent().num_alive-=1

func handle_death():
	if timers.death_timer.time_left <= 0:
		get_parent().remove_child(self)
		pass
			
func handle_attack():
	"""if decisions[1] && timers.melee_cooldown_timer.time_left <=0:
		animations.play("attack")
		hit_box_shape.disabled = false
		melee_cooldown.start(0.5)
		melee_animation_timer.start(0.2)
		hit_box_timer.start(0.1)
	elif hit_box_timer.time_left <= 0:
		hit_box_shape.disabled = true
	else:
		pass"""

	pass

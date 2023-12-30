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

var inputs: Dictionary

func _init():
	pass
	
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

"""
@onready var player_stats = preload("res://scripts/player/player_stats.tres")
@onready var animations := $Animations
@onready var particle_fx := $ParticleFX

@onready var physics_shape := $PhysicsShape
@onready var left_hit_box_shape := $LeftHitBox/LeftHitBoxShape
@onready var right_hit_box_shape := $RightHitBox/RightHitBoxShape
@onready var center_hit_box_shape := $CenterHitBox/CenterHitBoxShape

@onready var hit_box_timer := $HitBoxActive
@onready var custom_physics := $Physics
@onready var walking_sound := $WalkingSound
@onready var walking_sound_timer := $WalkingSoundTimer
@onready var attack_sound := $AttackSound
@onready var melee_animation_timer := $MeleeAnimationTimer
@onready var melee_cooldown := $MeleeCooldown

@onready var axis : Vector3 = Vector3.ZERO

@export var speed_multiplier : float = 1

var _verlet_physics : Array = [Vector3.ZERO, Vector3.ZERO]
@export var timesteps : int = 10

var isAttacking : bool = false
var health

# Called when the node enters the scene tree for the first time.
func _ready():
	add_to_group("player")
	health = player_stats.health

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	handle_attack()
	handle_animation()
	handle_sound()

func _physics_process(delta):
	for i in timesteps:
		move(delta)
	
func get_input_axis():
	axis.x = int(Input.is_action_pressed("move_right")) \
		   - int(Input.is_action_pressed("move_left"))
	axis.y = int(Input.is_action_pressed("move_down")) \
		   - int(Input.is_action_pressed("move_up"))
	return axis.normalized()
	
func take_damage(amount):
	animations.play("crab_hurt")
	print("Took Damage: ", amount)
	apply_damage(amount)
		
func apply_damage(amount):
	health -= amount
	if health <= 0:
		die()

func take_knockback(force):
	var impulse = force / player_stats.mass 
	velocity += impulse # Directly modify the velocity
	
func die():
	animations.play("crab_death")

func left_attack():
	animations.play("crab_attack_left")
	particle_fx.flip_h = true
	particle_fx.flip_v = true
	particle_fx.rotation = 55
	particle_fx.position.x = -30
	particle_fx.position.y = 20
	particle_fx.play("melee")
	attack_sound.pitch_scale = randf_range(1.0,2)
	attack_sound.play()
	left_hit_box_shape.disabled = false
	
func right_attack():
	animations.play("crab_attack_right")
	particle_fx.flip_h = true
	particle_fx.flip_v = false
	particle_fx.rotation = 55
	particle_fx.position.x = 30
	particle_fx.position.y = 20
	particle_fx.play("melee")
	attack_sound.pitch_scale = randf_range(1.0,2)
	attack_sound.play()
	right_hit_box_shape.disabled = false
	
func handle_attack():
	if Input.is_action_pressed("melee_attack") && melee_cooldown.time_left <=0:
		if axis.x < 0:
			left_attack()
		elif axis.x > 0:
			right_attack()
		else:
			if randi_range(0,2) < 1:
				left_attack()
			else:
				right_attack()
		melee_cooldown.start(0.5)
		melee_animation_timer.start(0.2)
		hit_box_timer.start(0.1)
	elif hit_box_timer.time_left <= 0:
		center_hit_box_shape.disabled = true
		left_hit_box_shape.disabled = true
		right_hit_box_shape.disabled = true

func move(delta):
	axis = get_input_axis()
	_verlet_physics = custom_physics.update_physics(transform, velocity, physics_shape.shape, \
												  player_stats.mass, \
												  axis, delta)
	play_slide_fx()
	apply_movement()
	move_and_slide()

func play_slide_fx(): # Position the instance
	if axis.x <= -1 and velocity.x > 0:
		particle_fx.rotation = 0
		particle_fx.flip_v = false
		var fx_instance = particle_fx.duplicate(true)  # Create a duplicate of the particle_fx node
		fx_instance.global_position = global_position
		fx_instance.flip_h = true
		fx_instance.offset.x = 30
		fx_instance.offset.y = 15
		get_parent().add_child(fx_instance)  # Add the instance to a higher node in the scene tree
		fx_instance.play("slide")
	elif axis.x >= 1 and velocity.x < 0:
		particle_fx.rotation = 0
		particle_fx.flip_v = false
		var fx_instance = particle_fx.duplicate(true)  # Create a duplicate of the particle_fx node
		fx_instance.global_position = global_position
		fx_instance.flip_h = false
		fx_instance.offset.x = -30
		fx_instance.offset.y = 15
		get_parent().add_child(fx_instance)  # Add the instance to a higher node in the scene tree
		fx_instance.play("slide")
		
	
	
func apply_movement():
	velocity = (Vector2(_verlet_physics[1].x, _verlet_physics[1].y) + 0.5 * Vector2(_verlet_physics[2].x, _verlet_physics[2].y))  * speed_multiplier
	# print("Position: ", _verlet_physics[0])
	# print("Velocity: ", _verlet_physics[1])
	# print("Acceleration: ", _verlet_physics[2])
	# print("\n")

func handle_animation():
	if melee_animation_timer.time_left <= 0:
		if axis.x < 0:
			animations.play("crab_walk_left")
		elif axis.x > 0:
			animations.play("crab_walk_right")
		elif axis.length() != 0:
			animations.play("crab_walk_left")
		elif axis.length() == 0:
			animations.play("crab_idle")
		else:
			animations.play("crab_idle")

func handle_sound():
	if axis.length() >= 0.5 && walking_sound_timer.time_left <= 0:
		walking_sound.play()
		walking_sound_timer.start(0.8)
	elif axis.length() < 0.5 && walking_sound_timer.time_left <= 0.78:
		walking_sound.stop()
		walking_sound_timer.stop()
	if isAttacking:
		attack_sound.pitch_scale = randf_range(1.0,2)
		attack_sound.play()
	
"""

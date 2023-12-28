class_name Enemy
extends CharacterBody2D

@export var enemy_scene: PackedScene
@export_group("Animation")
@export var idle_anim_path: String
@export var walk_anim_path: String
@export var attack_anim_path: String
@export var death_anim_path: String

@export_group("Sound")
@export var walk_sound_path: AudioStream
@export var attack_sound_path: AudioStream
@export var hurt_sound_path: AudioStream
@export var death_sound_path: AudioStream
@export var sound_player_path: AudioStreamPlayer

var enemy_animation: EnemyAnimation
var enemy_sound: EnemySound

func _init(_idle_anim: Animation, _walk_anim: Animation, _attack_anim: Animation, _death_anim: Animation):
	enemy_animation = EnemyAnimation.new(_idle_anim, _walk_anim, _attack_anim, _death_anim)

func _ready():
	if not enemy_scene:
		enemy_scene = preload("res://scenes/enemy.tscn")

	# if not enemy_animation: # IMPLEMENTME
		# var idle_anim = preload("idle_anim_path")
		# var walk_anim = preload("walk_anim_path")
		# var attack_anim = preload("attack_anim_path")
		# var death_anim = preload("death_anim_path")
		# enemy_animations = EnemyAnimations.new(idle_anim, walk_anim, attack_anim, death_anim)

func _process(_delta):
	pass

func _physics_process(_delta):
	pass
	
func _exit_tree():
	pass

"""
class BaseEnemy extends CharacterBody2D:	
	var base_enemy = preload("res://scenes/enemy.tscn")
	var enemy_stats = preload("res://scripts/resources/enemy_stats.tres")

	var animations
	var collider_shape
	var hit_box_shape
	var hit_box_timer
	var custom_physics
	var walking_sound
	var walking_sound_timer
	var attack_sound
	var hurt_sound
	var death_sound
	var death_timer
	var melee_animation_timer
	var melee_cooldown

	var axis : Vector3 = Vector3.ZERO
	var health : float = enemy_stats.health
	var melee_damage : float = enemy_stats.melee_damage	
		
	var player
	var enemy_id
	var brain : ArtificialBrain
	var fitness : float = 0.0
	var score : float = 0.0
	var lifespan : int
	var is_dead : bool
	var has_spawned : bool
	var decisions : Array
	var vision : Array

	var current_position
	var player_position
	var current_distance_to_player
	var current_move_angle : float = 0
	var current_move_vector : Vector3 = Vector3(0,0,0)

	var _verlet_physics : Array = [Vector3.ZERO, Vector3.ZERO]
	@export var timesteps : int = 10

	var isAttacking : bool = false
		
	func _ready():
		base_enemy = preload("res://scenes/enemy.tscn")
		enemy_stats = preload("res://scripts/resources/enemy_stats.tres")
		
		animations = $Animations
		collider_shape = $PhysicsShape
		hit_box_shape = $HitBox/HitBoxShape
		hit_box_timer = $HitBoxActive
		custom_physics = $Physics
		walking_sound = $WalkingSound
		walking_sound_timer = $WalkingSoundTimer
		attack_sound = $AttackSound
		hurt_sound = $HurtSound
		death_sound = $DeathSound
		death_timer = $DeathTimer
		melee_animation_timer = $MeleeAnimationTimer
		melee_cooldown = $MeleeCooldown

		axis = Vector3.ZERO
		health = enemy_stats.health
		melee_damage = enemy_stats.melee_damage
		
	# Called when the node enters the scene tree for the first time.
	func _init():
		player = get_node(".")
		# print(player)
		add_to_group("enemy")
		brain = ArtificialBrain.new(4, 2)
		score = 1
		is_dead = false
		has_spawned = false
		decisions = []
		vision = []
		hit_box_timer
		
	# Called every frame. 'delta' is the elapsed time since the previous frame.
	func _process(_delta):
		pass
		
	func update_enemy():
		if is_dead:
			velocity = Vector2.ZERO
			handle_death()
		else:
			look()
			think()
			premove()
			update_score()
			handle_attack()
			handle_animation()
			handle_sound()
		
	func _physics_process(delta):
		for i in timesteps:
			move(delta)
		
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
		current_position = transform.get_origin()
		player_position = player.transform.origin
		current_distance_to_player = current_position.distance_to(player_position)
		var target_angle = atan2(player_position.y - current_position.y, \
								 player_position.x - current_position.x)
		vision = [velocity.x, velocity.y, current_distance_to_player, target_angle]
		# print("Distance = ", current_distance_to_player)
	func think():
		decisions = brain.feed_forward(vision)
		
	func premove():
		if decisions.size() > 0:
			current_move_angle = decisions[0] * 2 * PI
			current_move_vector = Vector3(cos(current_move_angle),sin(current_move_angle),0)

	func update_score():
		var proximity_score = 1-exp(-pow(current_distance_to_player, -1))
		score += proximity_score
		lifespan+=1

	func calculate_fitness():
		var normalized_distance = pow(current_distance_to_player+1,-1)
		fitness = score * normalized_distance

	func take_damage(amount):
		animations.play("jelly_fish_hurt")
		hurt_sound.pitch_scale = randf_range(0.4,0.6)
		hurt_sound.play()
		print("Inflicted Damage: ", amount)
		apply_damage(amount)
			
	func apply_damage(amount):
		health -= amount
		if health <= 0:
			die()

	func take_knockback(force):
		var impulse = force / enemy_stats.mass 
		velocity += impulse # Directly modify the velocity
		
	func die():
		animations.play("jelly_fish_death")
		death_sound.play()
		is_dead = true
		death_timer.start(0.5)
		get_parent().num_alive-=1


	func handle_death():
		if death_timer.time_left <= 0:
			get_parent().remove_child(self)
			
	func handle_attack():
		if decisions[1] && melee_cooldown.time_left <=0:
			animations.play("jelly_fish_attack")
			hit_box_shape.disabled = false
			melee_cooldown.start(0.5)
			melee_animation_timer.start(0.2)
			hit_box_timer.start(0.1)
		elif hit_box_timer.time_left <= 0:
			hit_box_shape.disabled = true
		else:
			pass

		
	func move(delta):
		axis = current_move_vector.normalized()
		_verlet_physics = custom_physics.update_physics(transform, velocity, collider_shape.shape, \
													  enemy_stats.mass, \
													  axis, delta)

		apply_movement()
		move_and_slide()


	func apply_movement():
		velocity += 0.5 * Vector2(_verlet_physics[2].x, _verlet_physics[2].y) / timesteps

	func handle_animation():
		if melee_animation_timer.time_left <= 0:
			if axis.x < 0:
				animations.flip_h = true
				animations.play("jelly_fish_walk")
			elif axis.x > 0:
				animations.flip_h = false
				animations.play("jelly_fish_walk")
			elif axis.length() != 0:
				animations.flip_h = false
				animations.play("jelly_fish_walk_left")
			elif axis.length() == 0:
				animations.flip_h = false
				animations.play("jelly_fish_idle")
			else:
				animations.flip_h = false
				animations.play("jelly_fish_idle")

	func handle_sound():
		if axis.length() >= 0.5 && walking_sound_timer.time_left <= 0:
			walking_sound.pitch_scale = randf_range(0.7,1.0)
			walking_sound.play()
			walking_sound_timer.start(1)
		elif axis.length() < 0.5 && walking_sound_timer.time_left <= 0.78:
			walking_sound.stop()
			walking_sound_timer.stop()
		if isAttacking:
			attack_sound.pitch_scale = randf_range(1.0,1.5)
			attack_sound.play()
"""

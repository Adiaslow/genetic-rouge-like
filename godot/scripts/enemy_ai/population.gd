class_name Population
extends Node2D

var population_id
var base_enemy
var world

var population_size : int = 10
var population : Array = []
var best_player
var best_fitness := 0
var generation : int = 0
var mating_pool = []
var num_alive = 0
var max_alive = 5

func _ready():
	pass
	
# Called when the node enters the scene tree for the first time.
func _init():
	world = get_node(".")
	base_enemy = preload("res://scenes/enemy.tscn")
	# print(world)
	population = []
	best_fitness = 0
	generation = 0
	mating_pool = []
		
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	pass

func generate_population():
	for i in population_size:
		var new_enemy = base_enemy.instantiate()
		new_enemy.enemy_id = str(population_id,"E",i)
		new_enemy.name = new_enemy.enemy_id
		if i == 0:
			best_player = new_enemy
		population.append(new_enemy)
		
func handle_spawning():
	var spawn_radius = 500 # Adjust as needed
	var world_center = get_world_center()  # Use the appropriate method to get world center
	for enemy in population:
		if !enemy.has_spawned:
			if randf() < 0.01 and num_alive < max_alive:
				var random_offset = Vector2(randf_range(-spawn_radius, spawn_radius), randf_range(-spawn_radius, spawn_radius))
				enemy.position = world_center + random_offset
				enemy.has_spawned = true
				add_child(enemy)
				num_alive+=1
			elif num_alive == 0 and max_alive > 0:
				var random_offset = Vector2(randf_range(-spawn_radius, spawn_radius), randf_range(-spawn_radius, spawn_radius))
				enemy.position = world_center + random_offset
				enemy.has_spawned = true
				add_child(enemy)
				num_alive+=1
				
func get_world_center():
	var viewport = get_viewport_rect()
	return viewport.size * 0.5
	
func update_alive():
	for enemy in population:
		if !enemy.is_dead:
			enemy.update_enemy()
			enemy.update_score()
			
func done():
	for enemy in population:
		if !enemy.is_dead:
			return false
	return true
	
func natural_selection():
	calculate_fitness()
	# var average_sum = get_average_score()
	var children = []
	fill_mating_pool()
	
	for i in range(population.size()):
		var parent_1 = select_player()
		var parent_2 = select_player()
		var child_brain = parent_1.crossover(parent_2.brain) # Crossover
		child_brain.brain.mutate() # Mutation
		var new_enemy = population[i].duplicate() # Clone the enemy
		new_enemy.brain = child_brain
		children.append(new_enemy)
	population = children.duplicate()
	generation += 1
	for element in population:
		element.controller.brain.generate_network()
		best_player.controller.lifespan = 0
		best_player.controller.dead = false
		best_player.controller.score = 1
	
func calculate_fitness():
	var current_max = 0
	for enemy in population:
		enemy.calculate_fitness()
		if enemy.fitness > best_fitness:
			best_fitness = enemy.fitness
			best_player = enemy.clone()
		if enemy.fitness > current_max:
			current_max = enemy.fitness
	for enemy in population:
		enemy.fitness /= current_max
		
func fill_mating_pool():
	mating_pool.clear()
	for enemy in population:
		var fitness = enemy.fitness
		var n = int(fitness * 100)
		for i in range(n):
			mating_pool.append(enemy)

func select_player():
	if mating_pool.size() == 0:
		return population[randf()*population.size()]
	else:
		return mating_pool[randf()*mating_pool.size()]
	
func get_average_score() -> float:
	var total_score = 0
	var population_count = population.size()
	if population_count == 0:
		return 0
	for enemy in population:
		total_score += enemy.score
	var average_score: float = total_score / population_count
	return average_score


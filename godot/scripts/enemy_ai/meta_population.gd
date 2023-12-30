class_name MetaPopulation
extends Node2D

@export var num_populations : int = 4
@export var max_lifespan : int = 250

@onready var base_population = preload("res://scenes/population.tscn")

var populations = []
var population_scores = []
var average_scores = []

func _ready():
	populations.clear()
	population_scores.clear()
	average_scores.clear()

	for i in num_populations:
		var new_population = base_population.instantiate()
		new_population.population_id = str("P",i)
		new_population.name = new_population.population_id
		new_population.generate_population()
		add_child(new_population)
		populations.append(new_population)
		population_scores.append(0)

func update_meta_population():
	update_populations()
	# update_population_scores()
	adjust_max_lifespan()
	perform_natural_selection()

func update_populations():
	for population in populations:
		if !population.done():
			population.handle_spawning()
			population.update_alive()

func adjust_max_lifespan():
	if populations[0].generation % 20 == 0:
		max_lifespan+=10
	
func update_population_scores():
	for population in populations:
		average_scores.append(population.get_average_score())

	# Optionally, reset scores for each new evaluation
	# for i in range(len(population_scores)):
	#     population_scores[i] = 0

	# Update scores for all populations, not just the winning one, to track progress over time
	for i in range(average_scores.size()):
		population_scores[i] = average_scores[i]
		
	# Log the scores to monitor changes over time; comment out logs in production
	# print("Average scores:", average_scores)
	# print("Population scores:", population_scores)
	
func perform_natural_selection():
	for population in populations:
		population.natural_selection()

extends Node2D
class_name Brain

var num_inputs : int
var num_outputs : int
var layers : int
var next_neuron : int

var neurons : Array[Neuron]
var synapses : Array[Synapse]

func _init(_num_inputs, _num_outputs, _offspring = false):
	num_inputs = _num_inputs
	num_outputs = _num_outputs
	layers = 2
	next_neuron = 0
	neurons = []
	synapses = []
	
	if !_offspring:
		for i in num_inputs:
			neurons.append(Neuron.new(next_neuron, 0))
			next_neuron+=1
		for i in num_outputs:
			neurons.append(Neuron.new(next_neuron,1,true))
			next_neuron+=1
		for i in num_inputs:
			for j in range(num_inputs, num_inputs + num_outputs):
				var weight = randf() * num_inputs * sqrt(2) * pow(num_inputs, -0.5)
				synapses.append(Synapse.new(neurons[i], neurons[j], weight))

func generate_network() -> void:
	for neuron in neurons:
		neuron.synaptic_outputs.clear()
	for synapse in synapses:
		synapse.input_neuron.synaptic_outputs.append(synapse)
	sort_by_layer()

func feed_forward(input_values : Array) -> Array:
	generate_network()
	for neuron in neurons:
		neuron.input_sum = 0
	for i in num_inputs:
		neurons[i].output_value = input_values[i]
	var result = []
	for neuron in neurons:
		neuron.engage()
		if neuron.is_output:
			result.append(neuron.output_value)
	return result
	
func crossover(partner):
	var offspring = Brain.new(num_inputs, num_outputs, true)
	offspring.next_neuron = next_neuron
	for i in num_inputs:
		var neuron = neurons[i].clone()
		if neuron.is_output:
			var partner_neuron = partner.neurons[partner.get_neuron(neuron.number)]
			if randf() > 0.5:
				neuron.activation_function = partner_neuron.activation_function
				neuron.bias = partner_neuron.bias
		offspring.neurons.append(neuron)
	# var max_layer = 0
	for i in synapses.size():
		var index = common_synapse(synapses[i].get_inovation_number(),partner.synapses)
		if index != -1:
			var synapse = synapses[i].clone() if randf() > 0.5 else partner.synapses[index].clone()
			var input_neuron = offspring.neurons[offspring.get_neuron(synapse.input_neuron.number)]
			var output_neuron = offspring.neurons[offspring.get_neuron(synapse.output_neuron.number)]
			synapse.input_neuron = input_neuron
			synapse.output_neuron = output_neuron
			if input_neuron && output_neuron:
				offspring.synapses.append(synapse)
		else:
			var synapse = synapses[i].clone()
			var input_neuron = offspring.neurons[offspring.get_neuron(synapse.input_neuron.number)]
			var output_neuron = offspring.neurons[offspring.get_neuron(synapse.output_neuron.number)]
			synapse.input_neuron = input_neuron
			synapse.output_neuron = output_neuron
			if input_neuron && output_neuron:
				offspring.synapses.append(synapse)
	offspring.layers = layers
	return offspring	

func mutate():
	if randf() < 0.8:
		for i in synapses.size():
			synapses[i].mutate_weight()
	if randf() < 0.5:
		for i in neurons.size():
			neurons[i].mutate_bias()
	if randf() < 0.1:
		for i in neurons.size():
			neurons[i].mutate_activation()
	if randf() < 0.05:
		add_synapse()
	if randf() < 0.01:
		add_neuron()

func add_neuron():
	var synapse_index = floor(randf() * synapses.size())
	var picked_synapse = synapses[synapse_index]
	picked_synapse.is_enabled = false
	synapses.remove_at(synapse_index)
	var new_neuron = Neuron.new(next_neuron, picked_synapse.input_neuron.layer + 1)
	for neuron in neurons:
		if neuron.layer > picked_synapse.input_neuron.layer:
			neuron.layer+=1
	var new_synapse_1 = Synapse.new(picked_synapse.input_neuron, new_neuron, 1.0)
	var new_synapse_2 = Synapse.new(new_neuron, picked_synapse.output_neuron, picked_synapse.weight)
	layers+=1
	synapses.append(new_synapse_1)
	synapses.append(new_synapse_2)
	neurons.append(new_neuron)
	next_neuron+=1
	
func add_synapse():
	if fully_connected():
		return true
	var neuron_1_index = floor(randf() * neurons.size())
	var neuron_2_index = floor(randf() * neurons.size())
	while neurons[neuron_1_index].layer == neurons[neuron_2_index].layer or \
		  neurons_connected(neurons[neuron_1_index], neurons[neuron_2_index]):
		neuron_1_index = floor(randf() * neurons.size())
		neuron_2_index = floor(randf() * neurons.size())
	if neurons[neuron_1_index].layer > neurons[neuron_2_index].layer:
		var temp = neuron_1_index
		neuron_1_index = neuron_2_index
		neuron_2_index = temp
	var new_synapse = Synapse.new(neurons[neuron_1_index], \
								  neurons[neuron_2_index], \
								  randf() * num_inputs * sqrt(2) * pow(num_inputs, -0.5))
	synapses.append(new_synapse)
		
func common_synapse(innovation_number, others_synapses):
	for i in others_synapses.size():
		if (innovation_number == others_synapses[i].get_inovation_number()):
			return i
	return -1
	
func neurons_connected(neuron_1_index, neuron_2_index):
	for i in synapses.size():
		var synapse = synapses[i]
		if (synapse.input_neuron == neuron_1_index and \
			synapse.output_neuron == neuron_2_index) or \
			(synapse.input_neuron == neuron_2_index and \
			synapse.output_neuron == neuron_1_index):
			return true
	return false
	
func fully_connected():
	var max_synapses = 0
	var neurons_per_layer = []
	for neuron in neurons:
		if (neurons_per_layer[neuron.layer]):
			neurons_per_layer[neuron.layer]+=1
		else:
			neurons_per_layer[neuron.layer] = 1
	for i in range(layers-1):
		for j in range(i + 1, layers):
			max_synapses += neurons_per_layer[i] * neurons_per_layer[j]
	return max_synapses == synapses.size()
	
func sort_by_layer():
	neurons.sort_custom(compare_layers)

func compare_layers(a, b):
	return a.layer - b.layer

func clone():
	var cloneed_brain = Brain.new(num_inputs, num_outputs)
	cloneed_brain.neurons = neurons.slice(0, neurons.size())
	cloneed_brain.synapses = synapses.slice(0, synapses.size())
	return cloneed_brain
	
func get_neuron(x):
	for i in neurons.size():
		if neurons[i].number == x:
			return i
	return -1
	
func calculate_weight():
	return synapses.size() + neurons.size()


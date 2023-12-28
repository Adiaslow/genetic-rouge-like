class_name Synapse

var input_neuron : Neuron
var output_neuron : Neuron
var weight : float
var is_enabled : bool

func _init(_input_neuron, _output_neuron, _weight):
	input_neuron = _input_neuron
	output_neuron = _output_neuron
	weight = _weight
	is_enabled = true
	
func mutate_weight():
	if randf() < 0.05:
		weight = randf_range(-1,1)
	else:
		weight += randfn(0,1) * 0.02
	
func clone():
	var synapse_clone = Synapse.new(input_neuron, output_neuron, weight)
	synapse_clone.is_enabled = true
	return synapse_clone
	
func get_inovation_number():
	var inovation_number = 0.5 \
						 * (input_neuron.number + output_neuron.number) \
						 * (input_neuron.number + output_neuron.number + 1) \
						 + output_neuron.number
	return inovation_number

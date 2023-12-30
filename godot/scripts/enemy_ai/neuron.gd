class_name Neuron

var number : int
var layer : int
var activation_function : int
var bias : float
var is_output : bool

var input_sum : float
var output_value : float
var synaptic_outputs : Array[Synapse]

func _init(_number, _layer, _is_output = false):
	number = _number
	layer = _layer
	activation_function = randi_range(0,5)
	bias = randf_range(-1,1)
	is_output = _is_output
	
	input_sum = 0
	output_value = 0
	synaptic_outputs = []
	
func engage():
	if layer != 0:
		output_value = activation(input_sum + bias)
		
	for synapse in synaptic_outputs:
		if synapse.is_enabled:
			synapse.output_neuron.input_sum += synapse.weight * output_value

func mutate_bias():
	if randf() < 0.05:
		bias = randf_range(-1,1)
	else:
		bias += randfn(0,1) * 0.02
		
func mutate_activation():
	activation_function = randi_range(0,5)
	
func is_connected_to(neuron):
	if neuron.layer == layer:
		return false
	if neuron.layer < layer:
		for synapse in synaptic_outputs:
			if synapse.output_neuron == self:
				return true
	else:
		for synapse in synaptic_outputs:
			if synapse.output_neuron == Neuron:
				return true
	return false
			
func clone():
	var neuron_clone = Neuron.new(number,layer,is_output)
	neuron_clone.bias = bias
	neuron_clone.activation_function = activation_function
	return neuron_clone
	
func activation(x):
	match activation_function:
		0: # Sigmoid
			return 1 / (1 + exp(-4.9 * x))
		1: # Identity
			return x
		2: # Step
			return 1 if x > 0 else 0
		3: # Tanh
			return tanh(x)
		4: #ReLU
			return 0 if x < 0 else x
		_: # Sigmoid
			return 1 / (1 + exp(-4.9 * x))

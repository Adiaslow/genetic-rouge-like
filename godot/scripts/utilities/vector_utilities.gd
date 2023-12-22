static func hadamard_product(vector_1, vector_2):
	var _new_vector = Vector3(0,0,0)
	_new_vector.x = vector_1.x * vector_2.x
	_new_vector.y = vector_1.y * vector_2.y
	_new_vector.z = vector_1.z * vector_2.z
	return _new_vector

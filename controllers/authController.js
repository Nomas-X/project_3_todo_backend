// requirements
const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { first_name: '', last_name: '', email: '', password: '' };

	// duplicate error code
	if (err.code === 11000) {
		errors.email = 'That email is already registered';
		return errors;
	}

	// validation errors
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
}

// module exporting

module.exports.signup_post = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	
	try {
		const user = await User.create({ first_name, last_name, email, password });
		res.status(201).json(user);
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.signup_get = (req, res) => {
	res.send("This is a test!23");
}

module.exports.signin_post = async (req, res) => {
	const { email, password } = req.body;

	res.send(req.body);
	console.log(req.body);
}



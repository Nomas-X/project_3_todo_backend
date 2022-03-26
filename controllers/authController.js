// requirements
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/authMiddleware');


// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { first_name: '', last_name: '', email: '', password: '' };

	// incorrect email
	if (err.message === 'Email is unregistered or incorrect') {
		errors.email = err.message;
	}

	if (err.message === 'Password is incorrect') {
		errors.password = err.message;
	}

	// duplicate error code
	if (err.code === 11000) {
		errors.email = 'This email is already registered';
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

const maxAge = 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'Dummy Secret', {
		expiresIn: maxAge
	});
}
const createId_Token = (id) => {
	return jwt.sign({ id }, 'Dummy Secret', {
		expiresIn: maxAge * 24 * 365
	});
}

// module exporting

module.exports.signcheck_get = async (req, res) => {

	try {
		requireAuth(req, res);
	}
	catch (err) {
		res.status(400).json('Authentication failed due to a server side error!');
	}
};

module.exports.signout = async (req, res) => {

	try {
		const token = createToken('');
		const id_token = createId_Token('');
		res.cookie('jwt', token, { httpOnly: true, maxAge: 1});
		res.cookie('UID', id_token, { httpOnly: true, maxAge: 1 });
		res.status(200).json("Signout Successful");
	}
	catch (err) {
		res.status(400).json('Signout Failed');
	}
};

module.exports.signup_post = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	
	try {
		const user = await User.create({ first_name, last_name, email, password });
		const token = createToken(user._id);
		const id_token = createId_Token(user._id);
		res.cookie('jwt', token, { httpOnly: true,  maxAge: maxAge * 1000 });
		res.cookie('UID', id_token, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });
		res.status(201).json({ user: user._id });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.signin_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.signin(email, password);
		const token = createToken(user._id);
		const id_token = createId_Token(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
		res.cookie('UID', id_token, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });
		res.status(200).json({ user: user._id });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
}



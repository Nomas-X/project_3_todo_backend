// requirements
const List = require('../models/List');

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { Error: '' };
	errors.Error = err.message;
	return errors;
}

// module exporting

module.exports.add = async (req, res) => {
	const { id, item } = req.body;
	console.log(req.body);

	try {
		const list = await List.add(id, item);
		res.status(200).json({ list });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.delete = async (req, res) => {
	const { id, item } = req.body;
	console.log(req.body);

	try {
		const list = await List.delete(id, item);
		res.status(200).json({ list });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.deleteAll = async (req, res) => {
	const { id } = req.body;
	console.log(req.body);

	try {
		const list = await List.deleteAll(id);
		res.status(200).json({ list });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
// requirements
const { findList, findUID } = require('../middleware/todoMiddleware');
const Item = require('../models/Item');

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { Error: '' };
	errors.Error = err.message;
	return errors;
}

// module exporting

module.exports.find = async (req, res) => {

	try {
		findList(req, res);
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.add = async (req, res) => {
	const item = req.body;

	try {
		uid = findUID(req, res);
		item.uid = uid;
		const docCreate = await Item.add(item);
		findList(req, res);
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.delete = async (req, res) => {
	const id = req.body._id;

	try {
		const list = await Item.delete(id);
		findList(req, res);
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
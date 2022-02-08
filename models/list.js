const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
	{
		owner: {
			type: String, //Use randomly generated ID over email.
			required: true,
		},
		pending: {
			type: Array,
			required: true,
		},
		completed: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

const List = mongoose.model('List', listSchema);
module.exports = List;



handleSubmit = async (e) => {
	e.preventDefault();
	const response = await fetch('/api/world', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ post: this.state.post }),
	});
	const body = await response.text();

	this.setState({ responseToPost: body });
};
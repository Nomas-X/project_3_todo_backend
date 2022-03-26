const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
		uid: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		details: {
			type: String,
		},
		category: {
			type: String,
		},
		color: {
			type: String,
			required: true,
		}
});

// static method to add or remove items
itemSchema.statics.findItems = async function(uid) {
	const itemsList = await this.find({ uid: uid });
	
	if (itemsList) {
			return itemsList;
	} else {
		throw Error("No items with this uid exist")
	}
}

itemSchema.statics.add = async function(item) {
	let docCreate = await this.create(item);
	return docCreate;
}

itemSchema.statics.delete = async function(id) {
	const docDelete = await this.findOneAndDelete({_id: id}); 
	
	if (docDelete) {
		return docDelete;
	}
	throw Error("No item with this id exist")
}

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

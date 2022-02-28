const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
		UID: {
			type: String,
			required: true,
		},
		pending: {
			type: [String],
		},
		completed: {
			type: [String],
		}
});

// static method to add or remove items
listSchema.statics.add = async function(id, item) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = list.pending;
		if(items.indexOf(item) == -1){
			let newItems = items.push(item);
			let doc = await this.findOneAndUpdate({UID: id}, {pending: items});
			return items;
		  }
		  throw Error("This item already exist!")
		
	}
	throw Error("No list with this UID exist")
}

listSchema.statics.delete = async function(id, item) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = list.pending;
		items.splice(items.indexOf(item), 1);
		let doc = await this.findOneAndUpdate({UID: id}, {pending: items});
		return items;
	}
	throw Error("No list with this UID exist")
}

listSchema.statics.deleteAll = async function(id) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = [];
		let doc = await this.findOneAndUpdate({UID: id}, {pending: items});
		return items;
	}
	throw Error("No list with this UID exist")
}

const List = mongoose.model('List', listSchema);
module.exports = List;

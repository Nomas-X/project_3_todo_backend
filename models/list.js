const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
		UID: {
			type: String,
			required: true,
		},
		items: {
			type: [Object],
		}
});

// static method to add or remove items
listSchema.statics.find = async function(id) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = {items: list.items};
			return items;
	}
	throw Error("No list with this UID exist")
}

listSchema.statics.add = async function(id, item) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = list.items;
		
		if(items.indexOf(item) == -1){
			let newItems = items.push(item);
			let doc = await this.findOneAndUpdate({UID: id}, {items: items});
			return items;
		  }
		  throw Error("This item already exist!")
		
	}
	throw Error("No list with this UID exist")
}

listSchema.statics.delete = async function(id, item) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = list.items;
		items.splice(items.indexOf(item), 1);
		let doc = await this.findOneAndUpdate({UID: id}, {items: items});
		console.log(items)
		return items;
	}
	throw Error("No list with this UID exist")
}

listSchema.statics.deleteAll = async function(id) {
	const list = await this.findOne({ UID: id });
	
	if (list) {
		let items = [];
		let doc = await this.findOneAndUpdate({UID: id}, {items: items});
		return items;
	}
	throw Error("No list with this UID exist")
}

const List = mongoose.model('List', listSchema);
module.exports = List;

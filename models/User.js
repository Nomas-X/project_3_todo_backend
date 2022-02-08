const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
		first_name: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 15,
			match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,15}$/, "For the name only use letters and the following symbols ,.'="]
		},
		last_name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 15,
			match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,15}$/, "For the name only use letters and the following symbols ,.'="]
		},
		email: {
			type: String,
			required: [true, 'Please enter an email address'],
			unique: true,
			lowercase: true,
			validate: [isEmail, 'Please enter a valid email address']
		},
		password: {
			type: String,
			required: [true, 'Please enter a password'],
			minLength: [8, 'Minimum password length is 8 characters'],
			match: [/^[/^[A-Za-z\d@$!%*#?&]{8,}$/, "Minimum password length is 8 characters"]
		}
});

// password hasing
userSchema.pre('save', async function (next) {
	const salt = await bycrypt.genSalt();
	this.password = await bycrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

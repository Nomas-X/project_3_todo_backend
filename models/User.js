const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
		first_name: {
			type: String,
			required: true,
			minLength: [3, "Minimum name length is 3 characters"],
			maxLength: [15, "Maximum name length is 15 characters"],
			match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]{3,15}$/, "Only use letters and the following symbols -'"]
		},
		last_name: {
			type: String,
			required: true,
			minLength: [3, "Minimum name length is 3 characters"],
			maxLength: [15, "Maximum name length is 15 characters"],
			match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]{3,15}$/, "Only use letters and the following symbols -'"]
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
			match: [/^[/^[A-Za-z\d@$!%*#?&]{8,}$/, "Only use A-Z, a-z, and \\ /@$!%*#?&"]
		}
});

// password hasing
userSchema.pre('save', async function (next) {
	const salt = await bycrypt.genSalt();
	this.password = await bycrypt.hash(this.password, salt);
	next();
});

// static method to login user
userSchema.statics.signin = async function(email, password) {
	const user = await this.findOne({ email: email });
	if (user) {
		const auth = await bycrypt.compare(password, user.password);
		if (auth) {
			return user
		}
		throw Error('Password is incorrect')
	}
	throw Error('Email is unregistered or incorrect')
}

const User = mongoose.model('User', userSchema);
module.exports = User;

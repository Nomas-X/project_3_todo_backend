const jwt = require('jsonwebtoken');
const Item = require('../models/Item');

const findList = (req, res) => {
	
	const token = req.cookies.jwt;

		// check json webtoken exists & is verified
		if (token) {
			jwt.verify(token, 'Dummy Secret', (err, decodedToken) => {
				if (err) {
					console.log(err.message);
					res.status(401).json('Authentication failed');
				} else {
					console.log(decodedToken);
					const async_fix = async (decodedToken) => {
						const list = await Item.findItems(decodedToken.id)
						res.status(200).json(list);
					}
					async_fix(decodedToken);
				}
			})
		} else {
			res.status(401).json('Authentication missing');
		}
}

const findUID = (req, res) => {
	
	const token = req.cookies.UID;
	let return_uid = '';

		// check json webtoken exists & is verified
		if (token) {
			jwt.verify(token, 'Dummy Secret', (err, decodedToken) => {
				if (err) {
					console.log(err.message);
					res.status(401).json('Authentication failed');
				} else {
					console.log(decodedToken);
					console.log('DECODED TOKEN PTOATO DECODED TOKEN POTATO')
					const uid = decodedToken.id
					console.log(uid)
					return_uid = uid;
				}
			})
		} else {
			res.status(401).json('Authentication missing');
		}
	return return_uid;
}

module.exports = { findList, findUID }
const jwt = require('jsonwebtoken');

const requireAuth = (req, res) => {
	
	const token = req.cookies.jwt;

		// check json webtoken exists & is verified
		if (token) {
			jwt.verify(token, 'Dummy Secret', (err, decodedToken) => {
				if (err) {
					console.log(err.message);
					res.status(401).json('Authentication failed');
				} else {
					res.status(200).json('Authentication successful');
				}
			})
		} else {
			res.status(401).json('Authentication missing');
		}
}

module.exports = { requireAuth }
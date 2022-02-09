const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
	res.cookie('Free Cookie', true, {maxAge: 1000 * 60});
	res.send("API is working properly");
});

module.exports = router;
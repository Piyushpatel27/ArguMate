const express = require('express');
const router = express.Router();

router.get('/name', (req, res) => {
    console.log("Subham route accessed");
    res.send("Hello, this is the name route!");
});

module.exports = router;

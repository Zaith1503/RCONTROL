const express = require('express');
const router = express.Router();

/* var template = require("ejs!../views/index.ejs");
var data = '';
template(data);
 */

// Rutas

router.get('/', (req, res) => {
    res.render('index');
});


module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');
 
router.get('/', (req, res)=>{
    res.status(200).render('login');
});

module.exports = router;

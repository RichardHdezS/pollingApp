const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res)=>{
    res.status(200).render('login');
});

router.get('/signup', (req, res)=>{
    res.status(200).render('signUp');
});

router.get('/home', (req, res)=>{
    res.status(200).render('home');
});

router.get('/view', (req, res)=>{
    res.status(200).render('viewForm');
});


module.exports = router;

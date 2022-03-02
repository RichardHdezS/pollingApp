const express = require('express');
const router = express.Router();
const path = require('path');

//import controllers
const authController =  require('../controllers/auth.controller');
const formController = require('../controllers/forms.controller');
const formResponsesController = require('../controllers/answers.controller');
//routes
router.get('/', authController.lognIn);//Esta ruta no permite renderizar la vista de login
router.post('/signin', authController.signIn); //esta ruta nos permite autenticarnos para iniciar sesion
router.get('/register', authController.register);//esta ruta solo nos renderiza la vista de register
router.post('/signup', authController.signUp);//esta ruta nos permite la autenticacion para registarnos
router.get('/home',authController.gotoHome);

router.get('/newForm', formController.renderView_newForm);
router.post('/saveForm', formController.saveForm);
router.get('/edit/:formName', formController.renderView_editForm);
router.put('/edit/:formId', formController.updateForm)
router.get('/view/:formName',formController.viewForm);
router.delete('/form/:formId',formController.deleteForm);

router.get('/answers/:formName', formResponsesController.viewAnswers);//recivimos el nombre del formulario, solicitamos el formulario en la BD, cargamos el objeto del formulario y redireccionamos al usuario hacia la pagina de visualizacion junto con el objeto para renderizarlo en las vistas

module.exports = router;

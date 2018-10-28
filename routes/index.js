const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const appController = require('../controllers/appController');

// This is how you hide a page from a non-logged in userController
// router.get('/add', authController.isLoggedIn, storeController.addStore);

router.get('/', appController.updateUserStandings, appController.displayHomePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
	userController.validateRegister,
	userController.register,
	authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', userController.updateAccount);
router.post('/account/forgot', authController.forgot);
router.get('/account/reset/:token', authController.reset);
router.post('/account/reset/:token', authController.confirmedPasswords, authController.update);

router.get('/ladder', authController.isLoggedIn, appController.updateUserStandings, appController.displayLadder);

module.exports = router;

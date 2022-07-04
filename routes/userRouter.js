const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/register', userController.registerPage);
router.get('/logout', userController.logout);
router.post('/add', userController.addUser);
router.post('/authorization', userController.authorization);
router.post('/login', userController.login);

module.exports = router;
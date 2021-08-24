const router = require("express").Router();

const userController = require('../controllers/user-controller');

const {isAuthenticated, signup} = require('../middlewares/user-middleware');




// /api/auth/signup
router.post('/signup',signup,userController.signup);

// /api/auth/login
router.post('/login',userController.login);

// /api/auth/user
router.get('/user',isAuthenticated,userController.get_User);



module.exports = router
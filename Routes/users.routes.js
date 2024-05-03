const express = require ('express')
const router = express.Router()


const {registerUser,renderRegister,loginUser,renderLogin, renderProfile}= require ('../Controllers/users.controllers')
const {isAuthenticated} = require ('../Middlewares/isAuthenticated')
const {avoidAuth } = require('../Middlewares/avoidAuth')




router.get('/login',renderLogin)
router.post('/login',loginUser)
router.all('/login',avoidAuth)
// router.route('/login')
// .all(avoidAuth)
// .get(renderLogin)

// router.route('/register')
// .all(avoidAuth)
// .get(renderRegister)
// .post(registerUser)

router.get('/register',renderRegister)
router.post('/register',registerUser)



router.get('/user/profile',isAuthenticated,renderProfile)





module.exports = router;
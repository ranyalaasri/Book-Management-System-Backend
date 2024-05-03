const express = require ('express')
const router = express.Router()

const {GetAllBooks, UpdateBook,renderEdit,GetSingleBook,DeleteBook,AddNewBook,RenderBook} = require ('../Controllers/books.controllers')

const {Sanitize} = require('../Middlewares/Sanitize')
const {Validate} = require('../Middlewares/Validation')
const {isAuthenticated} = require('../Middlewares/isAuthenticated')
const {isAuthor} = require('../Middlewares/isAuthor')





router.get('/',GetAllBooks)
router.get('/delete/:id', isAuthenticated, isAuthor, DeleteBook)


router.get('/view/:id',GetSingleBook) 


router.post('/update/:id',Sanitize,Validate,isAuthenticated,isAuthor,UpdateBook)
// router.post('/update/:id',UpdateBook)
router.get('/update/:id',isAuthenticated,isAuthor,renderEdit)
// router.get('/update/:id',renderEdit) 


router.get('/newBook',isAuthenticated,RenderBook)
router.post('/newBook',Sanitize,Validate,isAuthenticated,AddNewBook);



module.exports = router 
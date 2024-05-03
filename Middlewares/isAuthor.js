const {GetSingleBook} = require ('../Helpers/bookQuery')

exports.isAuthor = async (req,res,next) => {
    const {authorId} = req.user
    console.log(authorId)
    const {id} = req.params
    console.log(id)
    const book = await GetSingleBook(id)
    if(!book) res.status(302).redirect('/')
    if(book.data.authorId !== authorId) return res.status(302).redirect('/')
    next()
}

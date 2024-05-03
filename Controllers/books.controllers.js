const {
    axiosGetBooks,
    axiosDeleteBooks,
    axiosUpdateBooks,
    axiosgetSingleBook,
    axiosCreateBook,
} = require('../api/books')


exports.GetAllBooks = async (req, res) => {
    try {
        const books = await axiosGetBooks();

        if (!books.data) return res.render('AllBooks', { message: 'book not found' })
        res.render('AllBooks', { books: books.data })
    } catch (error) {
        console.log(error)
    }
}

exports.RenderBook = (req, res) => {
    res.render('AddNewBook')
}

exports.AddNewBook = async (req, res) => {
    try {
        const {authorId} = req.user
        const { title, author, genre } = req.body
        const result = await axiosCreateBook({ title, author, genre, authorId: authorId })
        if (!result) return res.send('Book not created')
        res.status(302).redirect('/')
    } catch (error) {
        console.log(error)
    }
}



exports.UpdateBook = async (req, res) => {
    try {
        const id = req.params.id
        const { title, author, genre } = req.body
        console.log(req.body)
        const result = await axiosUpdateBooks(id, { title, author, genre })
        console.log(result)
        if (!result) return res.send('Book not found')
        res.status(302).redirect('/')
    } catch (error) {
        console.log(error)
    }

}
exports.renderEdit = async (req, res) => {
    try {
        const id = req.params.id
        const books = await axiosgetSingleBook(id)
        if (!books) return res.render('UpdateBook', { message: 'Book not found' })
        res.render('UpdateBook', { books: books.data })
    } catch (error) {
        console.log(error)
    }
}


exports.GetSingleBook = async (req, res, next) => {
    try {
        const id = req.params.id
        const books = await axiosgetSingleBook(id)
        if (!books) return res.render('singleBook', { message: 'Book not found' })
        res.render('singleBook', { books: books.data })
    } catch (error) {
        console.log(error)
    }
    next()
}



exports.DeleteBook = async (req, res) => {
    try {
        const id = req.params.id
        const result = await axiosDeleteBooks(id)
        if (!result) return res.render('AllBooks', { message: 'Book not found' })
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}






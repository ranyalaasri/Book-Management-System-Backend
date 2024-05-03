const {axiosgetSingleBook} = require ('../api/books')


const book = {
    GetSingleBook:async(id) => {
        return await axiosgetSingleBook(id)
    }

}

module.exports = book
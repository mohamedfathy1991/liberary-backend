
import { Router } from "express";
import { CreateBook, deleteeBook, getAllbook, getOnebook, updateBook } from "./book.controler.js";

const bookRoute= Router()

bookRoute.post('/book',CreateBook)
bookRoute.get('/book',getAllbook)
bookRoute.route('/book/:id').get(getOnebook).patch(updateBook).delete(deleteeBook)


export default bookRoute
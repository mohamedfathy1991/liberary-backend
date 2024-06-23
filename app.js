import express from 'express'
import userRoute from './src/modules/users/users.route.js'
import { dbconect } from './database/connection.js'
import bookRoute from './src/modules/books/book.routes.js'

const app = express()
const port = 3000
app.use(express.json())



app.use(userRoute)
app.use(bookRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
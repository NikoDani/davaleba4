const express = require('express')
const db = require('./config/db')
const expenseRouter = require('./expenses/expense.route')

const app = express()

app.use(express.json())

app.use('/expenses', expenseRouter)

app.get('/', (req, res) => {
    res.send('hello world')
})

db().then(() => {
    app.listen(3000, () => {
        console.log('server running on http://localhost:3000')
    })
})
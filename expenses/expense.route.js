const { Router } = require("express");
const expenseModel = require("./expense.model");
const isValidObjectId = require("../middlewares/is-valid-object-id");

const expenseRouter = new Router()

expenseRouter.get('/', async (req, res) => {
    const take = Math.min(Number(req.query.take) || 10, 50)
    const page = Math.max(Number(req.query.page) || 1, 1)

    const expenses = await expenseModel
        .find()
        .skip((page - 1) * take)
        .limit(take)

    const total = await expenseModel.countDocuments()

    res.json({
        data: expenses,
        page,
        totalPages: Math.ceil(total / take),
        total
    })
})


expenseRouter.post('/', async (req, res) => {
    const { title, amount, category } = req.body

    if (!title || !amount) {
        return res.status(400).json({
            message: "title and amount are required"
        })
    }

    const newExpense = await expenseModel.create({
        title,
        amount,
        category
    })

    res.status(201).json(newExpense)
})


expenseRouter.get('/:id', isValidObjectId, async (req, res) => {
    const expense = await expenseModel.findById(req.params.id)

    if (!expense) {
        return res.status(404).json({
            message: "expense not found"
        })
    }

    res.json(expense)
})


expenseRouter.put('/:id', isValidObjectId, async (req, res) => {
    const updatedExpense = await expenseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    if (!updatedExpense) {
        return res.status(404).json({
            message: "expense not found"
        })
    }

    res.json(updatedExpense)
})


expenseRouter.delete('/:id', isValidObjectId, async (req, res) => {
    const deletedExpense = await expenseModel.findByIdAndDelete(req.params.id)

    if (!deletedExpense) {
        return res.status(404).json({
            message: "expense not found"
        })
    }

    res.json(deletedExpense)
})

module.exports = expenseRouter
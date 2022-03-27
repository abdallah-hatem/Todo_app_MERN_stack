const Task = require('../models/task')


async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

async function createTask(req, res) {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
async function getTask(req, res) {
    try {
        const { id } = req.params
        const task = await Task.findOne({ _id: id })
        if (!task) {
            return res.status(404).json({ msg: `no task with id: ${id}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
async function deleteTask(req, res) {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete({ _id: id })
        if (!task) {
            res.status(404).json({ msg: `no task found with id:${id}` })
        }
        res.status(200).send()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

async function editTask(req, res) {
    try {
        const { id } = req.params

        const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true, runValidators: true
        })
        if (!task) {
            res.status(404).json({ msg: `no task found with id:${id}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    editTask,
    deleteTask
}
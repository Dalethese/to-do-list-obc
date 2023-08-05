const express = require('express')
const checklistsDependentRoute = express.Router()

const Checklist = require('../models/checklist')
const Task = require('../models/task')
const tasksController = require('../controllers/tasksController')

checklistsDependentRoute.get('/:id/tasks/new', async (req, res) => tasksController.getAll(req, res))
// checklistsDependentRoute.get()
checklistsDependentRoute.post('/:id/tasks', async (req, res) => tasksController.post(req, res))
// checklistsDependentRoute.put()
// checklistsDependentRoute.delete()

module.exports = { checklistDependent: checklistsDependentRoute }
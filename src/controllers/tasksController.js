const Checklist = require("../models/checklist")
const TaskModel = require("../models/task")

const tasksController = {
  getAll: async (req, res) => {
    try {
      let task = TaskModel()
      res.status(200).render('tasks/new', { checklistId: req.params.id, task: task })
    } catch (error) {
      res.status(422).render('pages/error', { error: 'Erro ao carregar o formulário.'})
    }
  },
  post: async (req, res) => {
    let { name } = req.body.task
    let task = new TaskModel({ name, checklist: req.params.id})

    try {
      await task.save()
      let checklist = await Checklist.findById(req.params.id)
      checklist.tasks.push(task)
      await checklist.save()
      res.redirect(`/checklists/${req.params.id}`)
    } catch (error) {
      let errors = error.errors
      res.status(422).render('tasks/new', { task: {...task, errors}, checklistId: req.params.id } )
    }
  },
  delete: async (req, res) => {
    try {
      let task = await TaskModel.findByIdAndDelete(req.params.id)
      let checklists = await Checklist.findById(task.checklist)
      let taskToRemove = checklists.tasks.indexOf(task._id)
      checklists.tasks.splice(taskToRemove, 1)
      checklists.save()
      res.redirect(`/checklists/${checklists._id}`)
    } catch (error) {
      res.status(422).render('/pages/error', { error: 'Erro ao deletar uma tarefa.' })
    }
  },
  put: async (req, res) => {
    let task = await TaskModel.findById(req.params.id)
    try {
      task.set(req.body.task)
      await task.save()
      res.status(200).json({ task })
    } catch (error) {
      res.status(422).json({ task: {...error.errors}})
    }
  }
}

module.exports = tasksController
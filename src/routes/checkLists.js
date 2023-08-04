const express = require('express')
const router = express.Router();
const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    res.status(200).render('checklists/index', { checklists: checklist })
  } catch (error) {
    res.status(422).render('pages/error', { error: 'Erro ao exibir as listas' })
  }
});

router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render('checklists/new', { checklist: checklist })
  } catch (error) {
    res.status(500).render('pages/error', {errors: 'Erro ao carregar o formulário'})
  }
})

router.post('/', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({name})

  try {
    await checklist.save()
    res.redirect('/checklists')
  } catch (error) {
    res.status(422).render('checklists/new', { checklists: {...checklist, error } })
  }
});

router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/show', { checklist: checklist })
    
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir as listas de tarefas' })
  }
})

router.put('/:id', async (req, res) => {
  let { name } = req.body
  let id = req.params.id
  try {
    let checklist = await Checklist.findByIdAndUpdate(id, {name}, {new: true})
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error.message)
  }
})

module.exports = router;
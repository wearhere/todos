const _ = require('underscore');
const express = require('express');
const router = express.Router();

const Todos = require('../../collections/todos');

// TODO(jeff): Need to enable async route support?
router.get('/', async function(req, res) {
  const todos = await Todos.find(req.userId);

  res.json(todos);
});

router.post('/', async function(req, res) {
  let todo = req.body;

  todo = await Todos.create(req.userId, todo);

  res.json(todo);
});

router.patch('/:id', async function(req, res) {
  const todo = _.extend(req.body, { _id: req.params.id });

  await Todos.update(req.userId, todo);

  res.status(204).end();
});

module.exports = router;

const Todos = require('../../collections/todos');

module.exports = async function(req, res) {
  const todos = await Todos.find(req.userId);

  res.render('index', {
    todos,
  });
};

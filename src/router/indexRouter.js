const indexController = require('../controller/indexController')

exports.indexRouter = function (app) {
  app.post('/todo', indexController.createdTodo) // create
  app.get('/user/:userIdx/todos', indexController.readTodo) // read
  app.patch('/todo', indexController.updateTodo) // update
}

const indexController = require('../controller/indexController')

exports.indexRouter = function (add) {
  add.get('/', indexController.dummy)
  add.get('/users', indexController.getUsers)
}

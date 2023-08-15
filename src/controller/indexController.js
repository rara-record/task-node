const indexDao = require('../dao/indexDao')

exports.dummy = function (req, res) {
  return res.send('안녕')
}

exports.getUsers = async function (req, res) {
  // DB 뽑아온 데이터들
  const userRows = await indexDao.getUserRows()
  return res.send(userRows)
}

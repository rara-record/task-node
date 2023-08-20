const { pool } = require('../../database')

exports.getUserRows = async function () {
  try {
    // pool 객체를 사용해서, DB에 접근 하겠다
    const connection = await pool.getConnection(async (coon) => coon)
    try {
      // 쿼리 날리는 부분
      const selectUserQuery = 'SELECT * FROM Users'
      const [row] = await connection.query(selectUserQuery)
      return row
    } catch (err) {
      console.error(`#### getUserRows Query Error: ${err.message} #####`)
      return false
    } finally {
      connection.release() // 쿼리가 끝나면 항상 연결을 끊어준다.
    }
  } catch (err) {
    console.log(`#### getUserRows DB Error: ${err.message} ####`)
    return false
  }
}

exports.insertTodo = async function (userIdx, contents, type) {
  try {
    const connection = await pool.getConnection(async (coon) => coon)
    try {
      const insertTodoQuery = `insert into Todos (userIdx, contents, type) values (?, ?, ?)`
      const insertTodoParams = [userIdx, contents, type]
      const [row] = await connection.query(insertTodoQuery, insertTodoParams)
      return row
    } catch (err) {
      console.log(`#### insertTodo Query Error #### \n ${err}`)
      return false
    } finally {
      connection.release()
    }
  } catch (err) {
    console.log(`#### insertTodo DB Error ####  \n ${err} `)
    return false
  }
}

exports.selectTodoByType = async function (userIdx, type) {
  try {
    const connection = await pool.getConnection(async (coon) => coon)
    try {
      const selectTodoByTypeQuery =
        'select todoIdx, type, contents  from Todos where userIdx = ? and type = ? and status = "A"'

      const selectTodoByTypeParams = [userIdx, type]

      const [row] = await connection.query(
        // await 잊지 않기
        selectTodoByTypeQuery,
        selectTodoByTypeParams
      )
      return row
    } catch (err) {
      console.log(`#### selectTodoByType Query Error #### \n ${err}`)
      return false
    } finally {
      connection.release()
    }
  } catch (err) {
    console.log(`#### selectTodo DB Error #### \n ${err}`)
    return false
  }
}

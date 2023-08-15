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

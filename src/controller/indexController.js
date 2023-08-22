const indexDao = require('../dao/indexDao')

exports.createdTodo = async function (req, res) {
  const { userIdx, contents, type } = req.body

  // 검증하기
  if (!userIdx || !contents || !type) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '입력값이 누락됐습니다.',
    })
  }

  // contents 20글자 초과 불가
  if (contents.length > 20) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '"contents"는 20글자 이하로 설정해주세요.',
    })
  }

  // type:
  const validType = ['do', 'decide', 'delete', 'delegate']

  if (!validType.includes(type)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '유효한 타입이 아닙니다.',
    })
  }

  const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type)

  if (!insertTodoRow) {
    return res.send({
      isSuccess: false,
      code: 403,
      message: '요청이 실패했습니다. 관리자에게 문의해주세요.',
    })
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: '일정 생성 성공',
  })
}

exports.readTodo = async function (req, res) {
  const { userIdx } = req.params

  const todos = {}
  const types = ['do', 'decide', 'delete', 'delegate']

  for (let type of types) {
    let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type)

    if (!selectTodoByTypeRows) {
      return res.send({
        isSuccess: false,
        status: 400,
        message: '일정 조회 실패, 관리자에게 문의해주세요.',
      })
    }

    todos[type] = selectTodoByTypeRows
  }

  return res.send({
    result: todos,
    isSuccess: true,
    status: 200,
    message: '일정 조회 성공',
  })

  // const todos = await types.reduce(async (acc, type) => {
  //   ;(await acc)[type] = await indexDao.selectTodoByType(userIdx, type)
  //   return acc
  // }, Promise.resolve({}))
  //
  // return res.send(todos)
}

exports.updateTodo = async function (req, res) {
  let { userIdx, todoIdx, contents, status } = req.body

  if (!userIdx || !todoIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '유효한 요청이 아닙니다.',
    })
  }

  if (!contents) {
    contents = null
  }

  if (!status) {
    status = null
  }

  const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx)

  if (isValidTodoRow.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '유효한 요청이 아닙니다.',
    })
  }

  const updateTodoRow = await indexDao.updateTodo(
    userIdx,
    todoIdx,
    contents,
    status
  )

  return res.send({
    isSuccess: true,
    code: 200,
    message: '수정 성공',
  })
}

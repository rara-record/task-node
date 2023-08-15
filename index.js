const express = require('express')
const compression = require('compression')
const {indexRouter } = require('./src/router/indexRouter')
const cors = require('cors')
const app = express()
const port = 3000


/* 미들웨어 설정 */
// cors 설정 : 보안 설정을 느슨하게 해준다.
app.use(cors())

// body json 파싱 : body를 찾아서 json 파싱할 수 있게한다.
app.use(express.json())

// HTTP 요청 압축
app.use(compression())

// 라우터 분리
indexRouter(app)

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`)
})
module.exports = app => {
  const User = require('../../models/User')
  const Info = require('../../models/Info')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')

  app.use(async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    const id = jwt.verify(token, req.app.get('secret'))['_id']
    if (!id) {
      return res.send({
        code: 999,
        msg: '登录状态异常，请重新登录'
      })
    }
    app.set('id', id)
    next()
  })

  // 注册接口
  app.post('/api/reg', async (req, res) => {
    const { username, password } = req.body
    const haveUser = await User.findOne({ username })
    if (haveUser) {
      return res.status(200).send({
        code: 501,
        msg: '用户已存在'
      })
    }
    await Info.create({ username })
    await User.create({ username, password })
    res.send({
      code: 200,
      msg: '注册成功'
    })
  })

  // 登录接口
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).select('+password')
    const { id } = await Info.findOne({ username })
    if (!user) {
      return res.status(200).send({
        code: 501,
        msg: '用户名不存在'
      })
    }
    const verify_password = bcrypt.compareSync(password, user.password)
    if ( !verify_password ) {
      return res.status(200).send({
        code: 501,
        msg: '密码错误'
      })
    }
    const token = jwt.sign({ _id: id }, res.app.get('secret'))
    res.status(200).send({
      code: 200,
      msg: '登录成功',
      data: token
    })
  })

  // 上传图片接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    const url = `http://localhost:3000/uploads/${file.filename}`
    res.send({
      code: 200,
      msg: '上传成功',
      data: url
    })
  })

  // 个人信息接口2
  app.post('/api/getUserInfo', async (req, res) => {
    const id = req.app.get('id')
    const user = await Info.findById(id)
    res.send({
      code: 200,
      msg: 'ok',
      data: user
    })
  })

  // 上传头像
  app.post('/api/uploadHeader', async (req, res) => {
    const id = req.app.get('id')
    const url = req.body.url
    if (!url) {
      return res.send({
        code: 503,
        msg: '请上传头像'
      })
    }
    await Info.updateOne({ _id: id }, { headerImg: url })
    return res.send({
      code: 200,
      msg: '上传成功'
    })
  })

  // 修改姓名
  app.post('/api/updateUserName', async (req, res) => {
    const id = req.app.get('id')
    const name = req.body.name
    if (!name) {
      return res.send({
        code: 502,
        msg: '请输入新的姓名'
      })
    }
    await Info.updateOne({ _id:id }, { name })
    return res.send({
      code: 200,
      msg: '修改成功'
    })
  })
}

module.exports = app => {
  const User = require('../../models/User')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')

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
    const token = jwt.sign({ _id: user._id }, 'hhhh')
    res.status(200).send({
      code: 200,
      msg: '登录成功',
      data: token
    })
  })
}

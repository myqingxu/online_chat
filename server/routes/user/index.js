module.exports = app => {
  const User = require('../../models/User')
  const Info = require('../../models/Info')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')

  app.use((req, res, next) => {
    if (req.url === '/api/login' || req.url === '/api/reg') {
      return next()
    }
    const token = String(req.headers.authorization || '').split(' ').pop()
    if (!token) {
      return res.send({
        code: 999,
        msg: '登录状态异常，请重新登录'
      })
    }
    // const id = jwt.verify(token, res.app.get('secret'))['_id']
    jwt.verify(token, res.app.get('secret'), (err, data) => {
      try {
        app.set('id', data['_id'])
        next()
      } catch (err) {
        return res.send({
          code: 999,
          msg: '登录状态异常，请重新登录'
        })
      }
    })
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
    const { id } = await Info.findOne({ username })
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
    const id =  res.app.get('id')
    const user = await Info.findById(id)
    res.send({
      code: 200,
      msg: 'ok',
      data: user
    })
  })

  // 上传头像
  app.post('/api/uploadHeader', async (req, res) => {
    const id =  res.app.get('id')
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
    const id =  res.app.get('id')
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

  // 搜索用户
  app.post('/api/searchUser', async (req, res) => {
    const username = req.body.username
    if (!username) {
      return res.send({
        code: 502,
        msg: '请输入用户名'
      })
    }
    const user = await Info.findOne({ username })
    if (!user) {
      return res.send({
        code: 502,
        msg: '无此用户'
      })
    }
    return res.send({
      code: 200,
      msg: 'ok',
      data: user
    })
  })

  // 添加好友
  app.post('/api/addFriend', async (req, res) => {
    const id =  res.app.get('id') // 用户id
    const user_id = req.body.id // 被添加用户id
    if (id === user_id) {
      return res.send({
        code: 502,
        msg: '不可以添加自己为好友'
      })
    }
    const user = await Info.findById(id)
    if (user.friend.indexOf(user_id) !== -1) {
      return res.send({
        code: 502,
        msg: '该用户已经是你的好友，请勿重复添加'
      })
    }
    await Info.update({ _id: user_id }, { $addToSet: { newFriend: {
      status: 'no_pass',
      _id: id
    }}})
    res.send({
      code: 200,
      msg: 'ok',
      data: '添加成功,等待对方验证'
    })
  });

  // 好友列表
  app.post('/api/friends', async (req, res) => {
    const id =  res.app.get('id') // 用户id
    const user = await Info.findById(id)
    const friends_id_arr = user.friend
    const users = await Info.find({ _id: { $in: friends_id_arr } })
    res.send({
      code: 200,
      msg: 'ok',
      data: users
    })
  })

  // 新的好友列表
  app.post('/api/newFriends', async (req, res) => {
    const id =  res.app.get('id') // 用户id
    const user = await Info.findById(id)
    const newFriends = user.newFriend
    const ids = newFriends.map(item => {
      return item.id
    })
    const newUsers = await Info.find({ _id: { $in: ids } })
    res.send({
      code: 200,
      msg: 'ok',
      data: newUsers
    })
  })
}

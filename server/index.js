const { static } = require('express')
const express = require('express')
const app = express()
const port = 3000

app.set('secret', '1a1a2b2b')
app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))


require('./routes/user/index.js')(app)
require('./plugins/db.js')(app)

app.listen(port, () => console.log(`http://localhost:3000`))
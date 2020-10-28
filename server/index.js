const express = require('express')
const app = express()
const port = 3000

app.use(require('cors')())
app.use(express.json())

require('./routes/user/index.js')(app)
require('./plugins/db.js')(app)

app.listen(port, () => console.log(`http://localhost:3000`))
'use strict'
const app = require('../app')
const PORT = 3001
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})
const express = require('express');         // express 불러옴
const bodyParser = require('body-parser');  // body-parser 불러옴
const app = express();                      // app을 통해 express 사용
const port = process.env.port || 5000;      // port 5000 사용

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// http://localhost:5000/api/hello 접근시 메시지 출력("Hello Express!")
app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'})
})

// node server.js 실행시 메시지 출력("Listening on port 5000")
app.listen(port, () => console.log(`Listening on port ${port}`));
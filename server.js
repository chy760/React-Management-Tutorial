const express = require('express');         // express 불러옴
const bodyParser = require('body-parser');  // body-parser 불러옴
const app = express();                      // app을 통해 express 사용
const port = process.env.port || 5000;      // port 5000 사용

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// http://localhost:5000/api/customers 접근시 고객데이터 출력
app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '고길동',
            'birthday': '901122',
            'gender': '남자',
            'job': '직장인'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '도우너',
            'birthday': '991022',
            'gender': '남자',
            'job': '고등학생'
        }
    ])
})

// node server.js 실행시 메시지 출력("Listening on port 5000")
app.listen(port, () => console.log(`Listening on port ${port}`));
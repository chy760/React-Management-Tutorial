const fs = require('fs');                   // fs 파일접근 라이브러리 사용
const express = require('express');         // express 불러옴
const bodyParser = require('body-parser');  // body-parser 불러옴
const app = express();                      // app을 통해 express 사용
const port = process.env.port || 5000;      // 서버 port 5000 사용

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// db접속정보 database.json 파일을 읽어옴
const data = fs.readFileSync('./database.json');
// 해당 환경설정 파일을 파싱해서 가져옴
const conf = JSON.parse(data);
// mysql 라이브러리를 불러옴
const mysql = require('mysql');
// db 연결 변수 설정
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
// DB 연결
connection.connect();

// 클라이언트가 api(http://localhost:5000/api/customers) 
// 접근시 db customer 테이블에 접근하여 고객데이터 출력
app.get('/api/customers', (req, res) => {
    // query함수를 이용하여 쿼리 호출
    connection.query(
        "SELECT * FROM CUSTOMER",
        // 쿼리문의 결과값을 rows에 담는다
        (err, rows, fields) => {
            // 클라이언트에게 데이터 반환
            res.send(rows);
        }
    );
});

// node server.js 실행시 메시지 출력("Listening on port 5000")
app.listen(port, () => console.log(`Listening on port ${port}`));
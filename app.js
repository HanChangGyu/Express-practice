const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = reqiuire('multer'); // 파일이나 그림을 받으면 저장할 수 있음
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(__dirname, 'public' )); // 실제 파일이 존재하면 다음 미들웨어로 넘기지 않음
app.use(cookieParser('zerochopassword'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session());
app.use(multer().array());

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => { // 일반 미들웨어 - 라우터가 다 무시되고 여기까지 오면 404
    res.status(404).send('404지롱');
});

app.use((err, req, res, next) => { // 에러 처리 전용 미들웨어 'throw new Error(...)' or 'next(err)' 발생하면
    console.error(err);
    res.status(200).send('에러났으니 확인해주세요') 
})
app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
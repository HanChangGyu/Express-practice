const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요');
    // res.send('안녕하세요'); - 에러난다
    next();
}, (req, res, next) => {
    try {
      console.log(dsafasdf);
    } catch (error) {
        next(error); // next(인수) 인수가 들어갈 경우에는 다음 미들웨어가 아닌 인수의 에러처리 미들로 감
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/:name', (req, res) => {
    res.send(`hello wildcard`);
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => { // 일반 미들웨어 - 라우터가 다 무시되고 여기까지 오면 404
    res.status(200).send('404지롱');
});

app.use((err, req, res, next) => { // 에러 처리 전용 미들웨어 'throw new Error(...)' or 'next(err)' 발생하면
    console.error(err);
    res.status(200).send('에러났으니 확인해주세요') 
})
app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
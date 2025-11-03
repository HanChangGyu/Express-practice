const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = reqiuire('multer'); 
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser('zerochopassword'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'zerochopassword',
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid',
}));
app.use('/', (req, res, next) => {  // 미들웨어 확장법
    if (req.session.id) { // 로그인이 되어 있을경우
        express.static(__dirname, 'public')(req, res, next)
    } else { // 되지 않았을 경우 next()로 다음 미들웨어 실행
        next();
    }
});
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());

app.get('/', (req, res, next) => {
    req.session.id = 'hello';
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

app.use((req, res, next) => { 
    res.status(404).send('404지롱');
});

app.use((err, req, res, next) => { 
    console.error(err);
    res.status(200).send('에러났으니 확인해주세요') 
})
app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
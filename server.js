const path = require('path')
const express = require('express')
const history = require('connect-history-api-fallback');
// const ReactSSR = require('react-dom/server')
// const serverEntry = require('./dist/server-entry').default
const app = express()
app.use( (req, res, next)=> {
    let time = Date.now() + 5000;
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Cache-Control", "no-cache");
    //res.header("Expires", new Date(time).toUTCString());
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.get('/api/uri1', (req, res) => {
    setTimeout(()=>{
        res.json({
            ok: 1
        })
    },1000)
})
app.get('/api/uri2', (req, res) => {
    setTimeout(()=>{
        res.json({
            ok: 2
        })
    },2000)

})
app.get('/api/uri3', (req, res) => {
    setTimeout(()=>{
        res.json({
            ok: 3
        })
    },1500)
})
app.use('/', history());
app.use('/', express.static(path.join(__dirname)))

app.use(express.static(path.join(__dirname, 'dist')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.get('*', (req, res) => {
//     const appStr = ReactSSR.renderToString(serverEntry)
//     res.render('index',{
//         content: appStr,
//         version: Date.now().toString()
//     })
// })
app.get('/', (req, res) => {
    //const appStr = ReactSSR.renderToString(serverEntry)
    res.status(200).render('index', {
        title: '首页'
    })
});

app.listen(3000, () => {
    console.log('server is listening on 3000')
});

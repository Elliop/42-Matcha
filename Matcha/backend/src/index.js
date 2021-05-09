import express from "express";
import bodyParser from "body-parser";

const {app, server} = require('./modules/Chat/socket');
const port = 6937;


/* ----- Login ----- */
const tmp = require('./modules/Check/tmp');
const register = require('./modules/Login/register');
const login = require('./modules/Login/login');
const token = require('./modules/Login/token');
const forget = require('./modules/Login/forget');
const newPassword = require('./modules/Login/newPassword');
const posts = require('./modules/Login/login');
const loc = require('./modules/Login/loc');
const logout = require('./modules/Login/logout');



/* ----- Complete ----- */
const complete = require('./modules/Complete/complete');
const pic = require('./modules/Complete/pic');



/* ----- Chat ----- */
const sendmsg = require('./modules/Chat/sendmsg');
const datamsg = require('./modules/Chat/datamsg');
const getimage = require('./modules/Chat/getimage');



/* ----- Profile ----- */
const data = require('./modules/Profile/data');
const imageData = require('./modules/Profile/imageData');
const images = require('./modules/Profile/images');
const completed = require('./modules/Profile/completed');



/* ----- Setting ----- */
const info = require('./modules/Setting/info');
const email = require('./modules/Setting/email');
const password = require('./modules/Setting/password');
const location = require('./modules/Setting/location');



/* ----- Macth ----- */
const users = require('./modules/Match/users');
const matchWith = require('./modules/Match/matchWith');
const userr = require('./modules/Match/userr');
const block = require('./modules/Match/block');
const report = require('./modules/Match/report');
const like = require('./modules/Match/like');
const blocked = require('./modules/Match/blocked');
const friends = require('./modules/Match/friends');
const unblock = require('./modules/Match/unblock');
const unlike = require('./modules/Match/unlike');



/* ----- History ----- */
const vu = require('./modules/History/vu');
const historyData = require('./modules/History/historyData');
const likeHistory = require('./modules/History/likeHistory');



/* ----- Notif ----- */
const notif = require('./modules/Notif/notif');
const num = require('./modules/Notif/num');
const dataNotif = require('./modules/Notif/dataNotif');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use(express.static('upload'));



/* ----- check tmp ----- */
app.use('/check', tmp);



/* ----- Login ----- */
app.use('/auth', register);
app.use('/auth', login);
app.use('/auth', posts);
app.use('/auth', token);
app.use('/auth', forget);
app.use('/auth', newPassword);
app.use('/auth', loc);
app.use('/auth', logout);



/* ----- Complete ----- */
app.use('/comp', complete);
app.use('/comp', pic);



/* ----- Chat ----- */
app.use('/chat', sendmsg);
app.use('/chat', datamsg);
app.use('/chat', getimage);



/* ----- Profile ----- */
app.use('/profile', data);
app.use('/profile', imageData);
app.use('/profile', images);
app.use('/profile', completed);



/* ----- Setting ----- */
app.use('/set', info);
app.use('/set', email);
app.use('/set', password);
app.use('/set', location);



/* ----- Match ----- */
app.use('/match', users);
app.use('/match', matchWith);
app.use('/match', userr);
app.use('/match', block);
app.use('/match', report);
app.use('/match', like);
app.use('/match', blocked);
app.use('/match', friends);
app.use('/match', unblock);
app.use('/match', unlike);



/* ----- History ----- */
app.use('/history', vu);
app.use('/history', historyData);
app.use('/history', likeHistory);



/* ----- Notif ----- */
app.use('/notif', notif);
app.use('/notif', num);
app.use('/notif', dataNotif);



server.listen(port, () => console.log(`[Matcha] Backend up port: ${port}!`));
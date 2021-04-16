const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const trustRouter = require('./routes/trust');
const trustChainRouter = require('./routes/trustChain');
const voteRouter = require('./routes/vote');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/trust', trustRouter);
app.use('/trustChain', trustChainRouter);
app.use('/vote', voteRouter);

module.exports = app;

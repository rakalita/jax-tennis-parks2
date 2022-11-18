const path = require('path');
const express = require('express');
const morgan = require('morgan');
const jtpRouter = require('./routes/tennisParkRoutes');
const userRouter = require('./routes/userRoutes');
const wxRouter = require('./routes/wxRoutes');

const app = express();
//app.set('view engine', 'pug');
//app.set('views', path.join(__dirname, '/views'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
//middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json()); //middleware to access request params

app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleTimeString();
  next();
});

app.get('/', (req, res, next) => {
  res.status(200).render('base');
});
app.use('/api/v1/jtp', jtpRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/forecast', wxRouter);

module.exports = app;

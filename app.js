require('dotenv').config();
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  IP = process.env.IP || 'localhost',
  cors = require('cors'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose');
  cron = require('node-cron')
  const CronService = require('./api/services/cron/index');

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    

    const tArray =await  mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log('test db',names); // [{ name: 'dbname.myCollection' }])
    });

 
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//define Route
  userRoute = require('./api/routes/user');
  functionRoute = require('./api/routes/function');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(logger('dev'));

// API
app.use(process.env.ROUTE_PREFIX,
  userRoute,
  functionRoute
);

app.listen(port, IP, () => {
  console.log(`PORT IS ALIVE AND IT LISTEN TO PORT http://${IP}:${port}`);
});

//cronjob
cron.schedule('* * * * *', () => {
  CronService.start();
  CronService.end();

});


module.exports = app;
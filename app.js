require('dotenv').config();
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  IP = process.env.IP || 'localhost',
  cors = require('cors'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  // db = require('./models'),
  mongoose = require('mongoose');
  cron = require('node-cron')
  const CronService = require('./api/services/cron/index');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://siroja:SI2kAnz5lsMuT5Ux@cluster0.slhcal7.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  // const db = client.connect(err => {
  //   console.log('Database Connected...',collection)
  //   client.close();
  // });
//   mongoose.connect('mongodb+srv://siroja:SI2kAnz5lsMuT5Ux@cluster0.slhcal7.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('Database Connected...',db));
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    
    // const databasesList = await client.db().admin().listDatabases();
    const tArray =await  mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log('a',names); // [{ name: 'dbname.myCollection' }])
    });

    // console.log("Connected to the database!",db);
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
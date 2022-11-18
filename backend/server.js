const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./starter');

//initialize config file
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('DB Connection established');
  });
const port = process.env.SERVER_PORT || 3001;
const hostname = process.env.IP;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
  //console.log(process.env);
});

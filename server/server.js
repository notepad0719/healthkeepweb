const express = require('express');
const app = express();
const router = require('./route');


const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

sequelize.sync();
//sequelize.sync({ force: true });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());







app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})
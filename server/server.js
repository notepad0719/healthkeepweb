const express = require('express');
const app = express();
const router = require('./route');

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();
sequelize.sync({ force: true });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.post('/add/data', (req, res) => {
  console.log(req.body);

  Teacher.create({
    name: req.body.data,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

app.get('/get/data', (req, res) => {
  Teacher.findAll({
    where: { [Op.or]: [{ id: 1 }, { name: 'Alan' }] },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

app.post('/modify/data', (req, res) => {
  Teacher.update(
    { name: 'Same_name' },
    {
      where: { [Op.or]: [{ id: 1 }, { name: 'Alan' }] },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

app.post('/delete/data', (req, res) => {
  Teacher.destroy({
    where: { name: 'dongwoo' },
  })
    .then(res.sendStatus(200))
    .catch((err) => {
      throw err;
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

const sequelize = require('./models').sequelize;

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const now_date = moment().format('YYYY-MM-DD HH:mm:ss');

const {
  Admin,
  Board,
  Category,
  Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
  api: {
    searchInfo: (body, hash, callback) => {
      //console.log(body);
      Admin.findAll({
        where: { [Op.and]: [{ email: body.email, pw: hash }] }
      })
        .then(data => {
          callback(data)
        })
        .catch(err => {
          throw err;
        })
    },
  },

  add: {
    board: (body, callback) => {
      Board.create({
        title: body.title,
        contentText: body.contentText,
        date: now_date,
        view_cnt: 0,
        cat_id: 0,
      })
        .then(data => {
          callback(true)
        })
        .catch(err => {
          throw err;
        })
    },

    category: (body, callback) => {
      Category.count({
        where: { name: body.name }
      })
        .then(cnt => {
          if (cnt > 0) {
            callback(false);
          } else {
            Category.create({
              name: body.name
            })
              .then(() => { callback(true) })
          }
        })
    }
  },
  update: {
    view_cnt: (body, callback) => {
      Board.update({ view_cnt: sequelize.literal('view_cnt + 1') }, {
        where: { boardid: body.id }
      })
        .then(data => {
          callback(true)
        })
        .catch(err => {
          throw err;
        })
    }
  },
  delete: {
    category: (body, callback) => {
      Category.destroy({
        where: { id: body.id }
      })
        .then(() => {
          Board.update({ cat_id: 0 }, {
            where: { cat_id: body.id }
          })
            .then(() => { callback(true) })
            .catch(err => { throw err; })
        })
    }
  },

  modify: {
    category: (body, callback) => {
      console.log(body)
      Category.count({
        where: { name: body.name }
      })
        .then(cnt => {
          console.log(cnt)
          if (cnt > 0) {
            callback(false);

          } else {
            Category.update({ name: body.name }, {
              where: { id: body.id }
            })
              .then(() => { callback(true) })
              .catch(err => { throw err; })
          }
        })
    }
  },
  get: {
    board: (body, callback) => {
      let search = "%%";

      if (body.search) {
        search = '%' + body.search + '%';
      }

      Board.findAll({
        where: {
          title: {
            [Op.like]: search
          },
          contentText: {
            [Op.like]: search
          },
          cat_id: body.category
        },
        limit: (body.page * body.limit),
        offset: (body.page - 1) * body.limit,
        order: sequelize.literal('boardid DESC')
      })
        .then(data => {
          callback(data)
        })
        .catch(err => {
          throw err;
        })
    },

    board_cnt: (body, callback) => {
      let search = "%%";

      if (body.search) {
        search = '%' + body.search + '%';
      }
      Board.count({
        where: {
          title: {
            [Op.like]: search
          },
          contentText: {
            [Op.like]: search
          },
          cat_id: body.category
        }
      })
        .then(result => {
          callback(result);
        })
    },
    board_data: (body, callback) => {
      Board.findAll({
        where: { boardid: body.id }
      })
        .then(result => {
          callback(result);
        })
        .catch(err => {
          throw err;
        })
    },
    category: (callback) => {
      Category.findAll()
        .then(result => { callback(result); })
        .catch(err => { throw err; })
    }
  }



}
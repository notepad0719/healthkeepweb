module.exports = {
  enc: function (mail, pwd, salt) {
    const sha256 = require('sha256');

    return sha256(mail + pwd + salt)
  },
}
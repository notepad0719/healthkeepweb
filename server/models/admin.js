module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'admin',
    {
      email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
      },

      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      pw: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  )
};

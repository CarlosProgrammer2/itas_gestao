const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Direcao = sequelize.define('direcao', {
    id_direcao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'direcao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "direcao_pkey",
        unique: true,
        fields: [
          { name: "id_direcao" },
        ]
      },
    ]
  });

  Direcao.associate = (models) => {
    Direcao.hasMany(models.credenciais, { foreignKey: 'direcao_id', as: 'credenciais' });
  }

  return Direcao;
};

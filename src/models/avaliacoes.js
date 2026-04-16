const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Avaliacoes = sequelize.define('avaliacoes', {
    id_avaliacao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'avaliacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "avaliacoes_pkey",
        unique: true,
        fields: [
          { name: "id_avaliacao" },
        ]
      },
    ]
  });

  Avaliacoes.associate = (models)=>{
    Avaliacoes.hasMany(models.notas, { foreignKey: 'avaliacao_id', as: 'notas' });
  }

  return Avaliacoes; 
};

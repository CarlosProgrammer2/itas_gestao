const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Disciplina = sequelize.define('disciplinas', {
    id_disciplina: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professores',
        key: 'id_professor'
      }
    }
  }, {
    sequelize,
    tableName: 'disciplinas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "disciplinas_pkey",
        unique: true,
        fields: [
          { name: "id_disciplina" },
        ]
      },
    ]
  });

  Disciplina.associate = (models)=>{
    Disciplina.belongsTo(models.professores, { foreignKey: 'professor_id', as: 'professor' });
     Disciplina.hasMany(models.notas, { foreignKey: 'disciplina_id', as: 'notas' });
  }

  return Disciplina;
};

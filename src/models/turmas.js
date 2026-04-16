const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Turmas = sequelize.define('turmas', {
    id_turma: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_turma: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    curso: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ano_letivo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    turno: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_professor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professores',
        key: 'id_professor'
      }
    }
  }, {
    sequelize,
    tableName: 'turmas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "turmas_pkey",
        unique: true,
        fields: [
          { name: "id_turma" },
        ]
      },
    ]
  });

  Turmas.associate = (models)=>{
    Turmas.hasMany(models.alunos, { foreignKey: 'id_turma', as: 'alunos' });
    Turmas.belongsTo(models.professores, { foreignKey: 'id_professor', as: 'professor' });
  }

  return Turmas;
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Aluno = sequelize.define('alunos', {
    id_aluno: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    numero_estudante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    turma_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'turmas',
        key: 'id_turma'
      }
    }
  }, {
    sequelize,
    tableName: 'alunos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "alunos_pkey",
        unique: true,
        fields: [
          { name: "id_aluno" },
        ]
      },
    ]
  });

  Aluno.associate = (models) => {
  Aluno.belongsTo(models.turmas, { foreignKey: 'turma_id', as: 'turma' });
  Aluno.hasMany(models.notas, { foreignKey: 'aluno_id', as: 'notas' });
  Aluno.hasOne(models.credenciais, { foreignKey: 'aluno_id', as: 'credencial' });
};


  return Aluno;
};

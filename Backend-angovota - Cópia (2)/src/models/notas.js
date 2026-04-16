const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Notas = sequelize.define('notas', {
    id_nota: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'alunos',
        key: 'id_aluno'
      }
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'disciplinas',
        key: 'id_disciplina'
      }
    },
    avaliacao_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'avaliacoes',
        key: 'id_avaliacao'
      }
    },
    n1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    n2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    n3: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    media: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    resultado: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    /*
     trimestre: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
    */
  }, {
    sequelize,
    tableName: 'notas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notas_pkey",
        unique: true,
        fields: [
          { name: "id_nota" },
        ]
      },
    ]
  });

 Notas.associate = (models) => {
  Notas.belongsTo(models.alunos, { foreignKey: 'aluno_id', as: 'aluno' });
  Notas.belongsTo(models.disciplinas, { foreignKey: 'disciplina_id', as: 'disciplina' });
  Notas.belongsTo(models.avaliacoes, { foreignKey: 'avaliacao_id', as: 'avaliacao' });
};


  return Notas;
};

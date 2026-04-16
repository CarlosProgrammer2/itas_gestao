const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Credenciais = sequelize.define('credenciais', {
    id_credencial: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    senha_hash: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'alunos',
        key: 'id_aluno'
      }
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professores',
        key: 'id_professor'
      }
    },
    direcao_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'direcao',
        key: 'id_direcao'
      }
    }
  }, {
    sequelize,
    tableName: 'credenciais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "credenciais_pkey",
        unique: true,
        fields: [
          { name: "id_credencial" },
        ]
      },
    ]
  });

  Credenciais.associate = (models) => {
    Credenciais.belongsTo(models.alunos, { foreignKey: 'aluno_id', as: 'aluno' });
    Credenciais.belongsTo(models.professores, { foreignKey: 'professor_id', as: 'professor' });
    Credenciais.belongsTo(models.direcao, { foreignKey: 'direcao_id', as: 'direcao' }); 
  }
  return Credenciais;
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Professores = sequelize.define('professores', {
    id_professor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    especialidade: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'professores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "professores_pkey",
        unique: true,
        fields: [
          { name: "id_professor" },
        ]
      },
    ]
  });
  Professores.associate = (models)=>{
    Professores.hasMany(models.turmas, { foreignKey: 'id_professor', as: 'turmas' });
    Professores.hasMany(models.disciplinas, { foreignKey: 'professor_id', as: 'disciplinas' });
    Professores.hasOne(models.credenciais, { foreignKey: 'professor_id', as: 'credencial' });
  }

  return Professores;
};

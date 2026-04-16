var DataTypes = require("sequelize").DataTypes;
var _alunos = require("./alunos");
var _avaliacoes = require("./avaliacoes");
var _credenciais = require("./credenciais");
var _direcao = require("./direcao");
var _disciplinas = require("./disciplinas");
var _notas = require("./notas");
var _professores = require("./professores");
var _turmas = require("./turmas");

function initModels(sequelize) {
  var alunos = _alunos(sequelize, DataTypes);
  var avaliacoes = _avaliacoes(sequelize, DataTypes);
  var credenciais = _credenciais(sequelize, DataTypes);
  var direcao = _direcao(sequelize, DataTypes);
  var disciplinas = _disciplinas(sequelize, DataTypes);
  var notas = _notas(sequelize, DataTypes);
  var professores = _professores(sequelize, DataTypes);
  var turmas = _turmas(sequelize, DataTypes);

  credenciais.belongsTo(alunos, { as: "aluno", foreignKey: "aluno_id"});
  alunos.hasMany(credenciais, { as: "credenciais", foreignKey: "aluno_id"});
  notas.belongsTo(alunos, { as: "aluno", foreignKey: "aluno_id"});
  alunos.hasMany(notas, { as: "nota", foreignKey: "aluno_id"});
  notas.belongsTo(avaliacoes, { as: "avaliacao", foreignKey: "avaliacao_id"});
  avaliacoes.hasMany(notas, { as: "nota", foreignKey: "avaliacao_id"});
  credenciais.belongsTo(direcao, { as: "direcao", foreignKey: "direcao_id"});
  direcao.hasMany(credenciais, { as: "credenciais", foreignKey: "direcao_id"});
  notas.belongsTo(disciplinas, { as: "disciplina", foreignKey: "disciplina_id"});
  disciplinas.hasMany(notas, { as: "nota", foreignKey: "disciplina_id"});
  credenciais.belongsTo(professores, { as: "professor", foreignKey: "professor_id"});
  professores.hasMany(credenciais, { as: "credenciais", foreignKey: "professor_id"});
  disciplinas.belongsTo(professores, { as: "professor", foreignKey: "professor_id"});
  professores.hasMany(disciplinas, { as: "disciplinas", foreignKey: "professor_id"});
  alunos.belongsTo(turmas, { as: "turma", foreignKey: "turma_id"});
  turmas.hasMany(alunos, { as: "alunos", foreignKey: "turma_id"});

  return {
    alunos,
    avaliacoes,
    credenciais,
    direcao,
    disciplinas,
    notas,
    professores,
    turmas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

const { Router } = require('express');

 

const middleware = require('./middlewares/autenticarSessao');

const sessao = require('./controllers/sessaoController');

const aluno = require('./controllers/alunosController');

const notas = require('./controllers/notasController');

const credenciais = require('./controllers/credenciaiasController');

const routes = Router();

//routes.get('/perfiloficial', perfil_oficial_cne.verificarPerfilCNE);


routes.get('/sessao/validar', sessao.validarRota);

routes.get('/alunos', aluno.listarAlunos);

routes.post('/alunos/criar', aluno.criarAluno);

routes.post('/notas/criar', notas.criarNota);

routes.get('/notas', notas.verNotas);

routes.get('/notas/professor', notas.verNotasProfessor);

routes.get('/verProfs', credenciais.visualizarRapidoProfs);

routes.post('/criar/senha', credenciais.criarCredencialProfessor);

routes.post('/criar/senha/aluno', credenciais.criarCredencialAluno);

routes.post('/autenticar/professor', credenciais.autenticarProfessor);

routes.post('/autenticar/aluno', credenciais.autenticarAluno);



routes.get('/buscar/alunos', credenciais.visualizarAluno);

routes.get('/verDiscplinas', credenciais.verRapido);









module.exports = routes;
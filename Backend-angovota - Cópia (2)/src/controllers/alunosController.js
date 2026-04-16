const { alunos, turmas, sequelize } = require('../models');


class AlunosController {
    async listarAlunos(req, res) {

        try{
            const alunosList = await alunos.findAll({
                attributes: [
                    'id_aluno',
                    'nome',
                    'data_nascimento',
                    'numero_estudante',
                    [sequelize.col('turma.nome_turma'), 'nome_turma'],
                    [sequelize.col('turma.curso'), 'curso'],
                    [sequelize.col('turma.ano_letivo'), 'ano_letivo'],
                    [sequelize.col('turma.turno'), 'turno']
                    ],

                include: [{
                    model: turmas,
                    as: 'turma',
                    attributes: []
                }]
            });

            return res.status(200).json(alunosList);

        }catch(error){
            return res.status(500).json({ error: error.message });
        }

    }

    async criarAluno(req, res) {

        try{

            const { nome, data_nascimento, numero_estudante, turma_id } = req.body;

            const novoAluno = await alunos.create({
                nome,
                data_nascimento,
                numero_estudante,
                turma_id
            });

            return res.status(201).json(novoAluno);

        }catch(error){
            return res.status(500).json({ error: error.message });
        }
        
    }
}

module.exports = new AlunosController();
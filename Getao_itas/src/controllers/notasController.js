const {notas, alunos, turmas, disciplinas, avaliacoes, sequelize } = require('../models');

class NotasController {
    async criarNota(req, res) {
        try{

            const { aluno_id, tipo_avaliacao, n1, n2, n3 } = req.body;

            const disciplina_id  = req.session.disciplinaId;

            if (!disciplina_id) {
                return res.status(400).json({ error: "Disciplina não encontrada na sessão" });
                
            }

            if (!aluno_id || !tipo_avaliacao || !n1 || !n2 || !n3) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }

            //const verificarNotaExistente = await notas


           const criarAvaliacao = await avaliacoes.create({
                tipo: tipo_avaliacao
            });

            if(!criarAvaliacao){
                return res.status(400).json({ error: "Erro ao criar avaliação" });
            }
            
            const resultado = await notas.create({
                aluno_id,
                disciplina_id,
                avaliacao_id: criarAvaliacao.id_avaliacao,
                n1,
                n2,
                n3,
            });

            return res.status(201).json(resultado);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }

/*### Alunos ##########################################################################################################################################*/

    async verNotas(req, res){
        try{

            const alunoId = req.session.alunoId;

            const MostrarResultados = await notas.findAll({

                attributes: [

                [sequelize.col('aluno.nome'), 'nome_aluno'],
                [sequelize.col('disciplina.nome'), 'nome_disciplina'],
                [sequelize.col('avaliacao.tipo'), 'tipo_avaliacao'],
                'n1',
                'n2', 
                'n3', 
                'media', 
                'resultado',
                ],
                include: [
                    {
                        model: alunos,
                        as: 'aluno',
                        attributes: [],
                        where: {
                            id_aluno: alunoId
                        }
                    },
                    {
                        model: disciplinas,
                        as: 'disciplina',
                        attributes: []
                    },
                    {
                        model: avaliacoes,
                        as: 'avaliacao',
                        attributes: []

                    }
                ]

            });

            return res.status(200).json(MostrarResultados);

        }catch(error){
            console.error(error)
            return res.status(500).json({ error: error.message });
        }

    }



    async verNotasProfessor(req, res){
        try{

            let turmasId = req.session.turmaId

            const MostrarResultados = await notas.findAll({

                attributes: [

                [sequelize.col('aluno.nome'), 'nome_aluno'],
                [sequelize.col('disciplina.nome'), 'nome_disciplina'],
                [sequelize.col('avaliacao.tipo'), 'tipo_avaliacao'],
                'n1',
                'n2', 
                'n3', 
                'media', 
                'resultado',
                ],
                include: [
                    {
                        model: alunos,
                        as: 'aluno',
                        attributes: [],
                       include:[
                        {
                            model: turmas,
                            as:'turma',
                            attributes: [],
                            where: {
                                id_turma: turmasId
                            }
                        }
                       ]
                    },
                    {
                        model: disciplinas,
                        as: 'disciplina',
                        attributes: []
                    },
                    {
                        model: avaliacoes,
                        as: 'avaliacao',
                        attributes: []

                    }
                ]

            });

            return res.status(200).json(MostrarResultados);

        }catch(error){
            console.error(error)
            return res.status(500).json({ error: error.message });
        }

    }

}

module.exports = new NotasController();
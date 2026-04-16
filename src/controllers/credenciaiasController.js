const {credenciais, alunos, notas, professores, turmas, disciplinas, sequelize} = require('../models');
const { Op, and } = require('sequelize');


class CredenciaisController {
    async criarCredencialProfessor(req, res) {

        try{
            const { senha_hash, professor_id } = req.body;

            const role = 'professor';

            const professorExistente = await credenciais.findOne({where: {professor_id}});

            if (professorExistente) {
                return res.status(404).json({ error: 'Professor já criado!' });
            }

            const novaCredencial = await credenciais.create({
                senha_hash: sequelize.fn('pgp_sym_encrypt', senha_hash, process.env.MinhaChave),
                role,
                professor_id
            });



            return res.status(201).json(novaCredencial);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    
    async visualizarRapidoProfs(req, res){
        try{

            const buscar = await professores.findAll()
            return res.status(200).json(buscar);

        }catch(error){

             return res.status(500).json({ error: error.message });

        }
    }

    

    

    async autenticarProfessor(req, res) {

        try{

       
            const { senha_hash, disciplina } = req.body;

            if (!senha_hash || !disciplina) {

                 console.log('Senha, e disciplina não encontrados');

                return res.status(404).json('Senha, e disciplina não encontrados')

               
                
            }

            const VerificarProfessor = await credenciais.findOne({
                attributes: [
                
                  
                    [sequelize.fn('pgp_sym_decrypt', sequelize.col('senha_hash'), process.env.MinhaChave), 'senhaDescriptografada']
                ],
              where: sequelize.where(sequelize.fn('pgp_sym_decrypt',
                 sequelize.col('senha_hash'),
               process.env.MinhaChave), senha_hash),


                 include:[
                {

                model: professores,
                as: 'professor',
                attributes: ['nome', 
                    'id_professor'

                ],
                include:[
               /* {

                    model: turmas,
                    as: 'turmas',
                    attributes: [
                        'nome_turma',
            
                    ],
                    where:{
                        nome_turma: turma
                    }
                },*/
                 {
                    model: disciplinas,
                    as: 'disciplinas',
                    attributes: ['id_disciplina', 'nome'],
                    where:{
                        nome: disciplina
                    }
                }
            ]
                },     
        ],

            });

            if (!VerificarProfessor) {
                console.log('Credenciais inválidas');
                return res.status(400).json({error: "Credenciais inválidas"}); 
            }

            const Disciplina = VerificarProfessor.professor.disciplinas.map(disciplina => disciplina.id_disciplina);


            req.session.disciplinaId = Disciplina;

            //console.log(Disciplina);

            //const nomeTurma = VerificarProfessor.professor.turmas[0].nome_turma;

            const buscarTurma = await turmas.findAll({
                attributes: ['id_turma', 'nome_turma'],
                where: {
                    id_professor: 6
                }
            });

            req.session.turmaId = buscarTurma.map(turma => turma.id_turma);

            req.session.nomeTurma = buscarTurma.map(turma => turma.nome_turma);


           




            //console.log(buscarTurma);


            return res.status(200).json(VerificarProfessor);

        }catch(error){

            console.error(error);

             return res.status(500).json({ error: error.message });


        }

    }


    async visualizarAluno(req, res){
        try{

            //const { buscar } = req.body;

            let turmasId = req.session.turmaId

            console.log(turmasId);

            let nomeTurma = req.session.nomeTurma;
            
    
            if(!turmasId || !turmasId.length === 0) return res.status(400).json({ error: "Turma não encontrada na sessão" });
            let quando = {};
        
            
            const visualizarAluno = await alunos.findAll({
                attributes: ['id_aluno', 'nome', 'numero_estudante',

                    [sequelize.col("turma.nome_turma"), 'nome_turma']
                ],
                include:[
                    {
                        model: turmas,
                        as: 'turma',
                        attributes: [],
                        where: { id_turma: turmasId }                       

                        
                    },


                    /*
                    {
                        model: notas,
                        as: 'notas',
                        attributes: [],
                        where:{
                            disciplina_id: Disciplina
                        }
                    }

                    */
                ]
            });


            if (!visualizarAluno) {

                console.log('Nenhum aluno encontrado para a turma selecionada');
                return res.status(404).json({ error: "Nenhum aluno encontrado para a turma selecionada" });
                
            }

           

            return res.status(200).json(visualizarAluno);

        }catch(error){
            console.error(error);
            return res.status(500).json({ error: error.message });

        }
    }

    async verRapido(req, res){
         const verRapidoDisciplina = await disciplinas.findAll();
         return res.status(200).json(verRapidoDisciplina);

         


    }


    /**###########################################################################################################################################
     * ALUNOS E NOTAS
     */

     async criarCredencialAluno(req, res) {

        try{
            const { senha_hash, aluno_id } = req.body;

            const role = 'aluno';

            const alunoExistente = await credenciais.findOne({ where: { aluno_id } });

            if (alunoExistente) {
                return res.status(400).json({ error: 'Aluno já possui credenciais!' });
            }

            const novaCredencial = await credenciais.create({
                senha_hash: sequelize.fn('pgp_sym_encrypt', senha_hash, process.env.MinhaChave),
                role,
                aluno_id
            });



            return res.status(201).json(novaCredencial);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


     async autenticarAluno(req, res) {

        try{

       
            const { senha_hash, turma } = req.body;

            if (!senha_hash || !turma) {

                 console.log('Senha, e turma não encontrados');

                return res.status(404).json('Senha, e disciplina não encontrados')

               
                
            }

            const VerificarAluno = await credenciais.findOne({
                attributes: [
                
                  
                    [sequelize.fn('pgp_sym_decrypt', sequelize.col('senha_hash'), process.env.MinhaChave), 'senhaDescriptografada']
                ],
              where: sequelize.where(sequelize.fn('pgp_sym_decrypt',
                 sequelize.col('senha_hash'),
               process.env.MinhaChave), senha_hash),


                 include:[
                {

                model: alunos,
                as: 'aluno',
                attributes: [
                    'id_aluno',
                    'nome'
                ],
                include:[
                {

                    model: turmas,
                    as: 'turma',
                    attributes: [
                        'nome_turma',
            
                    ],
                    where:{
                        nome_turma: turma
                    }
                },
                
            ]
                },     
        ],

            });

            if (!VerificarAluno) {
                console.log('Credenciais inválidas');
                return res.status(400).json({error: "Credenciais inválidas"}); 
            }

            //const Disciplina = VerificarProfessor.professor.disciplinas.map(disciplina => disciplina.id_disciplina);


            //req.session.disciplinaId = Disciplina;



            //console.log(Disciplina);

            //const nomeTurma = VerificarProfessor.professor.turmas[0].nome_turma;
            /*
            const buscarTurma = await turmas.findAll({
                attributes: ['id_turma', 'nome_turma'],
                where: {
                    id_professor: VerificarProfessor.professor.id_professor
                }
            });
            */

            //req.session.turmaId = buscarTurma.map(turma => turma.id_turma);

            //req.session.nomeTurma = buscarTurma.map(turma => turma.nome_turma);


           




            //console.log(buscarTurma);

            const gurdarIdAluno = VerificarAluno.aluno.id_aluno;

            //console.log(gurdarIdAluno);

            req.session.alunoId = gurdarIdAluno;

            


            return res.status(200).json(VerificarAluno);

        }catch(error){

            console.error(error);

             return res.status(500).json({ error: error.message });


        }

    }




}

module.exports = new CredenciaisController();
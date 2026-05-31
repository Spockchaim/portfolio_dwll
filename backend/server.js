const express = require('express');
const cors = require('cors');
const prisma = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Helper para rotas CRUD genéricas
const crud = (path, model) => {
  app.get(path, async (req, res) => {
    try { res.json(await prisma[model].findMany()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.post(path, async (req, res) => {
    try { res.status(201).json(await prisma[model].create({ data: req.body })); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.put(`${path}/:id`, async (req, res) => {
    try { res.json(await prisma[model].update({ where: { id: req.params.id }, data: req.body })); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.delete(`${path}/:id`, async (req, res) => {
    try { res.json(await prisma[model].delete({ where: { id: req.params.id } })); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });
};

crud('/projetos', 'projeto');
crud('/formacoes', 'formacao');
crud('/eventos', 'evento');
crud('/blog', 'blogPost');

// Rota customizada para habilidades (agrupamento)
app.get('/habilidades', async (req, res) => {
  try {
    const skills = await prisma.habilidade.findMany();
    const agrupado = skills.reduce((acc, s) => {
      acc[s.categoria] = acc[s.categoria] || [];
      acc[s.categoria].push({ nome: s.nome, nivel: s.nivel });
      return acc;
    }, {});
    res.json(agrupado);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(process.env.PORT || 4001, () => console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 4001}`));


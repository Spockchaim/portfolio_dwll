const prisma = require('../db');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Iniciando migração de dados do db.json...');
  
  // Caminho do db.json (está na raiz do projeto, que é uma pasta acima do backend)
  const dbPath = path.join(__dirname, '../../db.json');
  
  if (!fs.existsSync(dbPath)) {
    console.error(`Erro: Arquivo db.json não encontrado em: ${dbPath}`);
    return;
  }
  
  const rawData = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(rawData);
  
  // Limpar tabelas existentes
  console.log('Limpando dados antigos do banco MySQL...');
  await prisma.projeto.deleteMany();
  await prisma.formacao.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.habilidade.deleteMany();
  
  // 1. Inserir Projetos
  if (db.projetos && Array.isArray(db.projetos)) {
    console.log(`Migrando ${db.projetos.length} projetos...`);
    for (const p of db.projetos) {
      await prisma.projeto.create({
        data: {
          id: p.id,
          titulo: p.titulo,
          desc: p.desc,
          stack: p.stack,
          github: p.github || null,
          hospedagem: p.hospedagem || null
        }
      });
    }
  }
  
  // 2. Inserir Formações
  if (db.formacoes && Array.isArray(db.formacoes)) {
    console.log(`Migrando ${db.formacoes.length} formações...`);
    for (const f of db.formacoes) {
      await prisma.formacao.create({
        data: {
          id: f.id,
          curso: f.curso,
          inst: f.inst,
          ano: f.ano,
          carga: f.carga || null
        }
      });
    }
  }
  
  // 3. Inserir Eventos
  if (db.eventos && Array.isArray(db.eventos)) {
    console.log(`Migrando ${db.eventos.length} eventos...`);
    for (const e of db.eventos) {
      await prisma.evento.create({
        data: {
          id: e.id,
          titulo: e.titulo,
          desc: e.desc,
          data: e.data,
          imagem: e.imagem || null
        }
      });
    }
  }
  
  // 4. Inserir Blog
  if (db.blog && Array.isArray(db.blog)) {
    console.log(`Migrando ${db.blog.length} posts de blog...`);
    for (const b of db.blog) {
      await prisma.blogPost.create({
        data: {
          id: b.id,
          titulo: b.titulo,
          conteudo: b.conteudo
        }
      });
    }
  }
  
  // 5. Inserir Habilidades (Achatando o objeto em linhas da tabela)
  if (db.habilidades && typeof db.habilidades === 'object') {
    console.log('Migrando habilidades...');
    for (const categoria in db.habilidades) {
      const skills = db.habilidades[categoria];
      if (Array.isArray(skills)) {
        console.log(`- Categoria "${categoria}": ${skills.length} habilidades...`);
        for (const s of skills) {
          await prisma.habilidade.create({
            data: {
              categoria: categoria,
              nome: s.nome,
              nivel: s.nivel
            }
          });
        }
      }
    }
  }
  
  console.log('Migração concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

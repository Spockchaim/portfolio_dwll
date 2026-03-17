// Dados iniciais
const dadosPadrao = {
    projetos: [
        { 
            titulo: 'Clube do Milho', 
            desc: 'Site criado para treinar fundamentos de front-end com ferramentas de criação e estilização de página web.', 
            stack: 'HTML · CSS · GitHub · Vercel',
            github: 'https://github.com/Spockchaim/Clube_do_Milho',
            hospedagem: 'https://clube-do-milho.vercel.app/'
        },
        { 
            titulo: 'Janosys IBGE', 
            desc: 'Representação de dados do IBGE de São José dos Campos. Atuação no back-end com raspagem de dados e geração de gráficos.', 
            stack: 'Python · Pandas · Plotly · GitHub · Vercel',
            github: 'https://github.com/Spockchaim/Janosys-Project',
            hospedagem: 'https://janosys.vercel.app/'
        },
        { 
            titulo: 'Bar Buraco-do-Tatu', 
            desc: 'Projeto de um bar temático inspirado no animal Tatu.', 
            stack: 'HTML · CSS · Bootstrap · GitHub · Vercel',
            github: 'https://github.com/Spockchaim/bar-buraco-do-tatu',
            hospedagem: 'https://bar-buraco-do-tatu.vercel.app/'
        }
    ],
    formacoes: [
        { curso: 'Java Fundamentals', inst: 'Oracle/Senac', ano: '06/2023' },
        { curso: 'Java Foundations', inst: 'Oracle/Senac', ano: '12/2023' },
        { curso: 'Desenvolvimento para Android', inst: 'Senai', ano: '06/2024' },
        { curso: 'Front-end Senac (HTML, CSS, JS)', inst: 'Senac', ano: '02/2024' },
        { curso: 'SCRUM', inst: 'FGV (Faculdade Getulio Vargas)', ano: '08/2025' },
        { curso: 'Escola de Inovadores', inst: 'CTPS (Centro Paula Souza)', ano: '10/2025' }
    ],
    blog: [
        { titulo: 'Migração de Portfólio', conteudo: 'Hoje realizei a migração dos meus dados do Vercel para este novo modelo de portfólio com painel administrativo local.' }
    ],
    eventos: [
        { titulo: 'Python Brasil 2025', desc: 'O maior evento de Python na América Latina, com palestras e workshops.', data: '2025', imagem: 'img/pybrasil2025.jpg' },
        { titulo: 'Maratona Fatec', desc: 'Organizado pela Fatec São José dos Campos, focado em lógica de programação.', data: '-', imagem: 'img/maratonaSJC.jpeg' },
        { titulo: 'PyDay #1', desc: 'Organizado pela comunidade PythonSJC em São José dos Campos.', data: '-', imagem: 'img/pyday1.jpeg' },
        { titulo: 'PyDay #2', desc: 'Segundo evento da comunidade PythonSJC, com palestras e workshops.', data: '-', imagem: 'img/pyday2.jpeg' }
    ],
    habilidades: {
        "Linguagens": [
            { nome: 'Python', nivel: '95%' },
            { nome: 'Java', nivel: '85%' },
            { nome: 'Kotlin', nivel: '80%' },
            { nome: 'SQL', nivel: '90%' },
            { nome: 'JavaScript', nivel: '85%' }
        ],
        "Frameworks & Bibliotecas": [
            { nome: 'Pandas', nivel: '90%' },
            { nome: 'Plotly', nivel: '85%' },
            { nome: 'Bootstrap', nivel: '80%' },
            { nome: 'Flask / FastAPI', nivel: '75%' }
        ],
        "Ferramentas & DevOps": [
            { nome: 'Git / GitHub', nivel: '95%' },
            { nome: 'Docker', nivel: '75%' },
            { nome: 'AWS', nivel: '70%' },
            { nome: 'Vercel', nivel: '90%' }
        ],
        "Metodologias": [
            { nome: 'SCRUM', nivel: '95%' },
            { nome: 'Análise de Dados', nivel: '90%' }
        ]
    }
};

// Inicializa o localStorage com os dados padrão se estiver vazio ou se for a versão antiga
function inicializarDados() {
    const projetosSalvos = localStorage.getItem('portifolio_projetos');
    const eventosSalvos = localStorage.getItem('portifolio_eventos');
    
    // Forçar atualização se detectar os dados de exemplo antigos ou se as imagens dos eventos não forem locais
    const precisaResetar = (projetosSalvos && projetosSalvos.includes("Dashboard Creches SJC")) || 
                         (eventosSalvos && eventosSalvos.includes("unsplash.com"));

    if (!projetosSalvos || precisaResetar) {
        localStorage.setItem('portifolio_projetos', JSON.stringify(dadosPadrao.projetos));
        localStorage.setItem('portifolio_formacoes', JSON.stringify(dadosPadrao.formacoes));
        localStorage.setItem('portifolio_blog', JSON.stringify(dadosPadrao.blog));
        localStorage.setItem('portifolio_eventos', JSON.stringify(dadosPadrao.eventos));
        localStorage.setItem('portifolio_habilidades', JSON.stringify(dadosPadrao.habilidades));
        console.log("Dados do portfólio atualizados com sucesso!");
    }
}

// Renderiza o conteúdo na página inicial (index.html)
function renderizarPaginaInicial() {
    inicializarDados();
    
    // Renderiza os Projetos
    const gradeProjetos = document.getElementById('grade-projetos');
    if (gradeProjetos) {
        const projetos = JSON.parse(localStorage.getItem('portifolio_projetos'));
        gradeProjetos.innerHTML = projetos.map(p => `
            <div class="card-projeto">
                <h3>${p.titulo}</h3>
                <p>${p.desc}</p>
                <span class="tecnologias">${p.stack}</span>
                <div class="links-projeto" style="margin-top: 1.5rem; display: flex; gap: 0.8rem;">
                    ${p.github ? `<a href="${p.github}" target="_blank" class="botao-link" style="font-size: 0.8rem; padding: 0.5rem 1rem; border: 1px solid #333; border-radius: 4px; color: #ccc; text-decoration: none;">GitHub</a>` : ''}
                    ${p.hospedagem ? `<a href="${p.hospedagem}" target="_blank" class="botao-link" style="font-size: 0.8rem; padding: 0.5rem 1rem; border: 1px solid #333; border-radius: 4px; color: #ccc; text-decoration: none;">Demo</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Renderiza as Formações
    const listaFormacao = document.getElementById('lista-formacao');
    if (listaFormacao) {
        const formacoes = JSON.parse(localStorage.getItem('portifolio_formacoes'));
        listaFormacao.innerHTML = formacoes.map(f => `
            <div class="card-projeto">
                <h3>${f.curso}</h3>
                <p>${f.inst}</p>
                <span class="tecnologias">Conclusão: ${f.ano}</span>
            </div>
        `).join('');
    }

    // Renderiza os Eventos
    const listaEventos = document.getElementById('lista-eventos');
    if (listaEventos) {
        const eventos = JSON.parse(localStorage.getItem('portifolio_eventos'));
        listaEventos.innerHTML = eventos.map(e => `
            <div class="card-projeto">
                ${e.imagem ? `<img src="${e.imagem}" alt="${e.titulo}" class="foto-evento">` : ''}
                <h3>${e.titulo}</h3>
                <p>${e.desc}</p>
                <span class="tecnologias">Data: ${e.data}</span>
            </div>
        `).join('');
    }

    // Renderiza as Habilidades por Categoria
    const conteinerHabilidades = document.getElementById('lista-habilidades-dinamica');
    if (conteinerHabilidades) {
        const categoriasHabilidades = JSON.parse(localStorage.getItem('portifolio_habilidades'));
        
        let htmlHabilidades = '';
        for (const categoria in categoriasHabilidades) {
            htmlHabilidades += `
                <div class="categoria-habilidade" style="margin-bottom: 3rem;">
                    <h3 style="font-size: 1rem; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem;">${categoria}</h3>
                    <div class="lista-habilidades">
                        ${categoriasHabilidades[categoria].map(h => `
                            <div class="item-habilidade" style="margin-bottom: 1.5rem;">
                                <div class="rotulo-habilidade"><span>${h.nome}</span><span>${h.nivel}</span></div>
                                <div class="barra"><div class="preenchimento" style="width:${h.nivel}"></div></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        conteinerHabilidades.innerHTML = htmlHabilidades;
    }

    // Renderiza o Blog
    const feedBlog = document.getElementById('feed-blog');
    const indicadorCarregamento = document.getElementById('indicador-carregamento');
    if (feedBlog) {
        if(indicadorCarregamento) indicadorCarregamento.style.display = 'none';
        const postagens = JSON.parse(localStorage.getItem('portifolio_blog'));
        if (postagens.length === 0) {
            feedBlog.innerHTML = '<p style="color: #777; font-style: italic;">Nenhum post disponível ainda.</p>';
        } else {
            feedBlog.innerHTML = postagens.map(b => `
                <div class="post-blog" style="opacity: 1; transform: translateY(0); animation: none;">
                    <h3>${b.titulo}</h3>
                    <p>${b.conteudo}</p>
                </div>
            `).join('');
        }
    }
    
    // Lógica da Barra Lateral (Ativar links de acordo com o scroll da tela)
    const secoes = document.querySelectorAll('.secao');
    const navLinks = document.querySelectorAll('nav a[data-secao]');
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const id = entrada.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('ativo');
                    if (link.dataset.secao === id) {
                        link.classList.add('ativo');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    secoes.forEach(s => observador.observe(s));

    // LÓGICA DO MODAL DE ZOOM
    const modal = document.getElementById('modal-zoom');
    const imgModal = document.getElementById('img-modal');
    const tituloModal = document.getElementById('titulo-modal');
    const descModal = document.getElementById('desc-modal');
    const stackModal = document.getElementById('stack-modal');
    const linksModal = document.getElementById('links-modal');
    const spanFechar = document.querySelector('.fechar-modal');

    if (modal) {
        // Seleciona todos os cards de projetos e eventos
        const cards = document.querySelectorAll('#grade-projetos .card-projeto, #lista-eventos .card-projeto');
        
        cards.forEach(card => {
            card.style.cursor = 'zoom-in';
            card.addEventListener('click', () => {
                const titulo = card.querySelector('h3').innerText;
                const desc = card.querySelector('p').innerText;
                const stack = card.querySelector('.tecnologias').innerText;
                const imagem = card.querySelector('img') ? card.querySelector('img').src : '';
                const links = card.querySelector('.links-projeto') ? card.querySelector('.links-projeto').innerHTML : '';

                tituloModal.innerText = titulo;
                descModal.innerText = desc;
                stackModal.innerText = stack;
                
                if (imagem) {
                    imgModal.src = imagem;
                    imgModal.style.display = 'block';
                } else {
                    imgModal.style.display = 'none';
                }

                linksModal.innerHTML = links;
                modal.style.display = 'flex';
            });
        });

        // Fechar ao clicar no X
        spanFechar.onclick = () => { modal.style.display = "none"; }
        // Fechar ao clicar fora do conteúdo
        window.onclick = (event) => { if (event.target == modal) { modal.style.display = "none"; } }
    }
}

// Lógica e Captura de Eventos na página Admin (admin.html)
function configurarAdmin() {
    inicializarDados();

    // Adiciona Projeto
    const formularioProjeto = document.getElementById('form-projeto');
    if (formularioProjeto) {
        formularioProjeto.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = document.getElementById('proj-titulo').value;
            const desc = document.getElementById('proj-desc').value;
            const stack = document.getElementById('proj-stack').value;
            const github = document.getElementById('proj-github').value;
            const hospedagem = document.getElementById('proj-hospedagem').value;
            
            const projetos = JSON.parse(localStorage.getItem('portifolio_projetos'));
            projetos.push({ titulo: titulo, desc: desc, stack: stack, github: github, hospedagem: hospedagem });
            localStorage.setItem('portifolio_projetos', JSON.stringify(projetos));
            
            alert('Projeto adicionado com sucesso!');
            formularioProjeto.reset();
        });
    }

    // Adiciona Formação
    const formularioFormacao = document.getElementById('form-formacao');
    if (formularioFormacao) {
        formularioFormacao.addEventListener('submit', (e) => {
            e.preventDefault();
            const curso = document.getElementById('form-curso').value;
            const inst = document.getElementById('form-inst').value;
            const ano = document.getElementById('form-ano').value;
            
            const formacoes = JSON.parse(localStorage.getItem('portifolio_formacoes'));
            formacoes.push({ curso: curso, inst: inst, ano: ano });
            localStorage.setItem('portifolio_formacoes', JSON.stringify(formacoes));
            
            alert('Formação adicionada com sucesso!');
            formularioFormacao.reset();
        });
    }

    // Adiciona Evento
    const formularioEvento = document.getElementById('form-evento');
    if (formularioEvento) {
        formularioEvento.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = document.getElementById('eve-titulo').value;
            const desc = document.getElementById('eve-desc').value;
            const data = document.getElementById('eve-data').value;
            const imagem = document.getElementById('eve-imagem').value;
            
            const eventos = JSON.parse(localStorage.getItem('portifolio_eventos'));
            eventos.push({ titulo: titulo, desc: desc, data: data, imagem: imagem });
            localStorage.setItem('portifolio_eventos', JSON.stringify(eventos));
            
            alert('Evento adicionado com sucesso!');
            formularioEvento.reset();
        });
    }

    // Adiciona Post no Blog
    const formularioBlog = document.getElementById('form-blog');
    if (formularioBlog) {
        formularioBlog.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = document.getElementById('blog-titulo').value;
            const conteudo = document.getElementById('blog-conteudo').value;
            
            const blog = JSON.parse(localStorage.getItem('portifolio_blog'));
            blog.push({ titulo: titulo, conteudo: conteudo });
            localStorage.setItem('portifolio_blog', JSON.stringify(blog));
            
            alert('Post adicionado com sucesso!');
            formularioBlog.reset();
        });
    }
}

// Roteador Básico
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin.html')) {
        configurarAdmin();
    } else {
        renderizarPaginaInicial();
    }
});

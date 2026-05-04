const API_URL = 'http://localhost:4001';

const API = {
    get: async (recurso) => {
        try {
            const response = await fetch(`${API_URL}/${recurso}`);
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar ${recurso}:`, error);
            return [];
        }
    },
    post: async (recurso, novoDado) => {
        const response = await fetch(`${API_URL}/${recurso}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoDado)
        });
        return await response.json();
    },
    put: async (recurso, id, dadoAtualizado) => {
        const response = await fetch(`${API_URL}/${recurso}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadoAtualizado)
        });
        return await response.json();
    },
    delete: async (recurso, id) => {
        await fetch(`${API_URL}/${recurso}/${id}`, { method: 'DELETE' });
    }
};

// Renderização Geral
async function renderizarPaginaInicial() {
    // Projetos
    const gradeProjetos = document.getElementById('grade-projetos');
    if (gradeProjetos) {
        const dados = await API.get('projetos');
        gradeProjetos.innerHTML = dados.map(p => `
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

    // Formações
    const listaFormacao = document.getElementById('lista-formacao');
    if (listaFormacao) {
        const dados = await API.get('formacoes');
        listaFormacao.innerHTML = dados.map(f => `
            <div class="card-projeto">
                <h3>${f.curso}</h3>
                <p>${f.inst}</p>
                <span class="tecnologias">Conclusão: ${f.ano}</span>
            </div>
        `).join('');
    }

    // Eventos
    const listaEventos = document.getElementById('lista-eventos');
    if (listaEventos) {
        const dados = await API.get('eventos');
        listaEventos.innerHTML = dados.map(e => `
            <div class="card-projeto">
                ${e.imagem ? `<img src="${e.imagem}" alt="${e.titulo}" class="foto-evento">` : ''}
                <h3>${e.titulo}</h3>
                <p>${e.desc}</p>
                <span class="tecnologias">Data: ${e.data}</span>
            </div>
        `).join('');
    }

    // Habilidades
    const conteinerHabilidades = document.getElementById('lista-habilidades-dinamica');
    if (conteinerHabilidades) {
        const categorias = await API.get('habilidades');
        let htmlHabilidades = '';
        
        for (const categoria in categorias) {
            htmlHabilidades += `
                <div class="categoria-habilidade" style="margin-bottom: 3rem;">
                    <h3 style="font-size: 1rem; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem;">${categoria}</h3>
                    <div class="lista-habilidades">
                        ${categorias[categoria].map(h => `
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

    // Blog
    const feedBlog = document.getElementById('feed-blog');
    const indicadorCarregamento = document.getElementById('indicador-carregamento');
    if (feedBlog) {
        const dados = await API.get('blog');
        if (indicadorCarregamento) indicadorCarregamento.style.display = 'none';
        
        feedBlog.innerHTML = dados.map(b => `
            <div class="post-blog">
                <h3>${b.titulo}</h3>
                <p>${b.conteudo}</p>
            </div>
        `).join('');
    }

    // --- LÓGICA DE NAVEGAÇÃO / SCROLL ---
    const secoes = document.querySelectorAll('.secao');
    const navLinks = document.querySelectorAll('nav a[data-secao]');
    const mainContent = document.querySelector('main');
    
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
    }, { 
        root: mainContent, // Define o <main> como área de observação
        threshold: 0.5    // Ativa quando 50% da seção estiver visível
    });
    
    secoes.forEach(s => observador.observe(s));
}

// Configuração da Página Admin
async function configurarAdmin() {
    const formProjeto = document.getElementById('form-projeto');
    const formFormacao = document.getElementById('form-formacao');
    const formEvento = document.getElementById('form-evento');
    const formBlog = document.getElementById('form-blog');
    const listaAdmin = document.getElementById('lista-admin-projetos');

    const atualizarListaAdmin = async () => {
        if (!listaAdmin) return;
        const projetos = await API.get('projetos');
        listaAdmin.innerHTML = projetos.map(p => `
            <div class="item-admin-lista">
                <span>${p.titulo}</span>
                <div class="botoes-acao">
                    <button onclick="editarItem('projetos', '${p.id}')" class="btn-acao btn-edit">Editar (PUT)</button>
                    <button onclick="excluirItem('projetos', '${p.id}')" class="btn-acao btn-delete">Excluir (DELETE)</button>
                </div>
            </div>
        `).join('');
    };

    // POST Projeto
    if (formProjeto) {
        formProjeto.addEventListener('submit', async (e) => {
            e.preventDefault();
            const novo = {
                titulo: document.getElementById('proj-titulo').value,
                desc: document.getElementById('proj-desc').value,
                stack: document.getElementById('proj-stack').value,
                github: document.getElementById('proj-github').value,
                hospedagem: document.getElementById('proj-hospedagem').value
            };
            await API.post('projetos', novo);
            alert('Projeto adicionado com sucesso!');
            await atualizarListaAdmin();
            formProjeto.reset();
        });
    }

    // POST Formação
    if (formFormacao) {
        formFormacao.addEventListener('submit', async (e) => {
            e.preventDefault();
            const novo = {
                curso: document.getElementById('form-curso').value,
                inst: document.getElementById('form-inst').value,
                ano: document.getElementById('form-ano').value
            };
            await API.post('formacoes', novo);
            alert('Formação adicionada com sucesso!');
            formFormacao.reset();
        });
    }

    // POST Evento
    if (formEvento) {
        formEvento.addEventListener('submit', async (e) => {
            e.preventDefault();
            const novo = {
                titulo: document.getElementById('eve-titulo').value,
                desc: document.getElementById('eve-desc').value,
                data: document.getElementById('eve-data').value,
                imagem: document.getElementById('eve-imagem').value
            };
            await API.post('eventos', novo);
            alert('Evento adicionado com sucesso!');
            formEvento.reset();
        });
    }

    // POST Blog
    if (formBlog) {
        formBlog.addEventListener('submit', async (e) => {
            e.preventDefault();
            const novo = {
                titulo: document.getElementById('blog-titulo').value,
                conteudo: document.getElementById('blog-conteudo').value
            };
            await API.post('blog', novo);
            alert('Post publicado no Blog com sucesso!');
            formBlog.reset();
        });
    }

    window.excluirItem = async (recurso, id) => {
        if (confirm('Deseja deletar este item? (DELETE)')) {
            await API.delete(recurso, id);
            await atualizarListaAdmin();
        }
    };

    window.editarItem = async (recurso, id) => {
        const titulo = prompt('Novo título (PUT):');
        if (titulo) {
            const itens = await API.get(recurso);
            const original = itens.find(i => i.id === id);
            await API.put(recurso, id, { ...original, titulo });
            await atualizarListaAdmin();
        }
    };

    await atualizarListaAdmin();
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin.html')) {
        configurarAdmin();
    } else {
        renderizarPaginaInicial();
    }
});

const API_URL = 'http://localhost:4001';

const API = {
    call: async (path, method = 'GET', body) => {
        try {
            const res = await fetch(`${API_URL}/${path}`, {
                method,
                headers: body ? { 'Content-Type': 'application/json' } : {},
                body: body ? JSON.stringify(body) : null
            });
            return method === 'DELETE' ? null : await res.json();
        } catch (e) { console.error(e); return []; }
    }
};

const render = (id, data, tpl) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = data.map(tpl).join('');
};

async function init() {
    if (document.getElementById('grade-projetos')) {
        render('grade-projetos', await API.call('projetos'), p => `
            <div class="card-projeto">
                <h3>${p.titulo}</h3><p>${p.desc}</p><span class="tecnologias">${p.stack}</span>
                <div style="margin-top:1rem;display:flex;gap:.5rem">
                    ${p.github ? `<a href="${p.github}" target="_blank" class="botao-link">GitHub</a>` : ''}
                    ${p.hospedagem ? `<a href="${p.hospedagem}" target="_blank" class="botao-link">Demo</a>` : ''}
                </div>
            </div>`);

        render('lista-formacao', await API.call('formacoes'), f => `
            <div class="card-projeto"><h3>${f.curso}</h3><p>${f.inst}</p><span>${f.ano}</span></div>`);

        render('lista-eventos', await API.call('eventos'), e => `
            <div class="card-projeto">
                ${e.imagem ? `<img src="${e.imagem}" class="foto-evento">` : ''}
                <h3>${e.titulo}</h3><p>${e.desc}</p><span>${e.data}</span>
            </div>`);

        const skills = await API.call('habilidades');
        let html = '';
        for (let cat in skills) {
            html += `<div style="margin-bottom:2rem"><h3>${cat}</h3>` + 
                skills[cat].map(h => `<div style="margin-bottom:1rem">
                    <div class="rotulo-habilidade"><span>${h.nome}</span><span>${h.nivel}</span></div>
                    <div class="barra"><div class="preenchimento" style="width:${h.nivel}"></div></div>
                </div>`).join('') + `</div>`;
        }
        if (document.getElementById('lista-habilidades-dinamica')) 
            document.getElementById('lista-habilidades-dinamica').innerHTML = html;

        render('feed-blog', await API.call('blog'), b => `
            <div class="post-blog"><h3>${b.titulo}</h3><p>${b.conteudo}</p></div>`);
    }

    if (window.location.pathname.includes('admin.html')) {
        const list = document.getElementById('lista-admin-projetos');
        const refresh = async () => {
            const data = await API.call('projetos');
            render('lista-admin-projetos', data, p => `
                <div class="item-admin-lista">
                    <span>${p.titulo}</span>
                    <button onclick="editItem('${p.id}')">Editar</button>
                    <button onclick="delItem('${p.id}')">Excluir</button>
                </div>`);
        };

        window.delItem = async id => { if(confirm('Excluir?')) { await API.call(`projetos/${id}`, 'DELETE'); refresh(); } };
        window.editItem = async id => { 
            const titulo = prompt('Novo título:');
            if(titulo) { await API.call(`projetos/${id}`, 'PUT', { titulo }); refresh(); }
        };

        document.querySelectorAll('form').forEach(f => {
            f.addEventListener('submit', async e => {
                e.preventDefault();
                const resource = f.id.replace('form-', '') + (f.id === 'form-blog' ? '' : 's');
                const data = Object.fromEntries(new FormData(f));
                await API.call(resource === 'blogs' ? 'blog' : resource, 'POST', data);
                alert('Sucesso!');
                f.reset();
                if(resource === 'projetos') refresh();
            });
        });
        refresh();
    }
}

document.addEventListener('DOMContentLoaded', init);


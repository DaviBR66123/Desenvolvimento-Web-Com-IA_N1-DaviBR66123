// AULA 01 — DESENVOLVIMENTO DE SOFTWARE APOIADO POR IA
// Este arquivo começa incompleto de propósito.
// A dupla vai usar IA para completar cada TODO de forma controlada.

const form = document.querySelector("#formChamado");
const titulo = document.querySelector("#titulo");
const categoria = document.querySelector("#categoria");
const prioridade = document.querySelector("#prioridade");
const descricao = document.querySelector("#descricao");
const mensagemErro = document.querySelector("#mensagemErro");

const listaChamados = document.querySelector("#listaChamados");
const pesquisabox = document.querySelector("#pesquisabox");
const filtroStatus = document.querySelector("#filtroStatus");
const totalChamados = document.querySelector("#totalChamados");
const totalAbertos = document.querySelector("#totalAbertos");

// Começamos com uma lista vazia.
// TODO 5: depois esta lista deverá ser carregada do localStorage.
let chamados = [];

// TODO 1
function criarChamado() {
  return {
    id: window.chamadoEmEdicao || Date.now(),
    titulo: titulo.value,
    categoria: categoria.value,
    prioridade: prioridade.value,
    descricao: descricao.value,
    status: window.statusOriginal || "Aberto"
  };
}

// TODO 2
function renderizarChamados() {
  const filtro = filtroStatus.value;
  const termoPesquisa = pesquisabox.value.toLowerCase();

  let chamadosFiltrados = filtro === "Todos"
    ? chamados
    : chamados.filter(chamado => chamado.status === filtro);
      
  chamadosFiltrados = chamadosFiltrados.filter(chamado => 
    chamado.titulo.toLowerCase().includes(termoPesquisa) ||
    chamado.descricao.toLowerCase().includes(termoPesquisa)
  );

  if (chamadosFiltrados.length === 0) {
    listaChamados.innerHTML = "Nenhum chamado cadastrado.";
    return;
  }

  listaChamados.innerHTML = chamadosFiltrados.map(chamado => `
    <div class="card">
      <h3>${chamado.titulo}</h3>
      <p>Categoria: ${chamado.categoria}</p>
      <p>Prioridade: ${chamado.prioridade}</p>
      <p>Descrição: ${chamado.descricao}</p>
      <p>Status: ${chamado.status}</p>
      <button onclick="avancarStatus(${chamado.id})">Avançar status</button>
      <button onclick="editarChamado(${chamado.id})" class="editbuton">Editar</button>
      <button onclick="deletarChamado(${chamado.id})" class="delbuton">Deletar</button>
    </div>
  `).join("");
}
pesquisabox.addEventListener("input", () => {
  renderizarChamados();
});

// TODO 3
function avancarStatus(id) {
  const chamado = chamados.find(chamado => chamado.id === id);

  if (!chamado) return;

  if (chamado.status === "Aberto") {
    chamado.status = "Em andamento";
  } else if (chamado.status === "Em andamento") {
    chamado.status = "Concluído";
  }
  
  salvarChamados();
  renderizarChamados();
}

// TODO 4
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (titulo.value.trim() === "" || descricao.value.trim() === "") {
    mensagemErro.textContent = "Preencha título e descrição.";
    return;
  }

  mensagemErro.textContent = "";

  const chamado = criarChamado();
  chamados.push(chamado);
  salvarChamados();

  form.reset();
  window.chamadoEmEdicao = null;
  window.statusOriginal = null;

  renderizarChamados();
});

// TODO 5
function salvarChamados() {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}
const chamadosSalvos = localStorage.getItem("chamados");
chamados = chamadosSalvos ? JSON.parse(chamadosSalvos) : [];

renderizarChamados();

// O filtro deve redesenhar a lista quando mudar.
filtroStatus.addEventListener("change", () => {
  renderizarChamados();
});

// TODO FINAL
totalChamados.textContent = chamados.length;
totalAbertos.textContent = chamados.filter(chamado => chamado.status === "Aberto").length;



// Atividade Parte 2
// 24/08/2026

// Plugin 1: Deletar Chamado

function deletarChamado(id) {
  if (confirm("Tem certeza que deseja deletar este chamado?")) {
    chamados = chamados.filter(chamado => chamado.id !== id);
    salvarChamados();
    renderizarChamados();
  }
}

// Plugin 2: Editar Chamado

function editarChamado(id) {
  const chamado = chamados.find(chamado => chamado.id === id);

  if (!chamado) return;

  titulo.value = chamado.titulo;
  categoria.value = chamado.categoria;
  prioridade.value = chamado.prioridade;
  descricao.value = chamado.descricao;

  window.chamadoEmEdicao = id;
  window.statusOriginal = chamado.status;

  chamados = chamados.filter(c => c.id !== id);

  form.scrollIntoView({ behavior: "smooth" });
}
# Desenvolvimento-Web-Com-IA_N1-DaviBR66123

# Painel de Chamados

## Objetivo
Gerenciar solicitações internas de suporte com cadastro, acompanhamento e filtro de chamados.

## Funcionalidades
- Criar novos chamados com título, categoria, prioridade e descrição
- Avançar status de chamado (Aberto → Em andamento → Concluído)
- Editar chamados existentes
- Deletar chamados com confirmação
- Filtrar por status (Todos, Aberto, Em andamento, Concluído)
- Buscar chamados por título
- Exibir totalizadores: total de chamados e total de chamados abertos
- Persistir dados no localStorage

## Como executar
1. Abra o arquivo `index.html` em um navegador moderno
2. Preencha título e descrição no formulário "Novo chamado"
3. Selecione categoria e prioridade
4. Clique em "Cadastrar chamado"
5. Use o campo de pesquisa para buscar e o dropdown para filtrar por status
6. Use os botões de ação (Avançar status, Editar, Deletar) nos cards

## Estrutura
- **index.html**: marcação da página com formulário, barra de filtro/busca e área de exibição de chamados
- **style.css**: estilos responsivos, grid layout, cards, botões e componentes de indicadores
- **app.js**: lógica de CRUD, filtro, busca, localStorage, cálculo de indicadores e renderização da lista
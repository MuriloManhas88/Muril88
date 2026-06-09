SpaceGuard AI
Plataforma web demonstrativa para monitoramento e previsao de riscos naturais no Brasil

Projeto desenvolvido para a Global Solution 1 – Space Connect | FIAP


Descricao do Projeto
O SpaceGuard AI e uma plataforma web que combina dados de satelites, inteligencia artificial, geolocalizacao e um dashboard em tempo real para apoiar alertas antecipados de enchentes, queimadas e deslizamentos no Brasil.

Problema
Desastres naturais causam grandes prejuizos humanos, ambientais e economicos. Muitas cidades brasileiras ainda nao conseguem acompanhar riscos em tempo real, dificultando a tomada de decisao por orgaos publicos e a comunicacao preventiva com a populacao.

Solucao
A plataforma apresenta:

Mapa operacional com pontos de risco geolocalizados
Dashboard com indicadores de areas criticas, municipios monitorados, precisao do modelo e tempo medio de alerta
Filtros por tipo de desastre: enchente, queimada e deslizamento
Aba de IA preditiva simulada com escolha de regiao, tipo de evento, variaveis ambientais, score calculado, janela de ocorrencia e acao recomendada
Central de alertas para priorizar comunicacoes preventivas
Envio de alerta para usuario com persistencia em banco SQLite quando executado pelo backend local


Tecnologias Utilizadas

HTML5 Estrutura da interface
CSS3 Estilizacao e layout responsivo
JavaScriptLogica do frontend e interatividade
PythonServidor local (server.py)SQLitePersistencia dos alertas enviados (execucao local)

Layout responsivo sem dependencias externas de framework.


Estrutura do Projeto
.
├── index.html          # Pagina principal da plataforma
├── styles.css          # Estilos e layout responsivo
├── app.js              # Logica do frontend (mapa, IA, alertas)
├── server.py           # Servidor local Python com SQLite
├── README.md           # Documentacao do projeto
└── ENTREGA.txt         # Informacoes de entrega

Como Executar
Requisitos

Python 3 instalado na maquina

Passo a passo
1. Clone ou baixe este repositorio
bashgit clone https://github.com/MuriloManhas88/Muril88.git
cd Muril88
2. Execute o servidor local
bashpython server.py
No Windows, caso python nao esteja disponivel no PATH, use:
bashpy server.py
3. Acesse no navegador
http://127.0.0.1:4174
4. Utilize a plataforma

Explore os filtros do mapa por tipo de desastre
Acesse a aba de IA preditiva e simule cenarios de risco
Utilize a central de alertas para envio de comunicacoes preventivas


Banco de Dados
O banco de dados utilizado e o SQLite, executado localmente na propria maquina. Nao ha conexao com nenhum banco remoto ou servico em nuvem.
Os alertas enviados pela plataforma sao persistidos automaticamente no SQLite quando o projeto e executado via server.py.

Importante: na versao publicada no GitHub Pages, o backend Python nao e executado. Por isso, os alertas enviados nessa versao sao salvos no armazenamento local do navegador (localStorage), sem persistencia em banco de dados.


Versao Publicada (GitHub Pages)
O frontend esta disponivel publicamente como demonstracao em:
https://murilomanhas88.github.io/Muril88/
Como o GitHub Pages nao executa Python nem SQLite, essa versao funciona apenas como demonstracao visual. Para a experiencia completa com persistencia de dados, execute o projeto localmente seguindo as instrucoes acima.

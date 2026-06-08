# SpaceGuard AI

SpaceGuard AI e uma plataforma web demonstrativa para monitoramento e previsao de riscos naturais no Brasil. A solucao combina dados de satelites, inteligencia artificial, geolocalizacao e um dashboard em tempo real para apoiar alertas antecipados de enchentes, queimadas e deslizamentos.

## Problema

Desastres naturais causam grandes prejuizos humanos, ambientais e economicos. Muitas cidades brasileiras ainda nao conseguem acompanhar riscos em tempo real, dificultando a tomada de decisao por orgaos publicos e a comunicacao preventiva com a populacao.

## Solucao

A plataforma apresenta:

- Mapa operacional com pontos de risco geolocalizados.
- Dashboard com indicadores de areas criticas, municipios monitorados, precisao do modelo e tempo medio de alerta.
- Filtros por tipo de desastre: enchente, queimada e deslizamento.
- Aba de IA preditiva simulada com escolha de regiao, tipo de evento, variaveis ambientais, score calculado, janela de ocorrencia e acao recomendada.
- Central de alertas para priorizar comunicacoes preventivas.
- Envio de alerta para usuario com persistencia em banco SQLite quando executado pelo backend local.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Python
- SQLite
- Layout responsivo sem dependencias externas de framework

## Como executar

1. Clone ou baixe este repositorio.
2. Execute o servidor local:

```bash
python server.py
```

No Windows, se `python` nao estiver disponivel, use:

```bash
py server.py
```

3. Acesse no navegador:

```text
http://127.0.0.1:4174
```

4. Use os filtros do mapa, a IA preditiva e a central de envio de alertas.

No GitHub Pages, o frontend funciona como demonstracao publica. Como o GitHub Pages nao executa Python nem SQLite, os alertas enviados na versao publicada sao salvos no armazenamento local do navegador.

## Estrutura do projeto

```text
.
|-- index.html
|-- styles.css
|-- app.js
|-- server.py
|-- README.md
|-- ROTEIRO_VIDEO.md
`-- ENTREGA.txt
```

## Observacao

Esta e uma prova de conceito academica. Os dados exibidos sao simulados para demonstrar a experiencia da parte 2 do projeto.

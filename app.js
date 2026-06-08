const riskPoints = [
  { city: "Rio do Sul - SC", type: "enchente", level: "alto", score: 86, x: 54, y: 72, note: "Chuva acumulada e nivel do rio acima do padrao historico." },
  { city: "Petropolis - RJ", type: "deslizamento", level: "alto", score: 82, x: 61, y: 61, note: "Solo saturado em encostas com alta declividade." },
  { city: "Corumba - MS", type: "queimada", level: "moderado", score: 68, x: 38, y: 51, note: "Baixa umidade e focos de calor detectados por satelite." },
  { city: "Manaus - AM", type: "queimada", level: "alto", score: 79, x: 34, y: 28, note: "Anomalias termicas e vento favoravel a propagacao." },
  { city: "Recife - PE", type: "enchente", level: "moderado", score: 63, x: 68, y: 42, note: "Previsao de chuva intensa em areas urbanas vulneraveis." },
  { city: "Belo Horizonte - MG", type: "deslizamento", level: "baixo", score: 44, x: 57, y: 56, note: "Risco controlado, mas com atencao em regioes de morro." }
];

const factors = [
  ["Chuva prevista", 88, "var(--blue)"],
  ["Umidade do solo", 76, "var(--green)"],
  ["Focos de calor", 61, "var(--red)"],
  ["Vulnerabilidade urbana", 72, "var(--amber)"]
];

const brazilRegions = [
  "Acre", "Rio Branco - AC", "Cruzeiro do Sul - AC",
  "Alagoas", "Maceio - AL", "Arapiraca - AL",
  "Amapa", "Macapa - AP", "Santana - AP",
  "Amazonas", "Manaus - AM", "Parintins - AM", "Itacoatiara - AM",
  "Bahia", "Salvador - BA", "Feira de Santana - BA", "Vitoria da Conquista - BA",
  "Ceara", "Fortaleza - CE", "Juazeiro do Norte - CE", "Sobral - CE",
  "Distrito Federal", "Brasilia - DF", "Ceilandia - DF",
  "Espirito Santo", "Vitoria - ES", "Vila Velha - ES", "Serra - ES",
  "Goias", "Goiania - GO", "Anapolis - GO", "Aparecida de Goiania - GO",
  "Maranhao", "Sao Luis - MA", "Imperatriz - MA",
  "Mato Grosso", "Cuiaba - MT", "Rondonopolis - MT", "Sinop - MT",
  "Mato Grosso do Sul", "Campo Grande - MS", "Corumba - MS", "Dourados - MS",
  "Minas Gerais", "Belo Horizonte - MG", "Uberlandia - MG", "Ouro Preto - MG",
  "Para", "Belem - PA", "Santarem - PA", "Maraba - PA",
  "Paraiba", "Joao Pessoa - PB", "Campina Grande - PB",
  "Parana", "Curitiba - PR", "Londrina - PR", "Foz do Iguacu - PR",
  "Pernambuco", "Recife - PE", "Olinda - PE", "Caruaru - PE",
  "Piaui", "Teresina - PI", "Parnaiba - PI",
  "Rio de Janeiro", "Rio de Janeiro - RJ", "Petropolis - RJ", "Angra dos Reis - RJ",
  "Rio Grande do Norte", "Natal - RN", "Mossoro - RN",
  "Rio Grande do Sul", "Porto Alegre - RS", "Caxias do Sul - RS", "Pelotas - RS",
  "Rondonia", "Porto Velho - RO", "Ji-Parana - RO",
  "Roraima", "Boa Vista - RR",
  "Santa Catarina", "Florianopolis - SC", "Rio do Sul - SC", "Blumenau - SC",
  "Sao Paulo", "Sao Paulo - SP", "Campinas - SP", "Santos - SP",
  "Sergipe", "Aracaju - SE", "Nossa Senhora do Socorro - SE",
  "Tocantins", "Palmas - TO", "Araguaina - TO",
  "Regiao Norte", "Regiao Nordeste", "Regiao Centro-Oeste", "Regiao Sudeste", "Regiao Sul", "Pantanal", "Amazonia Legal", "Semiarido", "Serra do Mar", "Vale do Itajai"
];

const stateRiskProfiles = {
  AC: { base: 62, rain: 72, heat: 54, soil: 68, urban: 48 }, AL: { base: 61, rain: 76, heat: 45, soil: 66, urban: 65 }, AP: { base: 58, rain: 73, heat: 52, soil: 62, urban: 45 }, AM: { base: 72, rain: 60, heat: 86, soil: 48, urban: 57 }, BA: { base: 66, rain: 48, heat: 77, soil: 44, urban: 63 }, CE: { base: 65, rain: 42, heat: 79, soil: 38, urban: 64 }, DF: { base: 55, rain: 50, heat: 62, soil: 42, urban: 70 }, ES: { base: 63, rain: 74, heat: 48, soil: 72, urban: 68 }, GO: { base: 60, rain: 52, heat: 68, soil: 44, urban: 60 }, MA: { base: 64, rain: 68, heat: 66, soil: 58, urban: 55 }, MT: { base: 70, rain: 45, heat: 84, soil: 38, urban: 49 }, MS: { base: 69, rain: 50, heat: 82, soil: 42, urban: 52 }, MG: { base: 67, rain: 72, heat: 50, soil: 74, urban: 70 }, PA: { base: 68, rain: 70, heat: 72, soil: 60, urban: 52 }, PB: { base: 58, rain: 45, heat: 71, soil: 40, urban: 57 }, PR: { base: 61, rain: 69, heat: 43, soil: 65, urban: 64 }, PE: { base: 63, rain: 75, heat: 56, soil: 67, urban: 72 }, PI: { base: 62, rain: 42, heat: 80, soil: 36, urban: 50 }, RJ: { base: 74, rain: 80, heat: 48, soil: 78, urban: 82 }, RN: { base: 56, rain: 40, heat: 76, soil: 35, urban: 55 }, RS: { base: 64, rain: 74, heat: 40, soil: 70, urban: 60 }, RO: { base: 63, rain: 58, heat: 75, soil: 48, urban: 45 }, RR: { base: 60, rain: 50, heat: 78, soil: 41, urban: 42 }, SC: { base: 75, rain: 86, heat: 37, soil: 82, urban: 66 }, SP: { base: 66, rain: 67, heat: 55, soil: 60, urban: 83 }, SE: { base: 57, rain: 55, heat: 70, soil: 46, urban: 57 }, TO: { base: 60, rain: 45, heat: 79, soil: 37, urban: 46 }
};

const riskMap = document.querySelector("#riskMap");
const alertsTable = document.querySelector("#alertsTable");
const factorList = document.querySelector("#factorList");
const scoreRing = document.querySelector("#scoreRing");
const scoreValue = document.querySelector("#scoreValue");
const scoreLabel = document.querySelector("#scoreLabel");
const criticalCount = document.querySelector("#criticalCount");
const lastUpdate = document.querySelector("#lastUpdate");
const toast = document.querySelector("#toast");
const predictionControls = { region: document.querySelector("#regionSelect"), state: document.querySelector("#stateSelect"), event: document.querySelector("#eventSelect"), rain: document.querySelector("#rainInput"), heat: document.querySelector("#heatInput"), soil: document.querySelector("#soilInput"), urban: document.querySelector("#urbanInput") };
const controlLabels = { rain: document.querySelector("#rainValue"), heat: document.querySelector("#heatValue"), soil: document.querySelector("#soilValue"), urban: document.querySelector("#urbanValue") };
const predictionPercent = document.querySelector("#predictionPercent");
const predictionWindow = document.querySelector("#predictionWindow");
const predictionAction = document.querySelector("#predictionAction");
const predictionTimeline = document.querySelector("#predictionTimeline");
const userAlertForm = document.querySelector("#userAlertForm");
const savedAlertsList = document.querySelector("#savedAlertsList");
const alertFormPanel = document.querySelector(".alert-form-panel");
const regionOptions = document.querySelector("#brazilRegionOptions");
const localAlertsKey = "spaceguard-alerts";

function typeLabel(type) { return { enchente: "Enchente", queimada: "Queimada", deslizamento: "Deslizamento" }[type]; }
function levelLabel(level) { return level.charAt(0).toUpperCase() + level.slice(1); }
function renderMapCard(point) { const previous = riskMap.querySelector(".map-card"); if (previous) previous.remove(); const card = document.createElement("div"); card.className = "map-card"; card.innerHTML = `<strong>${point.city}</strong><p>${typeLabel(point.type)} com risco ${point.level}. ${point.note}</p>`; riskMap.appendChild(card); updateScore(point.score, point.level); }
function renderRiskPoints() { riskPoints.forEach((point, index) => { const marker = document.createElement("button"); marker.className = `risk-point ${point.type}`; marker.style.left = `${point.x}%`; marker.style.top = `${point.y}%`; marker.setAttribute("aria-label", `${point.city}: ${typeLabel(point.type)} com risco ${point.level}`); marker.dataset.type = point.type; marker.addEventListener("click", () => renderMapCard(point)); riskMap.appendChild(marker); if (index === 0) renderMapCard(point); }); }
function renderFactors(source = factors) { factorList.innerHTML = source.map(([name, value, color]) => `<div class="factor"><div class="factor-row"><span>${name}</span><strong>${value}%</strong></div><div class="factor-bar"><div class="factor-fill" style="width:${value}%; background:${color}"></div></div></div>`).join(""); }
function renderAlerts() { alertsTable.innerHTML = riskPoints.sort((a, b) => b.score - a.score).map(point => `<article class="alert-row"><div><strong>${point.city}</strong><span>${point.note}</span></div><span>${typeLabel(point.type)}</span><span>Score ${point.score}/100</span><span class="badge ${point.level}">${levelLabel(point.level)}</span></article>`).join(""); }
function updateScore(score, level) { scoreRing.style.setProperty("--score", score); scoreValue.textContent = score; scoreLabel.textContent = `Risco ${level}`; }
function pageTitle(page) { return { dashboard: ["Plataforma web de prevencao", "Monitoramento inteligente de enchentes, queimadas e deslizamentos"], mapa: ["Geolocalizacao em tempo real", "Mapa de risco com dados orbitais e sinais climaticos"], alertas: ["Resposta antecipada", "Central de alertas para populacao e orgaos publicos"], ia: ["Inteligencia artificial preditiva", "Simule cenarios e gere previsoes de risco natural"] }[page]; }
function showPage(page) { document.querySelectorAll(".page").forEach(section => section.classList.toggle("active", section.id === `page-${page}`)); document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === page)); const [eyebrow, title] = pageTitle(page); document.querySelector(".topbar .eyebrow").textContent = eyebrow; document.querySelector(".topbar h1").textContent = title; }
function renderRegionOptions() { regionOptions.innerHTML = brazilRegions.map(region => `<option value="${region}"></option>`).join(""); }
function extractStateCode(region) { const match = region.match(/\b([A-Z]{2})$/); if (match && stateRiskProfiles[match[1]]) return match[1]; return predictionControls.state.value; }
function focusAlertForm() { showPage("alertas"); alertFormPanel.classList.add("focused"); document.querySelector("#recipientName").focus(); setTimeout(() => alertFormPanel.classList.remove("focused"), 1800); }
function openAlertFromPrediction() { const values = getPredictionValues(); const level = riskLevel(calculatePrediction(values)); showPage("alertas"); document.querySelector("#alertCity").value = values.region; document.querySelector("#alertEventType").value = values.event; document.querySelector("#alertRiskLevel").value = level; document.querySelector("#alertMessage").value = `Alerta preventivo para ${values.region}: risco ${level} de ${typeLabel(values.event).toLowerCase()} identificado pela IA preditiva do SpaceGuard AI. Acompanhe os canais oficiais e evite areas vulneraveis.`; alertFormPanel.classList.add("focused"); document.querySelector("#recipientName").focus(); setTimeout(() => alertFormPanel.classList.remove("focused"), 1800); }
function applyFilter(filter) { document.querySelectorAll(".risk-point").forEach(marker => marker.classList.toggle("hidden", filter !== "todos" && marker.dataset.type !== filter)); }
function simulateRefresh() { const variation = Math.floor(Math.random() * 5) - 2; const current = Number(criticalCount.textContent); criticalCount.textContent = Math.max(8, current + variation); lastUpdate.textContent = `Atualizado as ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`; }
function showToast() { toast.classList.add("visible"); setTimeout(() => toast.classList.remove("visible"), 2600); }
function fallbackAlerts() { return JSON.parse(localStorage.getItem(localAlertsKey) || "[]"); }
function saveFallbackAlert(alert) { const current = fallbackAlerts(); current.unshift({ ...alert, id: Date.now(), createdAt: new Date().toISOString() }); localStorage.setItem(localAlertsKey, JSON.stringify(current.slice(0, 20))); return current[0]; }
async function fetchSavedAlerts() { try { const response = await fetch("/api/alerts"); if (!response.ok) throw new Error("API indisponivel"); const data = await response.json(); return data.alerts; } catch (error) { return fallbackAlerts(); } }
function renderSavedAlerts(alerts) { if (!alerts.length) { savedAlertsList.innerHTML = `<div class="empty-state">Nenhum alerta salvo ainda. Envie o primeiro alerta pelo formulario acima.</div>`; return; } savedAlertsList.innerHTML = alerts.map(alert => `<article class="saved-alert-card"><strong>${alert.recipientName} - ${alert.city}</strong><span>${typeLabel(alert.eventType)} | Risco ${alert.riskLevel}</span><span>${alert.recipientContact}</span><span>${alert.message}</span></article>`).join(""); }
async function loadSavedAlerts() { const alerts = await fetchSavedAlerts(); renderSavedAlerts(alerts); }
function formToAlert() { return { recipientName: document.querySelector("#recipientName").value.trim(), recipientContact: document.querySelector("#recipientContact").value.trim(), city: document.querySelector("#alertCity").value, eventType: document.querySelector("#alertEventType").value, riskLevel: document.querySelector("#alertRiskLevel").value, message: document.querySelector("#alertMessage").value.trim() }; }
async function submitUserAlert(event) { event.preventDefault(); const alert = formToAlert(); try { const response = await fetch("/api/alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(alert) }); if (!response.ok) throw new Error("API indisponivel"); } catch (error) { saveFallbackAlert(alert); } userAlertForm.reset(); document.querySelector("#alertMessage").value = "Alerta preventivo: area com risco monitorado pelo SpaceGuard AI. Acompanhe os canais oficiais e evite regioes vulneraveis."; await loadSavedAlerts(); showToast(); }
function getPredictionValues() { return { region: predictionControls.region.value, state: predictionControls.state.value, event: predictionControls.event.value, rain: Number(predictionControls.rain.value), heat: Number(predictionControls.heat.value), soil: Number(predictionControls.soil.value), urban: Number(predictionControls.urban.value) }; }
function riskLevel(score) { if (score >= 75) return "alto"; if (score >= 50) return "moderado"; return "baixo"; }
function clampScore(value) { return Math.max(5, Math.min(98, Math.round(value))); }
function calculatePrediction(values) { const knownPoint = riskPoints.find(point => point.city.toLowerCase() === values.region.toLowerCase()); const profile = stateRiskProfiles[extractStateCode(values.region)] ?? stateRiskProfiles[values.state]; const regionRisk = knownPoint?.score ?? profile.base; const regionalBase = regionRisk * 0.18; const scoreByEvent = { enchente: values.rain * 0.38 + values.soil * 0.26 + values.urban * 0.22 + (100 - values.heat) * 0.14, queimada: values.heat * 0.46 + (100 - values.rain) * 0.22 + (100 - values.soil) * 0.18 + values.urban * 0.14, deslizamento: values.rain * 0.34 + values.soil * 0.30 + values.urban * 0.24 + regionRisk * 0.12 }; return clampScore(scoreByEvent[values.event] + regionalBase); }
function predictionMessage(score) { if (score >= 80) return ["0 a 6 horas", "Enviar alerta preventivo"]; if (score >= 60) return ["6 a 12 horas", "Manter equipes em prontidao"]; if (score >= 40) return ["12 a 24 horas", "Monitorar evolucao do cenario"]; return ["24 a 48 horas", "Sem alerta emergencial"]; }
function renderPredictionTimeline(score) { const timeline = [["Agora", clampScore(score - 6)], ["0-6h", score], ["6-12h", clampScore(score - 9)], ["12-24h", clampScore(score - 17)]]; predictionTimeline.innerHTML = timeline.map(([label, value], index) => `<div class="timeline-step ${index === 1 ? "active" : ""}"><span>${label}</span><strong>${value}%</strong><small>risco previsto</small></div>`).join(""); }
function updatePrediction() { const values = getPredictionValues(); const score = calculatePrediction(values); const level = riskLevel(score); const [windowText, actionText] = predictionMessage(score); controlLabels.rain.textContent = `${values.rain}%`; controlLabels.heat.textContent = `${values.heat}%`; controlLabels.soil.textContent = `${values.soil}%`; controlLabels.urban.textContent = `${values.urban}%`; predictionPercent.textContent = `${score}%`; predictionWindow.textContent = windowText; predictionAction.textContent = actionText; updateScore(score, level); renderFactors([["Chuva prevista", values.rain, "var(--blue)"], ["Umidade do solo", values.soil, "var(--green)"], ["Focos de calor", values.heat, "var(--red)"], ["Vulnerabilidade urbana", values.urban, "var(--amber)"]]); renderPredictionTimeline(score); }
function loadRegionPreset() { const selected = riskPoints.find(point => point.city.toLowerCase() === predictionControls.region.value.toLowerCase()); const profile = stateRiskProfiles[extractStateCode(predictionControls.region.value)]; if (!selected) { predictionControls.rain.value = profile.rain; predictionControls.heat.value = profile.heat; predictionControls.soil.value = profile.soil; predictionControls.urban.value = profile.urban; updatePrediction(); return; } predictionControls.event.value = selected.type; predictionControls.state.value = extractStateCode(selected.city); predictionControls.rain.value = selected.type === "enchente" || selected.type === "deslizamento" ? Math.min(96, selected.score + 4) : 28; predictionControls.heat.value = selected.type === "queimada" ? Math.min(96, selected.score + 7) : 35; predictionControls.soil.value = selected.type === "deslizamento" || selected.type === "enchente" ? Math.min(94, selected.score) : 30; predictionControls.urban.value = Math.min(92, Math.max(42, selected.score - 4)); updatePrediction(); }

document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => showPage(button.dataset.page)));
document.querySelectorAll(".segment").forEach(button => { button.addEventListener("click", () => { document.querySelectorAll(".segment").forEach(item => item.classList.remove("active")); button.classList.add("active"); applyFilter(button.dataset.filter); }); });
document.querySelector("#refreshButton").addEventListener("click", simulateRefresh);
document.querySelector("#sendAlertButton").addEventListener("click", focusAlertForm);
userAlertForm.addEventListener("submit", submitUserAlert);
document.querySelector("#runPredictionButton").addEventListener("click", () => { updatePrediction(); showToast(); });
document.querySelector("#createPredictionAlertButton").addEventListener("click", openAlertFromPrediction);
Object.entries(predictionControls).forEach(([name, control]) => { if (name === "region") { control.addEventListener("change", loadRegionPreset); control.addEventListener("input", updatePrediction); return; } if (name === "state") { control.addEventListener("change", () => { const profile = stateRiskProfiles[control.value]; predictionControls.rain.value = profile.rain; predictionControls.heat.value = profile.heat; predictionControls.soil.value = profile.soil; predictionControls.urban.value = profile.urban; updatePrediction(); }); return; } control.addEventListener("input", updatePrediction); control.addEventListener("change", updatePrediction); });

renderRiskPoints();
renderRegionOptions();
renderFactors();
renderAlerts();
updatePrediction();
loadSavedAlerts();

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

const riskMap = document.querySelector("#riskMap");
const alertsTable = document.querySelector("#alertsTable");
const factorList = document.querySelector("#factorList");
const scoreRing = document.querySelector("#scoreRing");
const scoreValue = document.querySelector("#scoreValue");
const scoreLabel = document.querySelector("#scoreLabel");
const criticalCount = document.querySelector("#criticalCount");
const lastUpdate = document.querySelector("#lastUpdate");
const toast = document.querySelector("#toast");
const predictionControls = {
  region: document.querySelector("#regionSelect"),
  event: document.querySelector("#eventSelect"),
  rain: document.querySelector("#rainInput"),
  heat: document.querySelector("#heatInput"),
  soil: document.querySelector("#soilInput"),
  urban: document.querySelector("#urbanInput")
};
const controlLabels = {
  rain: document.querySelector("#rainValue"),
  heat: document.querySelector("#heatValue"),
  soil: document.querySelector("#soilValue"),
  urban: document.querySelector("#urbanValue")
};
const predictionPercent = document.querySelector("#predictionPercent");
const predictionWindow = document.querySelector("#predictionWindow");
const predictionAction = document.querySelector("#predictionAction");
const predictionTimeline = document.querySelector("#predictionTimeline");
const userAlertForm = document.querySelector("#userAlertForm");
const savedAlertsList = document.querySelector("#savedAlertsList");
const localAlertsKey = "spaceguard-alerts";

function typeLabel(type) {
  return {
    enchente: "Enchente",
    queimada: "Queimada",
    deslizamento: "Deslizamento"
  }[type];
}

function levelLabel(level) {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function renderMapCard(point) {
  const previous = riskMap.querySelector(".map-card");
  if (previous) previous.remove();

  const card = document.createElement("div");
  card.className = "map-card";
  card.innerHTML = `<strong>${point.city}</strong><p>${typeLabel(point.type)} com risco ${point.level}. ${point.note}</p>`;
  riskMap.appendChild(card);

  updateScore(point.score, point.level);
}

function renderRiskPoints() {
  riskPoints.forEach((point, index) => {
    const marker = document.createElement("button");
    marker.className = `risk-point ${point.type}`;
    marker.style.left = `${point.x}%`;
    marker.style.top = `${point.y}%`;
    marker.setAttribute("aria-label", `${point.city}: ${typeLabel(point.type)} com risco ${point.level}`);
    marker.dataset.type = point.type;
    marker.addEventListener("click", () => renderMapCard(point));
    riskMap.appendChild(marker);

    if (index === 0) renderMapCard(point);
  });
}

function renderFactors(source = factors) {
  factorList.innerHTML = source.map(([name, value, color]) => `
    <div class="factor">
      <div class="factor-row"><span>${name}</span><strong>${value}%</strong></div>
      <div class="factor-bar"><div class="factor-fill" style="width:${value}%; background:${color}"></div></div>
    </div>
  `).join("");
}

function renderAlerts() {
  alertsTable.innerHTML = riskPoints
    .sort((a, b) => b.score - a.score)
    .map(point => `
      <article class="alert-row">
        <div><strong>${point.city}</strong><span>${point.note}</span></div>
        <span>${typeLabel(point.type)}</span>
        <span>Score ${point.score}/100</span>
        <span class="badge ${point.level}">${levelLabel(point.level)}</span>
      </article>
    `).join("");
}

function updateScore(score, level) {
  scoreRing.style.setProperty("--score", score);
  scoreValue.textContent = score;
  scoreLabel.textContent = `Risco ${level}`;
}

function pageTitle(page) {
  return {
    dashboard: ["Plataforma web de prevencao", "Monitoramento inteligente de enchentes, queimadas e deslizamentos"],
    mapa: ["Geolocalizacao em tempo real", "Mapa de risco com dados orbitais e sinais climaticos"],
    alertas: ["Resposta antecipada", "Central de alertas para populacao e orgaos publicos"],
    ia: ["Inteligencia artificial preditiva", "Simule cenarios e gere previsoes de risco natural"]
  }[page];
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle("active", section.id === `page-${page}`);
  });

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  const [eyebrow, title] = pageTitle(page);
  document.querySelector(".topbar .eyebrow").textContent = eyebrow;
  document.querySelector(".topbar h1").textContent = title;
}

function applyFilter(filter) {
  document.querySelectorAll(".risk-point").forEach(marker => {
    marker.classList.toggle("hidden", filter !== "todos" && marker.dataset.type !== filter);
  });
}

function simulateRefresh() {
  const variation = Math.floor(Math.random() * 5) - 2;
  const current = Number(criticalCount.textContent);
  criticalCount.textContent = Math.max(8, current + variation);
  lastUpdate.textContent = `Atualizado as ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

function showToast() {
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2600);
}

function fallbackAlerts() {
  return JSON.parse(localStorage.getItem(localAlertsKey) || "[]");
}

function saveFallbackAlert(alert) {
  const current = fallbackAlerts();
  current.unshift({ ...alert, id: Date.now(), createdAt: new Date().toISOString() });
  localStorage.setItem(localAlertsKey, JSON.stringify(current.slice(0, 20)));
  return current[0];
}

async function fetchSavedAlerts() {
  try {
    const response = await fetch("/api/alerts");
    if (!response.ok) throw new Error("API indisponivel");
    const data = await response.json();
    return data.alerts;
  } catch (error) {
    return fallbackAlerts();
  }
}

function renderSavedAlerts(alerts) {
  if (!alerts.length) {
    savedAlertsList.innerHTML = `<div class="empty-state">Nenhum alerta salvo ainda. Envie o primeiro alerta pelo formulario acima.</div>`;
    return;
  }

  savedAlertsList.innerHTML = alerts.map(alert => `
    <article class="saved-alert-card">
      <strong>${alert.recipientName} - ${alert.city}</strong>
      <span>${typeLabel(alert.eventType)} | Risco ${alert.riskLevel}</span>
      <span>${alert.recipientContact}</span>
      <span>${alert.message}</span>
    </article>
  `).join("");
}

async function loadSavedAlerts() {
  const alerts = await fetchSavedAlerts();
  renderSavedAlerts(alerts);
}

function formToAlert() {
  return {
    recipientName: document.querySelector("#recipientName").value.trim(),
    recipientContact: document.querySelector("#recipientContact").value.trim(),
    city: document.querySelector("#alertCity").value,
    eventType: document.querySelector("#alertEventType").value,
    riskLevel: document.querySelector("#alertRiskLevel").value,
    message: document.querySelector("#alertMessage").value.trim()
  };
}

async function submitUserAlert(event) {
  event.preventDefault();
  const alert = formToAlert();

  try {
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alert)
    });
    if (!response.ok) throw new Error("API indisponivel");
  } catch (error) {
    saveFallbackAlert(alert);
  }

  userAlertForm.reset();
  document.querySelector("#alertMessage").value = "Alerta preventivo: area com risco monitorado pelo SpaceGuard AI. Acompanhe os canais oficiais e evite regioes vulneraveis.";
  await loadSavedAlerts();
  showToast();
}

function getPredictionValues() {
  return {
    region: predictionControls.region.value,
    event: predictionControls.event.value,
    rain: Number(predictionControls.rain.value),
    heat: Number(predictionControls.heat.value),
    soil: Number(predictionControls.soil.value),
    urban: Number(predictionControls.urban.value)
  };
}

function riskLevel(score) {
  if (score >= 75) return "alto";
  if (score >= 50) return "moderado";
  return "baixo";
}

function clampScore(value) {
  return Math.max(5, Math.min(98, Math.round(value)));
}

function calculatePrediction(values) {
  const regionRisk = riskPoints.find(point => point.city === values.region)?.score ?? 55;
  const regionalBase = regionRisk * 0.18;

  const scoreByEvent = {
    enchente: values.rain * 0.38 + values.soil * 0.26 + values.urban * 0.22 + (100 - values.heat) * 0.14,
    queimada: values.heat * 0.46 + (100 - values.rain) * 0.22 + (100 - values.soil) * 0.18 + values.urban * 0.14,
    deslizamento: values.rain * 0.34 + values.soil * 0.30 + values.urban * 0.24 + regionRisk * 0.12
  };

  return clampScore(scoreByEvent[values.event] + regionalBase);
}

function predictionMessage(score) {
  if (score >= 80) {
    return ["0 a 6 horas", "Enviar alerta preventivo"];
  }
  if (score >= 60) {
    return ["6 a 12 horas", "Manter equipes em prontidao"];
  }
  if (score >= 40) {
    return ["12 a 24 horas", "Monitorar evolucao do cenario"];
  }
  return ["24 a 48 horas", "Sem alerta emergencial"];
}

function renderPredictionTimeline(score) {
  const timeline = [
    ["Agora", clampScore(score - 6)],
    ["0-6h", score],
    ["6-12h", clampScore(score - 9)],
    ["12-24h", clampScore(score - 17)]
  ];

  predictionTimeline.innerHTML = timeline.map(([label, value], index) => `
    <div class="timeline-step ${index === 1 ? "active" : ""}">
      <span>${label}</span>
      <strong>${value}%</strong>
      <small>risco previsto</small>
    </div>
  `).join("");
}

function updatePrediction() {
  const values = getPredictionValues();
  const score = calculatePrediction(values);
  const level = riskLevel(score);
  const [windowText, actionText] = predictionMessage(score);

  controlLabels.rain.textContent = `${values.rain}%`;
  controlLabels.heat.textContent = `${values.heat}%`;
  controlLabels.soil.textContent = `${values.soil}%`;
  controlLabels.urban.textContent = `${values.urban}%`;
  predictionPercent.textContent = `${score}%`;
  predictionWindow.textContent = windowText;
  predictionAction.textContent = actionText;

  updateScore(score, level);
  renderFactors([
    ["Chuva prevista", values.rain, "var(--blue)"],
    ["Umidade do solo", values.soil, "var(--green)"],
    ["Focos de calor", values.heat, "var(--red)"],
    ["Vulnerabilidade urbana", values.urban, "var(--amber)"]
  ]);
  renderPredictionTimeline(score);
}

function loadRegionPreset() {
  const selected = riskPoints.find(point => point.city === predictionControls.region.value);
  if (!selected) return;

  predictionControls.event.value = selected.type;
  predictionControls.rain.value = selected.type === "enchente" || selected.type === "deslizamento" ? Math.min(96, selected.score + 4) : 28;
  predictionControls.heat.value = selected.type === "queimada" ? Math.min(96, selected.score + 7) : 35;
  predictionControls.soil.value = selected.type === "deslizamento" || selected.type === "enchente" ? Math.min(94, selected.score) : 30;
  predictionControls.urban.value = Math.min(92, Math.max(42, selected.score - 4));
  updatePrediction();
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll(".segment").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    applyFilter(button.dataset.filter);
  });
});

document.querySelector("#refreshButton").addEventListener("click", simulateRefresh);
document.querySelector("#sendAlertButton").addEventListener("click", showToast);
userAlertForm.addEventListener("submit", submitUserAlert);
document.querySelector("#runPredictionButton").addEventListener("click", () => {
  updatePrediction();
  showToast();
});

Object.entries(predictionControls).forEach(([name, control]) => {
  if (name === "region") {
    control.addEventListener("change", loadRegionPreset);
    return;
  }
  control.addEventListener("input", updatePrediction);
  control.addEventListener("change", updatePrediction);
});

renderRiskPoints();
renderFactors();
renderAlerts();
updatePrediction();
loadSavedAlerts();

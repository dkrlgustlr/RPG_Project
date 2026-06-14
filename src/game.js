import {
  IDLE_STORAGE_KEY,
  applyIdleUpgrade,
  calculateOfflineReward,
  createIdleUiState,
  formatCompactNumber,
  getIdleUpgradeRows,
  getStageProgress,
  normalizeIdleUiState
} from "./idleUiState.js";

const starDustEl = document.querySelector("#starDustValue");
const starCrystalEl = document.querySelector("#starCrystalValue");
const stageTitleEl = document.querySelector("#stageTitle");
const stageProgressFillEl = document.querySelector("#stageProgressFill");
const stageProgressLabelEl = document.querySelector("#stageProgressLabel");
const bossCountdownEl = document.querySelector("#bossCountdown");
const upgradeListEl = document.querySelector("#upgradeList");
const bottomNavEl = document.querySelector("#bottomNav");
const offlineNoticeEl = document.querySelector("#offlineNotice");
const settingsButton = document.querySelector("#settingsButton");
const ultimateButton = document.querySelector("#ultimateButton");
const ultimateCutscene = document.querySelector("#ultimateCutscene");

const ULTIMATE_CUTSCENE_CLASS = "is-playing";

let state = loadState();
const offlineReward = calculateOfflineReward(state);

if (offlineReward.starDust > 0) {
  state = {
    ...state,
    starDust: state.starDust + offlineReward.starDust,
    notice: `오프라인 보상 +${formatCompactNumber(offlineReward.starDust)} 별가루`
  };
}

state = { ...state, lastSavedAt: Date.now() };

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(IDLE_STORAGE_KEY));
    return normalizeIdleUiState(saved);
  } catch {
    return createIdleUiState();
  }
}

function saveState() {
  localStorage.setItem(IDLE_STORAGE_KEY, JSON.stringify({
    ...state,
    lastSavedAt: Date.now()
  }));
}

function renderResources() {
  starDustEl.textContent = formatCompactNumber(state.starDust);
  starCrystalEl.textContent = formatCompactNumber(state.starCrystal);
}

function renderStage() {
  const progress = getStageProgress(state);
  stageTitleEl.textContent = state.stageTitle;
  stageProgressLabelEl.textContent = progress.label;
  stageProgressFillEl.style.width = `${(progress.current / progress.total) * 100}%`;
  bossCountdownEl.textContent = String(progress.bossCountdown);
}

function renderUpgradeRows() {
  upgradeListEl.innerHTML = getIdleUpgradeRows(state)
    .map((row) => `
      <article class="upgrade-row ${row.canAfford ? "" : "unaffordable"}">
        <span class="upgrade-icon ${row.icon}" aria-hidden="true"></span>
        <div class="upgrade-copy">
          <strong>${row.name}</strong>
          <span>${row.levelLabel}</span>
          <em>${row.increaseText}</em>
        </div>
        <div class="upgrade-cost">
          <span aria-hidden="true">★</span>
          <strong>${formatCompactNumber(row.cost)}</strong>
        </div>
        <button class="upgrade-button" type="button" data-upgrade-id="${row.id}">
          강화
        </button>
      </article>
    `)
    .join("");
}

function renderNotice() {
  if (!state.notice) {
    offlineNoticeEl.classList.add("hidden");
    offlineNoticeEl.textContent = "";
    return;
  }

  offlineNoticeEl.textContent = state.notice;
  offlineNoticeEl.classList.remove("hidden");
}

function renderTabs() {
  for (const button of bottomNavEl.querySelectorAll("[data-tab]")) {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  }
}

function render() {
  state = normalizeIdleUiState(state);
  renderResources();
  renderStage();
  renderUpgradeRows();
  renderTabs();
  renderNotice();
  saveState();
}

upgradeListEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-upgrade-id]");
  if (!button) return;

  state = applyIdleUpgrade(state, button.dataset.upgradeId);
  render();
});

bottomNavEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;

  state = {
    ...state,
    activeTab: button.dataset.tab,
    notice: button.classList.contains("locked")
      ? `${button.innerText.trim()} 준비 중`
      : ""
  };
  render();
});

settingsButton.addEventListener("click", () => {
  state = {
    ...state,
    notice: "설정 UI는 다음 단계에서 연결할게요"
  };
  render();
});

function playUltimateCutscene() {
  if (!ultimateCutscene) return;

  ultimateCutscene.classList.remove(ULTIMATE_CUTSCENE_CLASS);
  void ultimateCutscene.offsetWidth;
  ultimateCutscene.classList.add(ULTIMATE_CUTSCENE_CLASS);
}

if (ultimateButton && ultimateCutscene) {
  ultimateButton.addEventListener("click", playUltimateCutscene);
  ultimateCutscene.addEventListener("animationend", (event) => {
    if (event.animationName === "ultimate-cutscene-in-out") {
      ultimateCutscene.classList.remove(ULTIMATE_CUTSCENE_CLASS);
    }
  });
}

render();

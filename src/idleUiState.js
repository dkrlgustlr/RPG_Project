export const IDLE_STORAGE_KEY = "paulIdleRpg.ui.v1";

export const IDLE_UPGRADE_DEFINITIONS = {
  attack: {
    name: "공격력",
    icon: "sword",
    baseLevel: 12,
    baseCost: 2450,
    costStep: 330,
    increasePerLevel: 120,
    increaseLabel: "공격력"
  },
  hp: {
    name: "체력",
    icon: "heart",
    baseLevel: 11,
    baseCost: 2150,
    costStep: 310,
    increasePerLevel: 1100,
    increaseLabel: "체력"
  },
  defense: {
    name: "방어력",
    icon: "shield",
    baseLevel: 10,
    baseCost: 1850,
    costStep: 285,
    increasePerLevel: 55,
    increaseLabel: "방어력"
  }
};

export function createIdleUiState(now = Date.now()) {
  return {
    regionName: "별빛 초원",
    stage: 1,
    highestStage: 1,
    stageTitle: "별빛 초원 1-1",
    starDust: 2450,
    starCrystal: 120,
    lastSavedAt: now,
    activeTab: "upgrade",
    notice: "",
    upgrades: Object.fromEntries(
      Object.entries(IDLE_UPGRADE_DEFINITIONS).map(([id, definition]) => [
        id,
        { level: definition.baseLevel }
      ])
    )
  };
}

export function normalizeIdleUiState(saved, now = Date.now()) {
  const base = createIdleUiState(now);
  const next = {
    ...base,
    ...saved,
    upgrades: {
      ...base.upgrades,
      ...(saved?.upgrades ?? {})
    }
  };
  next.stage = clampStage(next.stage);
  next.highestStage = Math.max(clampStage(next.highestStage), next.stage);
  next.stageTitle = `${next.regionName} 1-${next.stage}`;
  next.starDust = Math.max(0, Math.floor(Number(next.starDust) || 0));
  next.starCrystal = Math.max(0, Math.floor(Number(next.starCrystal) || 0));
  next.lastSavedAt = Number(next.lastSavedAt) || now;
  return next;
}

export function getStageProgress(state) {
  const current = clampStage(state.stage);
  return {
    current,
    total: 10,
    label: `${current}/10`,
    bossCountdown: Math.max(0, 10 - current),
    isBoss: current === 10
  };
}

export function getIdleUpgradeRows(state) {
  return Object.entries(IDLE_UPGRADE_DEFINITIONS).map(([id, definition]) => {
    const level = Math.max(definition.baseLevel, state.upgrades?.[id]?.level ?? definition.baseLevel);
    const extraLevels = level - definition.baseLevel;
    const cost = definition.baseCost + extraLevels * definition.costStep;
    const nextIncrease = definition.increasePerLevel * (extraLevels + 1);

    return {
      id,
      name: definition.name,
      icon: definition.icon,
      level,
      levelLabel: `Lv. ${level}`,
      cost,
      canAfford: state.starDust >= cost,
      increaseText: `${definition.increaseLabel} ${formatCompactNumber(nextIncrease)} 증가`
    };
  });
}

export function applyIdleUpgrade(state, upgradeId) {
  const row = getIdleUpgradeRows(state).find((item) => item.id === upgradeId);
  if (!row) return { ...state, notice: "준비 중인 강화예요" };
  if (!row.canAfford) return { ...state, notice: "별가루가 부족해요" };

  return {
    ...state,
    starDust: state.starDust - row.cost,
    notice: `${row.name} 강화 완료`,
    upgrades: {
      ...state.upgrades,
      [upgradeId]: {
        level: row.level + 1
      }
    }
  };
}

export function calculateOfflineReward(state, now = Date.now()) {
  const elapsedSeconds = Math.max(
    0,
    Math.min(60 * 60 * 8, Math.floor((now - state.lastSavedAt) / 1000))
  );
  const starDust = Math.floor((elapsedSeconds / 60) * Math.max(1, state.highestStage) * 3);

  return {
    elapsedSeconds,
    starDust
  };
}

export function formatCompactNumber(value) {
  const number = Math.max(0, Number(value) || 0);
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  return Math.round(number).toLocaleString("en-US");
}

function clampStage(stage) {
  return Math.min(10, Math.max(1, Math.floor(Number(stage) || 1)));
}

import { META_TREE } from "./gameData.js";

export function getMetaNode(nodeId) {
  return META_TREE.find((node) => node.id === nodeId);
}

export function getMetaEffects(unlockedNodeIds = []) {
  const unlocked = new Set(unlockedNodeIds);
  const effects = {
    damageMultiplier: 0,
    maxHealth: 0,
    pickupRange: 0,
    rewardMultiplier: 0,
    rerolls: 0,
    engineeringBonus: 0,
    startingPierce: 0,
    startingDamageLevel: 0,
    startingHealthLevel: 0
  };

  for (const node of META_TREE) {
    if (!unlocked.has(node.id)) continue;
    for (const [key, value] of Object.entries(node.effects)) {
      if (typeof value === "number") {
        effects[key] = (effects[key] ?? 0) + value;
      }
    }
  }

  return effects;
}

export function calculateRunReward(summary, unlockedNodeIds = []) {
  const timeReward = Math.floor(summary.secondsSurvived / 5);
  const killReward = Math.floor(summary.kills / 5);
  const levelReward = summary.levels * 3;
  const bossReward = summary.bossDefeated ? 50 : 0;
  const baseReward = timeReward + killReward + levelReward + bossReward;
  const effects = getMetaEffects(unlockedNodeIds);

  return {
    coreShards: Math.round(baseReward * (1 + effects.rewardMultiplier))
  };
}

export function canPurchaseNode(nodeId, state) {
  const node = getMetaNode(nodeId);
  if (!node) return false;
  if (state.unlockedNodes.includes(nodeId)) return false;
  if (state.coreShards < node.cost) return false;
  return node.prerequisites.every((requiredId) => state.unlockedNodes.includes(requiredId));
}

export function purchaseNode(nodeId, state) {
  if (!canPurchaseNode(nodeId, state)) {
    return { ...state, unlockedNodes: [...state.unlockedNodes] };
  }

  const node = getMetaNode(nodeId);
  return {
    ...state,
    coreShards: state.coreShards - node.cost,
    unlockedNodes: [...state.unlockedNodes, nodeId]
  };
}

export function createDefaultProgress() {
  return {
    coreShards: 0,
    unlockedNodes: ["root-core"],
    unlockedCharacterIds: ["core-minion"],
    selectedCharacterId: "core-minion",
    bestSeconds: 0,
    bestKills: 0
  };
}

export function applyRunReward(progress, summary) {
  const reward = calculateRunReward(summary, progress.unlockedNodes);
  return {
    ...progress,
    coreShards: progress.coreShards + reward.coreShards,
    bestSeconds: Math.max(progress.bestSeconds ?? 0, summary.secondsSurvived),
    bestKills: Math.max(progress.bestKills ?? 0, summary.kills),
    lastReward: reward.coreShards
  };
}

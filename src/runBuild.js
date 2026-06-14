import { KIND_LABELS, META_TREE, RARITY_LABELS, RARITY_WEIGHTS, SKILLS, SYNERGIES } from "./gameData.js";

export function getUnlockedSkills(unlockedNodeIds = []) {
  const unlocked = new Set(unlockedNodeIds);
  return SKILLS.filter((skill) => !skill.lockedBy || unlocked.has(skill.lockedBy));
}

export function getActiveSynergies(selectedSkillIds = [], unlockedNodeIds = []) {
  const selected = new Set(selectedSkillIds);
  const unlocked = new Set(unlockedNodeIds);

  return SYNERGIES.filter((synergy) => {
    const hasSkills = synergy.requiredSkills.every((skillId) => selected.has(skillId));
    const hasNode = !synergy.requiredNode || unlocked.has(synergy.requiredNode);
    return hasSkills && hasNode;
  });
}

export function getSkillById(skillId) {
  return SKILLS.find((skill) => skill.id === skillId);
}

export function getChoicePresentation(skillOrId, skillLevels = {}) {
  const skill = typeof skillOrId === "string" ? getSkillById(skillOrId) : skillOrId;
  const currentLevel = skillLevels[skill.id] ?? 0;
  const isUpgrade = currentLevel > 0;
  const baseKindLabel = KIND_LABELS[skill.kind] ?? skill.kind;
  const rarity = skill.rarity ?? "common";

  return {
    title: isUpgrade ? `${skill.name} 강화` : skill.name,
    kindLabel: skill.kind === "weapon" && !isUpgrade ? "무기 획득" : `${baseKindLabel} 강화`,
    rarity,
    rarityLabel: RARITY_LABELS[rarity] ?? rarity,
    rarityClass: `rarity-${rarity}`,
    levelLabel: `Lv ${currentLevel + 1}/${skill.maxLevel}`,
    isUpgrade
  };
}

function getNodeById(nodeId) {
  return META_TREE.find((node) => node.id === nodeId);
}

export function getSynergyGuides(selectedSkillIds = [], unlockedNodeIds = []) {
  const selected = new Set(selectedSkillIds);
  const unlocked = new Set(unlockedNodeIds);

  return SYNERGIES.map((synergy) => {
    const requiredSkills = synergy.requiredSkills.map((skillId) => getSkillById(skillId)).filter(Boolean);
    const missingSkillNames = requiredSkills.filter((skill) => !selected.has(skill.id)).map((skill) => skill.name);
    const requiredNode = synergy.requiredNode ? getNodeById(synergy.requiredNode) : null;
    const nodeLocked = Boolean(requiredNode && !unlocked.has(requiredNode.id));
    const active = missingSkillNames.length === 0 && !nodeLocked;
    const lockText = nodeLocked ? `${requiredNode.name} 필요` : "";
    const statusText = active
      ? "발동됨"
      : nodeLocked
        ? lockText
        : `필요: ${missingSkillNames.join(", ")}`;

    return {
      ...synergy,
      active,
      missingSkillNames,
      requirementText: requiredSkills.map((skill) => skill.name).join(" + "),
      lockText,
      statusText,
      state: active ? "active" : missingSkillNames.length <= 1 && !nodeLocked ? "ready-soon" : "missing"
    };
  });
}

export function getSynergyGuidesForSkill(skillId, selectedSkillIds = [], unlockedNodeIds = []) {
  return getSynergyGuides(selectedSkillIds, unlockedNodeIds).filter((synergy) =>
    synergy.requiredSkills.includes(skillId)
  );
}

export function getSkillTags(selectedSkillIds = []) {
  const tags = new Set();
  for (const skillId of selectedSkillIds) {
    const skill = getSkillById(skillId);
    if (!skill) continue;
    for (const tag of skill.tags) tags.add(tag);
  }
  return [...tags];
}

export function buildLevelUpChoices({ selectedSkillIds, skillLevels, unlockedNodeIds, runLevel = 1, count = 3 }) {
  const selected = new Set(selectedSkillIds);
  const unlockedSkills = getUnlockedSkills(unlockedNodeIds);
  const candidates = unlockedSkills.filter((skill) => {
    const currentLevel = skillLevels[skill.id] ?? 0;
    if (skill.rarity === "legendary" && currentLevel === 0 && runLevel < 5) return false;
    return currentLevel < skill.maxLevel;
  });

  const weighted = candidates.map((skill) => {
    const isKnown = selected.has(skill.id);
    const rarityWeight = RARITY_WEIGHTS[skill.rarity ?? "common"] ?? 1;
    const weight = isKnown ? Math.max(3, rarityWeight * 0.25) : rarityWeight;
    return { skill, weight };
  });

  const choices = [];
  const newWeapons = candidates.filter((skill) => skill.kind === "weapon" && !selected.has(skill.id));
  if (newWeapons.length > 0 && choices.length < count) {
    const weaponIndex = Math.floor(Math.random() * newWeapons.length);
    const weaponChoice = newWeapons[Math.min(weaponIndex, newWeapons.length - 1)];
    choices.push(weaponChoice);
    const weightedIndex = weighted.findIndex((entry) => entry.skill.id === weaponChoice.id);
    if (weightedIndex >= 0) weighted.splice(weightedIndex, 1);
  }

  while (choices.length < count && weighted.length > 0) {
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;
    const index = weighted.findIndex((entry) => {
      roll -= entry.weight;
      return roll <= 0;
    });
    const pickedIndex = index >= 0 ? index : weighted.length - 1;
    choices.push(weighted[pickedIndex].skill);
    weighted.splice(pickedIndex, 1);
  }

  return choices;
}

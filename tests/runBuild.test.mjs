import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLevelUpChoices,
  getActiveSynergies,
  getChoicePresentation,
  getSynergyGuides,
  getSynergyGuidesForSkill,
  getUnlockedSkills
} from "../src/runBuild.js";

test("activates a synergy when all required skills are selected", () => {
  const synergies = getActiveSynergies(["spark-shot", "chain-link", "voltage-core"], []);

  assert.equal(synergies.some((synergy) => synergy.id === "chain-lightning"), true);
});

test("does not activate a locked synergy without its meta unlock", () => {
  const synergies = getActiveSynergies(["flame-flask", "cooling-kit", "heat-core"], []);

  assert.equal(synergies.some((synergy) => synergy.id === "vortex-flame"), false);
});

test("activates a locked synergy when the required meta node is unlocked", () => {
  const synergies = getActiveSynergies(
    ["flame-flask", "cooling-kit", "heat-core"],
    ["unlock-fire-core"]
  );

  assert.equal(synergies.some((synergy) => synergy.id === "vortex-flame"), true);
});

test("run skill pool removes pickup-only magnet glove and exposes weapons before meta unlocks", () => {
  const unlockedSkills = getUnlockedSkills([]);
  const unlockedIds = unlockedSkills.map((skill) => skill.id);

  assert.equal(unlockedIds.includes("magnet-glove"), false);
  for (const weaponId of ["flame-flask", "ice-shard", "micro-drone", "pocket-turret"]) {
    assert.equal(unlockedIds.includes(weaponId), true, `${weaponId} should appear as an in-run weapon`);
  }
});

test("level choices reserve a slot for a new weapon when one is available", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.99;
  try {
    const choices = buildLevelUpChoices({
      selectedSkillIds: ["spark-shot"],
      skillLevels: { "spark-shot": 1 },
      unlockedNodeIds: [],
      count: 3
    });

    assert.equal(choices.some((skill) => skill.kind === "weapon" && skill.id !== "spark-shot"), true);
  } finally {
    Math.random = originalRandom;
  }
});

test("owned weapons are presented as upgrades instead of fresh weapon pickups", () => {
  const fresh = getChoicePresentation("spark-shot", {});
  const owned = getChoicePresentation("spark-shot", { "spark-shot": 2 });
  const passive = getChoicePresentation("vital-gel", { "vital-gel": 1 });

  assert.equal(fresh.kindLabel, "무기 획득");
  assert.equal(fresh.title, "스파크 탄");
  assert.equal(owned.kindLabel, "무기 강화");
  assert.equal(owned.title, "스파크 탄 강화");
  assert.equal(owned.levelLabel, "Lv 3/5");
  assert.equal(passive.kindLabel, "성장 강화");
});

test("skill rarities span every build category and gate legendary choices", () => {
  const common = getChoicePresentation("spark-shot", {});
  const rare = getChoicePresentation("curse-sigil", {});
  const epic = getChoicePresentation("plague-bloom", {});
  const legendary = getChoicePresentation("void-orb", {});

  assert.equal(common.rarityLabel, "Common");
  assert.equal(rare.rarityLabel, "Rare");
  assert.equal(epic.rarityLabel, "Epic");
  assert.equal(legendary.rarityLabel, "Legendary");
  assert.equal(legendary.rarityClass, "rarity-legendary");

  const earlyChoices = buildLevelUpChoices({
    selectedSkillIds: ["spark-shot"],
    skillLevels: { "spark-shot": 1 },
    unlockedNodeIds: [],
    runLevel: 3,
    count: 12
  });
  assert.equal(earlyChoices.some((skill) => skill.rarity === "legendary"), false);

  const originalRandom = Math.random;
  Math.random = () => 0.999;
  try {
    const lateChoices = buildLevelUpChoices({
      selectedSkillIds: ["spark-shot"],
      skillLevels: { "spark-shot": 1 },
      unlockedNodeIds: [],
      runLevel: 8,
      count: 12
    });
    assert.equal(lateChoices.some((skill) => skill.rarity === "legendary"), true);
  } finally {
    Math.random = originalRandom;
  }
});

test("synergy guides explain required skills and current progress", () => {
  const guides = getSynergyGuidesForSkill("spark-shot", ["spark-shot", "chain-link"], []);
  const chainLightning = guides.find((guide) => guide.id === "chain-lightning");
  const stormDrone = guides.find((guide) => guide.id === "storm-drone");

  assert.equal(chainLightning.requirementText, "스파크 탄 + 연쇄 회로 + 전압 코어");
  assert.deepEqual(chainLightning.missingSkillNames, ["전압 코어"]);
  assert.equal(chainLightning.state, "ready-soon");
  assert.match(chainLightning.statusText, /전압 코어/);
  assert.equal(stormDrone.lockText, "드론 연구소 필요");

  const rows = getSynergyGuides(["spark-shot", "chain-link", "voltage-core"], []);
  const active = rows.find((guide) => guide.id === "chain-lightning");

  assert.equal(active.active, true);
  assert.equal(active.statusText, "발동됨");
});

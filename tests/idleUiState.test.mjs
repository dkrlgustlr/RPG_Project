import test from "node:test";
import assert from "node:assert/strict";
import {
  applyIdleUpgrade,
  calculateOfflineReward,
  createIdleUiState,
  formatCompactNumber,
  getIdleUpgradeRows,
  getStageProgress
} from "../src/idleUiState.js";

test("default idle UI state matches the first star meadow stage", () => {
  const state = createIdleUiState(1_700_000_000_000);

  assert.equal(state.regionName, "별빛 초원");
  assert.equal(state.stage, 1);
  assert.equal(state.stageTitle, "별빛 초원 1-1");
  assert.equal(state.starDust, 2450);
  assert.equal(state.starCrystal, 120);
  assert.equal(state.lastSavedAt, 1_700_000_000_000);
});

test("stage progress presents one region with a boss on stage ten", () => {
  assert.deepEqual(getStageProgress({ stage: 1 }), {
    current: 1,
    total: 10,
    label: "1/10",
    bossCountdown: 9,
    isBoss: false
  });

  assert.deepEqual(getStageProgress({ stage: 10 }), {
    current: 10,
    total: 10,
    label: "10/10",
    bossCountdown: 0,
    isBoss: true
  });
});

test("upgrade rows expose attack, hp, and defense with Korean labels", () => {
  const rows = getIdleUpgradeRows(createIdleUiState());

  assert.deepEqual(rows.map((row) => row.id), ["attack", "hp", "defense"]);
  assert.deepEqual(rows.map((row) => row.name), ["공격력", "체력", "방어력"]);
  assert.equal(rows[0].levelLabel, "Lv. 12");
  assert.equal(rows[0].cost, 2450);
});

test("applying an affordable upgrade spends star dust and increases only that stat", () => {
  const state = createIdleUiState();
  const next = applyIdleUpgrade(state, "attack");

  assert.equal(next.starDust, 0);
  assert.equal(next.upgrades.attack.level, 13);
  assert.equal(next.upgrades.hp.level, 11);
  assert.equal(next.notice, "공격력 강화 완료");
});

test("unaffordable upgrades leave levels untouched and return a readable notice", () => {
  const state = { ...createIdleUiState(), starDust: 10 };
  const next = applyIdleUpgrade(state, "hp");

  assert.equal(next.starDust, 10);
  assert.equal(next.upgrades.hp.level, 11);
  assert.equal(next.notice, "별가루가 부족해요");
});

test("offline reward scales with highest stage and caps elapsed time", () => {
  const state = { ...createIdleUiState(1_000), highestStage: 8 };
  const reward = calculateOfflineReward(state, 3_601_000);

  assert.equal(reward.elapsedSeconds, 3600);
  assert.equal(reward.starDust, 1440);
});

test("compact number formatting keeps large UI values readable", () => {
  assert.equal(formatCompactNumber(987), "987");
  assert.equal(formatCompactNumber(5872), "5,872");
  assert.equal(formatCompactNumber(1532000), "1.5M");
});

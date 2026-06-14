import test from "node:test";
import assert from "node:assert/strict";
import { calculateRunReward, canPurchaseNode, createDefaultProgress, purchaseNode } from "../src/progression.js";
import { getMetaEffects } from "../src/progression.js";
import { META_TREE } from "../src/gameData.js";

test("calculates core shard rewards from run performance", () => {
  const reward = calculateRunReward(
    { secondsSurvived: 180, kills: 120, levels: 6, bossDefeated: false },
    []
  );

  assert.equal(reward.coreShards, 78);
});

test("applies reward bonus from permanent progression", () => {
  const reward = calculateRunReward(
    { secondsSurvived: 180, kills: 120, levels: 6, bossDefeated: false },
    ["core-harvester-1"]
  );

  assert.equal(reward.coreShards, 86);
});

test("prevents buying a node without enough shards", () => {
  const state = { coreShards: 10, unlockedNodes: ["root-core"] };

  assert.equal(canPurchaseNode("damage-1", state), false);
});

test("purchases a node when prerequisites and cost are satisfied", () => {
  const state = { coreShards: 40, unlockedNodes: ["root-core"] };
  const nextState = purchaseNode("damage-1", state);

  assert.deepEqual(nextState, {
    coreShards: 15,
    unlockedNodes: ["root-core", "damage-1"]
  });
});

test("purchasing a node preserves character selection progress", () => {
  const state = {
    coreShards: 40,
    unlockedNodes: ["root-core"],
    unlockedCharacterIds: ["core-minion"],
    selectedCharacterId: "core-minion",
    bestSeconds: 12,
    bestKills: 3
  };
  const nextState = purchaseNode("damage-1", state);

  assert.equal(nextState.selectedCharacterId, "core-minion");
  assert.deepEqual(nextState.unlockedCharacterIds, ["core-minion"]);
  assert.equal(nextState.bestSeconds, 12);
  assert.equal(nextState.bestKills, 3);
});


test("combines expanded permanent skill tree effects", () => {
  const effects = getMetaEffects([
    "root-core",
    "damage-1",
    "damage-2",
    "hp-1",
    "hp-2",
    "pickup-1",
    "pickup-2",
    "pierce-training-1"
  ]);

  assert.equal(effects.damageMultiplier, 0.2);
  assert.equal(effects.maxHealth, 42);
  assert.equal(effects.pickupRange, 55);
  assert.equal(effects.startingPierce, 1);
});

test("expanded permanent node respects prerequisites", () => {
  assert.equal(
    canPurchaseNode("damage-2", { coreShards: 80, unlockedNodes: ["root-core"] }),
    false
  );
  assert.equal(
    canPurchaseNode("damage-2", { coreShards: 80, unlockedNodes: ["root-core", "damage-1"] }),
    true
  );
});

test("permanent skill nodes include board positions for branching tree rendering", () => {
  const nodeIds = new Set(META_TREE.map((node) => node.id));
  const nodesById = new Map(META_TREE.map((node) => [node.id, node]));

  for (const node of META_TREE) {
    assert.equal(typeof node.position?.x, "number", `${node.id} needs x position`);
    assert.equal(typeof node.position?.y, "number", `${node.id} needs y position`);
    assert.equal(node.position.x >= 220 && node.position.x <= 2180, true, `${node.id} x is out of board range`);
    assert.equal(node.position.y >= 160 && node.position.y <= 1360, true, `${node.id} y is out of board range`);
    for (const prerequisite of node.prerequisites) {
      assert.equal(nodeIds.has(prerequisite), true, `${node.id} has an unknown prerequisite`);
      const parent = nodesById.get(prerequisite);
      assert.equal(
        parent.position.x === node.position.x || parent.position.y === node.position.y,
        true,
        `${node.id} should connect orthogonally from ${prerequisite}`
      );
    }
  }
});

test("permanent skill node positions leave room for readable cards", () => {
  for (let index = 0; index < META_TREE.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < META_TREE.length; nextIndex += 1) {
      const node = META_TREE[index];
      const otherNode = META_TREE[nextIndex];
      const dx = Math.abs(node.position.x - otherNode.position.x);
      const dy = Math.abs(node.position.y - otherNode.position.y);

      assert.equal(
        dx >= 280 || dy >= 190,
        true,
        `${node.id} is too close to ${otherNode.id}`
      );
    }
  }
});

test("default progress starts with one selected character and room for future unlocks", () => {
  const progress = createDefaultProgress();

  assert.equal(progress.selectedCharacterId, "core-minion");
  assert.deepEqual(progress.unlockedCharacterIds, ["core-minion"]);
});

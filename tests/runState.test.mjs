import test from "node:test";
import assert from "node:assert/strict";
import {
  applyContactDamage,
  applySkillUpgrade,
  CONTACT_INVULN_SECONDS,
  getProjectilePierce,
  registerProjectileHit,
  applyExperience,
  formatDamageNumber,
  getWeaponStats
} from "../src/runState.js";

function makeRun() {
  return {
    player: {
      hp: 100,
      maxHp: 100,
      shield: 0
    },
    pickupRange: 30,
    selectedSkillIds: [],
    skillLevels: {}
  };
}

test("vital gel immediately increases current and max health", () => {
  const run = makeRun();

  applySkillUpgrade(run, "vital-gel");

  assert.equal(run.skillLevels["vital-gel"], 1);
  assert.equal(run.player.maxHp, 114);
  assert.equal(run.player.hp, 114);
});

test("repeated enemy contact can kill the player", () => {
  const player = { hp: 100, shield: 0 };

  for (let i = 0; i < 9; i += 1) {
    applyContactDamage(player, 12);
  }

  assert.equal(player.hp <= 0, true);
  assert.equal(CONTACT_INVULN_SECONDS < 0.5, true);
});

test("piercer levels add projectile pierce to normal shots", () => {
  assert.equal(getProjectilePierce({ piercer: 0 }), 0);
  assert.equal(getProjectilePierce({ piercer: 2 }), 2);
  assert.equal(getProjectilePierce({ piercer: 2 }, 1), 3);
});

test("piercing projectile hits different enemies and ignores duplicate enemy contact", () => {
  const projectile = { pierce: 2, hitEnemyIds: [] };

  assert.deepEqual(registerProjectileHit(projectile, "enemy-a"), { accepted: true, shouldDestroy: false });
  assert.deepEqual(registerProjectileHit(projectile, "enemy-a"), { accepted: false, shouldDestroy: false });
  assert.deepEqual(registerProjectileHit(projectile, "enemy-b"), { accepted: true, shouldDestroy: false });
  assert.deepEqual(registerProjectileHit(projectile, "enemy-c"), { accepted: true, shouldDestroy: true });
});

test("experience is applied immediately and can trigger multiple level ups", () => {
  const run = { xp: 8, level: 1 };
  const result = applyExperience(run, 40, (level) => 10 + level * 8);

  assert.equal(run.level, 3);
  assert.equal(run.xp, 4);
  assert.equal(result.levelsGained, 2);
});

test("damage numbers are rounded and never show zero for positive damage", () => {
  assert.equal(formatDamageNumber(12.4), "12");
  assert.equal(formatDamageNumber(0.2), "1");
  assert.equal(formatDamageNumber(0), "0");
});

test("weapon levels create visible power spikes instead of tiny damage bumps", () => {
  const levelOne = getWeaponStats({
    "spark-shot": 1,
    "ice-shard": 1,
    "micro-drone": 1,
    "pocket-turret": 1,
    "flame-flask": 1
  });
  const levelFive = getWeaponStats({
    "spark-shot": 5,
    "ice-shard": 5,
    "micro-drone": 5,
    "pocket-turret": 5,
    "flame-flask": 5,
    "cooling-kit": 4
  }, ["turret-grid", "crystal-storm"]);

  assert.equal(levelOne.ice.radius >= 8, true);
  assert.equal(levelOne.drone.radius >= 8, true);
  assert.equal(levelOne.drone.range, Infinity);
  assert.equal(levelOne.turret.range >= 220, true);
  assert.equal(levelOne.turret.maxTurrets, 1);

  assert.equal(levelFive.spark.damage > levelOne.spark.damage, true);
  assert.equal(levelFive.ice.shots > levelOne.ice.shots, true);
  assert.equal(levelFive.ice.damage > levelOne.ice.damage, true);
  assert.equal(levelFive.drone.count > levelOne.drone.count, true);
  assert.equal(levelFive.drone.range, Infinity);
  assert.equal(levelFive.turret.maxTurrets, 3);
  assert.equal(levelFive.turret.damage > levelOne.turret.damage, true);
  assert.equal(levelFive.turret.fireDelay < levelOne.turret.fireDelay, true);
  assert.equal(levelFive.flame.radius > levelOne.flame.radius, true);
});

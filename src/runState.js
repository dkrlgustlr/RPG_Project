export const CONTACT_INVULN_SECONDS = 0.32;

export function applySkillUpgrade(run, skillId) {
  const current = run.skillLevels[skillId] ?? 0;
  run.skillLevels[skillId] = current + 1;

  if (!run.selectedSkillIds.includes(skillId)) {
    run.selectedSkillIds.push(skillId);
  }

  if (skillId === "vital-gel") {
    run.player.maxHp += 14;
    run.player.hp = Math.min(run.player.maxHp, run.player.hp + 14);
  }

  if (skillId === "shield-belt") {
    run.player.shield = Math.min(32, run.player.shield + 10);
  }

  return run;
}

export function applyContactDamage(player, damage) {
  let incoming = damage;
  let shieldBlocked = 0;

  if (player.shield > 0) {
    shieldBlocked = Math.min(incoming, player.shield);
    player.shield -= shieldBlocked;
    incoming -= shieldBlocked;
  }

  player.hp -= incoming;
  return {
    hpDamage: incoming,
    shieldBlocked
  };
}

export function getProjectilePierce(skillLevels = {}, bonusPierce = 0, startingPierce = 0) {
  return (skillLevels.piercer ?? 0) + bonusPierce + startingPierce;
}

export function getWeaponStats(skillLevels = {}, activeSynergyIds = []) {
  const level = (skillId) => skillLevels[skillId] ?? 0;
  const hasSynergy = (synergyId) => activeSynergyIds.includes(synergyId);
  const coolingFactor = 1 - Math.min(0.35, level("cooling-kit") * 0.07);
  const sparkLevel = level("spark-shot");
  const flameLevel = level("flame-flask");
  const iceLevel = level("ice-shard");
  const droneLevel = level("micro-drone");
  const turretLevel = level("pocket-turret");
  const poisonLevel = level("toxic-vial");
  const plagueLevel = level("plague-bloom");
  const curseLevel = level("curse-sigil");
  const voidLevel = level("void-orb");
  const blackLotusBonus = level("black-lotus") > 0 ? 1.35 : 1;

  return {
    spark: {
      damage: 12 + sparkLevel * 6 + level("voltage-core") * 4,
      cooldown: Math.max(0.14, (0.5 - sparkLevel * 0.045) * coolingFactor),
      speed: 285 + sparkLevel * 12,
      radius: 7 + Math.min(3, Math.floor(sparkLevel / 2))
    },
    flame: {
      radius: 22 + flameLevel * 4,
      damage: 10 + flameLevel * 3 + level("heat-core") * 5,
      life: 2.7 + flameLevel * 0.16 + level("heat-core") * 0.48,
      cooldown: Math.max(0.75, (1.65 - flameLevel * 0.11) * coolingFactor)
    },
    ice: {
      shots: hasSynergy("crystal-storm") ? 6 + Math.floor(iceLevel / 2) : 1 + Math.ceil(iceLevel / 2),
      damage: 10 + iceLevel * 5,
      cooldown: Math.max(0.42, (0.88 - iceLevel * 0.055) * coolingFactor),
      speed: 220 + iceLevel * 18,
      radius: 7 + iceLevel * 1.1
    },
    drone: {
      count: Math.min(4, 1 + Math.floor(Math.max(0, droneLevel - 1) / 2)),
      damage: 9 + droneLevel * 5,
      cooldown: Math.max(0.28, (0.64 - droneLevel * 0.045) * coolingFactor),
      speed: 270 + droneLevel * 16,
      radius: 7.2 + droneLevel * 0.9,
      range: Infinity,
      orbitRadius: 26 + droneLevel * 2
    },
    turret: {
      maxTurrets: Math.min(3, 1 + Math.floor(Math.max(0, turretLevel - 1) / 2)),
      life: 8.5 + turretLevel * 2.2,
      spawnCooldown: Math.max(2.4, (5.2 - turretLevel * 0.36) * coolingFactor),
      fireDelay: Math.max(0.22, (hasSynergy("turret-grid") ? 0.36 : 0.56) - turretLevel * 0.055),
      range: 220 + turretLevel * 28 + (hasSynergy("turret-grid") ? 80 : 0),
      damage: 12 + turretLevel * 5,
      speed: 275 + turretLevel * 14,
      radius: 6 + turretLevel * 0.8
    },
    poison: {
      damage: 8 + poisonLevel * 4,
      tickDamage: (2.2 + poisonLevel * 1.15) * blackLotusBonus,
      duration: 2.6 + poisonLevel * 0.28 + level("venom-culture") * 0.35,
      cooldown: Math.max(0.48, (1.05 - poisonLevel * 0.07) * coolingFactor),
      speed: 245 + poisonLevel * 16,
      radius: 8 + poisonLevel * 0.9
    },
    plague: {
      radius: 26 + plagueLevel * 6 + level("black-lotus") * 14,
      damage: (4.2 + plagueLevel * 1.8) * blackLotusBonus,
      poisonDamage: (2.8 + plagueLevel * 1.15) * blackLotusBonus,
      life: 2.8 + plagueLevel * 0.42,
      cooldown: Math.max(1.2, (3.8 - plagueLevel * 0.24) * coolingFactor)
    },
    curse: {
      damage: 10 + curseLevel * 5 + level("doom-mark") * 2,
      duration: 3.4 + curseLevel * 0.38,
      vulnerability: 0.12 + curseLevel * 0.025,
      cooldown: Math.max(0.52, (1.15 - curseLevel * 0.075) * coolingFactor),
      speed: 255 + curseLevel * 14,
      radius: 8 + curseLevel * 0.8
    },
    void: {
      damage: 42 + voidLevel * 14,
      cooldown: Math.max(2.7, 5.6 * coolingFactor),
      speed: 205,
      radius: 16,
      pierce: 4
    }
  };
}

export function registerProjectileHit(projectile, enemyId) {
  projectile.hitEnemyIds ??= [];
  if (projectile.hitEnemyIds.includes(enemyId)) {
    return { accepted: false, shouldDestroy: false };
  }

  projectile.hitEnemyIds.push(enemyId);
  if (projectile.pierce > 0) {
    projectile.pierce -= 1;
    return { accepted: true, shouldDestroy: false };
  }

  return { accepted: true, shouldDestroy: true };
}

export function applyExperience(run, amount, getLevelThreshold) {
  run.xp += amount;
  let levelsGained = 0;

  while (run.xp >= getLevelThreshold(run.level)) {
    run.xp -= getLevelThreshold(run.level);
    run.level += 1;
    levelsGained += 1;
  }

  return { levelsGained };
}

export function formatDamageNumber(amount) {
  if (amount <= 0) return "0";
  return String(Math.max(1, Math.round(amount)));
}

# Paul Idle RPG Design

## Overview

Paul Idle RPG is a vertical mobile idle RPG prototype built around Paul, a clumsy but powerful star-headed wizard. The first version focuses on a playable combat and growth loop inside the Codex project workspace.

The game should feel like a bright, friendly casual idle RPG: high-quality 2D pixel-illustration characters, side-view automatic combat, warm orange/gold UI, and simple upgrade decisions.

## Core Direction

- Platform target: mobile portrait.
- First build target: local Codex project prototype.
- Core genre: idle RPG.
- Main appeal: explosive stat growth and collection/operation expansion over time.
- MVP focus: battle, stat upgrades, stage progression, local save, offline star dust reward.
- Later expansion: equipment, workshop, shop, pets, relics, more regions.

## Main Character

- Name: Paul.
- Role: player character and main growth target.
- Personality: clumsy, a bit silly, but secretly very strong.
- Visual identity:
  - Golden star head.
  - Worn navy wizard cloak.
  - Teal scarf.
  - Belt pouches and boots.
  - High-quality 2D pixel-illustration sprite, not low-resolution 8-bit pixel art.
- Battle pose:
  - Paul stands on the left side of the battlefield.
  - Paul faces right in side profile.
  - Paul casts star magic toward the monster.

## Visual Style

- Character and monster quality:
  - Match the provided Paul reference quality.
  - Detailed pixel-illustration style with crisp outlines, warm highlights, fabric/material detail, and readable silhouettes.
  - Sprites should be side-view in combat.
- UI style:
  - Familiar casual mobile idle RPG UI.
  - Bright, friendly, readable.
  - Warm ivory/cream cards.
  - Orange/gold buttons and active states.
  - Subtle pixel accents are fine, but the UI should not feel experimental.
- Background:
  - Bright non-medieval cosmic meadow.
  - Sunny or golden morning tone.
  - Soft blue sky, clouds, glowing grass, and small floating star particles.
- Avoid:
  - Medieval-heavy tone.
  - Castles, taverns, knights, swords, shields, banners.
  - Wood-heavy UI, parchment-heavy UI, dark hardcore RPG UI.
  - AI-looking clutter, meaningless icons, unreadable text, excessive glow.

## Currencies

### Star Dust

- Korean display name: 별가루.
- Role: normal currency, like gold.
- Sources:
  - Monster kills.
  - Offline reward.
  - Later workshop production.
- Uses in MVP:
  - Attack upgrade.
  - HP upgrade.
  - Defense upgrade.

### Star Crystal

- Korean display name: 별수정.
- Role: premium/rare currency, like diamonds.
- Sources in MVP:
  - Boss clear reward.
  - Later achievements, attendance, events.
- Uses in MVP:
  - Display and accumulation only.
- Later uses:
  - Shop.
  - Summons.
  - Special upgrades.

## Combat Loop

The MVP uses one-monster-at-a-time automatic side-view combat.

1. One monster appears on the right.
2. Paul appears on the left.
3. Paul attacks automatically.
4. The monster attacks automatically.
5. If the monster dies, the player receives star dust and moves to the next stage.
6. Paul HP is restored after a monster is defeated.
7. Stage 1-10 is a boss.
8. If Paul dies during the boss fight, the boss attempt fails.
9. On boss failure, the game returns to the previous normal farming stage.

## Stage Structure

First implementation scope:

- Implement Region 1 only.
- Region name: 별빛 초원.
- Stages:
  - 1-1 through 1-9: normal monsters.
  - 1-10: boss monster.
- Later regions will reuse this structure:
  - 10 stages per region.
  - 9 normal stages and 1 boss stage.

## Monsters

- The user has approximately 3 monster assets prepared.
- MVP usage:
  - Rotate the 3 normal monsters across stages 1-1 through 1-9.
  - Use a stronger boss variant at stage 1-10.
- Monster presentation:
  - Monster stands on the right side.
  - Monster faces left in side profile.
  - Monster quality should match Paul's high-quality pixel-illustration style.

## Player Stats

MVP stats:

- Attack: increases all Paul damage.
- HP: increases Paul maximum health.
- Defense: reduces incoming monster damage.

Excluded from MVP:

- Recovery stat.
- Complex crit, evasion, elemental systems.

## Upgrades

MVP upgrade method:

- Three direct stat upgrade buttons:
  - 공격력
  - 체력
  - 방어력
- All upgrades cost 별가루.
- Equipment is not part of the first active loop.
- Equipment can appear as a locked tab or later unlock.

## Skills

Paul uses one basic attack, two skills, and one ultimate. All skills are automatic in MVP.

### Basic Attack

- Display name: 평타 or 별탄.
- Behavior:
  - Fires a small star projectile.
  - Short cooldown, approximately 1 second.
  - Damage scales with Attack.

### Skill 1

- Concept name: 별가루 폭발.
- Behavior:
  - Short cooldown damage skill.
  - Hits the current monster for a larger burst.
  - Damage scales with Attack.

### Skill 2

- Concept name: 삐끗한 방어마법.
- Behavior:
  - Defensive skill matching Paul's clumsy personality.
  - Temporarily increases defense or reduces incoming damage.
  - Automatic cooldown.

### Ultimate

- Concept name: 별이 떨어지는 날.
- Behavior:
  - Large burst damage skill.
  - Automatic cooldown.
  - MVP trigger: cooldown-based, not manual gauge.

## Boss Rules

- Boss appears at 1-10.
- Boss attacks Paul.
- Boss failure condition:
  - Paul HP reaches zero.
- No recovery stat in MVP.
- Boss start should restore Paul HP to full.
- If Paul fails the boss:
  - Return to previous farming stage.
  - Continue collecting star dust.
  - Player upgrades stats and attempts again.

## Offline Reward

MVP offline reward:

- Based on highest reached stage.
- Rewards 별가루 only.
- Uses local save timestamp.
- When the player returns, calculate elapsed time and grant star dust.
- Star crystal is not part of offline rewards in MVP.

## UI Structure

The UI should use a familiar casual idle RPG layout.

### Top HUD

- Display:
  - 별가루
  - 별수정
  - Stage label: 별빛 초원 1-1
  - Stage progress, such as 1/10
- Visual style:
  - Warm ivory or cream rounded chips.
  - Orange/gold borders or headers.

### Battle Area

- Occupies the upper main part of the portrait screen.
- Paul on left, monster on right.
- Both use side-view sprites.
- Show:
  - Monster HP bar above monster.
  - Paul HP bar near Paul.
  - Damage numbers.
  - Star projectile effects.

### Skill Row

- Four large readable buttons:
  - 평타
  - 스킬1
  - 스킬2
  - 궁극기
- Show cooldown state.
- Use orange/gold frames and readable icon areas.

### Upgrade Panel

- Three horizontal rows:
  - 공격력
  - 체력
  - 방어력
- Each row includes:
  - Current level.
  - Star dust cost.
  - Large orange 강화 button.

### Bottom Navigation

Five tabs:

- 전투
- 강화
- 장비
- 공방
- 상점

MVP behavior:

- 전투 and 강화 are active.
- 장비, 공방, 상점 can be locked or display a simple preparation state.

## Save System

MVP save is local-only.

Save:

- Current stage.
- Highest reached stage.
- Star dust.
- Star crystal.
- Attack upgrade level.
- HP upgrade level.
- Defense upgrade level.
- Last saved timestamp.

Use browser/local project storage in the first prototype. Server sync is out of scope.

## MVP Success Criteria

The MVP is successful when:

- The game opens in a mobile portrait layout.
- Paul and a monster fight automatically.
- Monster kills grant 별가루.
- Player can upgrade 공격력, 체력, 방어력.
- Paul can clear normal stages and reach a boss.
- Paul can fail a boss by dying.
- On failure, the game returns to farming.
- Progress saves locally.
- Returning after time away grants offline 별가루.
- The UI follows the bright orange/gold casual idle RPG direction.

## Out Of Scope For First Build

- Multiple regions beyond Region 1.
- Real-money shop.
- Network/server save.
- Full equipment system.
- Full workshop system.
- Pet/relic collection.
- Complex skill trees.
- Manual ultimate timing.
- PVP, guild, rankings.

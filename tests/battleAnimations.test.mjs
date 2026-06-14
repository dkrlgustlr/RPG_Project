import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";

import {
  BATTLE_ANIMATION_DEFINITIONS,
  createBattleAnimationStyleText,
  resolveBattleAnimationAssetUrl
} from "../src/animationCatalog.js";

test("battle animation catalog defines Paul skill layers as data", () => {
  const paulSkills = BATTLE_ANIMATION_DEFINITIONS.filter((definition) =>
    definition.targetSelector === ".combatant.paul"
  );
  const ids = paulSkills.map((definition) => definition.id);

  assert.deepEqual(ids, ["paul-skill1", "paul-skill2"]);
  assert.equal(paulSkills[0].className, "paul-skill1-sprite");
  assert.equal(paulSkills[0].frameSize, 313);
  assert.equal(paulSkills[0].frames, 16);
  assert.equal(paulSkills[0].sheetShift, -5008);
  assert.match(paulSkills[0].startTransform, /scale\(0\.49\)/);
  assert.match(paulSkills[0].windowTrack.keyframes[2].transform, /scale\(0\.52\)/);
  assert.equal(paulSkills[0].timeline.showStart, 0);
  assert.equal(paulSkills[0].timeline.hideEnd, 30);
  assert.equal(paulSkills[0].hidesBase, true);
  assert.equal(paulSkills[1].className, "paul-skill2-sprite");
  assert.equal(paulSkills[1].frameSize, 313);
  assert.equal(paulSkills[1].frames, 16);
  assert.equal(paulSkills[1].sheetShift, -5008);
  assert.match(paulSkills[1].assetPath, /paul_skill2_starlight_guard_sheet_horizontal\.png$/);
  assert.equal(paulSkills[1].bottom, "-58px");
  assert.match(paulSkills[1].startTransform, /scale\(0\.6\)/);
  assert.match(paulSkills[1].windowTrack.keyframes[2].transform, /scale\(0\.63\)/);
  assert.equal(paulSkills[1].timeline.showStart, 42);
  assert.equal(paulSkills[1].timeline.hideEnd, 67);
});

test("battle animation style generator emits layer CSS from the catalog", () => {
  const baseUri = new URL("../index.html", import.meta.url).href;
  const skill1Url = new URL("../assets/폴_스킬1_별가루폭발_16/paul_skill1_stardust_burst_safe313_sheet_horizontal.png", import.meta.url).href;
  const skill2Url = "paul_skill2_starlight_guard_sheet_horizontal.png";
  const styles = createBattleAnimationStyleText(BATTLE_ANIMATION_DEFINITIONS, baseUri);

  assert.match(styles, /#battle-animation-runtime-styles/);
  assert.match(styles, /\.battle-animation-layer/);
  assert.doesNotMatch(styles, /url\("\.\.\/assets\//);
  assert.doesNotMatch(styles, /url\("assets\//);
  assert.match(styles, /\.paul-skill1-sprite/);
  assert.match(styles, new RegExp(`url\\("${escapeRegExp(skill1Url)}"\\)`));
  assert.match(styles, /animation:\s*paul-skill1-frames var\(--paul-skill1-cycle-duration\) steps\(1,\s*end\) infinite,\s*paul-skill1-window var\(--paul-skill1-cycle-duration\) linear infinite/);
  assert.match(styles, /16%\s*{\s*background-position:\s*-2504px 0;\s*}/s);
  assert.match(styles, /\.paul-skill2-sprite/);
  assert.match(styles, new RegExp(`url\\("[^"]*${escapeRegExp(skill2Url)}"\\)`));
  assert.doesNotMatch(styles, /paul_skill2_starlight_guard_safe400_sheet_horizontal\.png/);
  assert.match(styles, /54\.8%\s*{\s*background-position:\s*-2504px 0;\s*}/s);
  assert.match(styles, /@keyframes paul-base-visibility/);
  assert.match(styles, /0%,\s*30%\s*{\s*opacity:\s*0;\s*}/s);
  assert.match(styles, /42%,\s*67%\s*{\s*opacity:\s*0;\s*}/s);
});

test("Paul skill 1 safe sheet exists for the animation manager", async () => {
  await access(new URL("../assets/폴_스킬1_별가루폭발_16/paul_skill1_stardust_burst_safe313_sheet_horizontal.png", import.meta.url));
});

test("battle animation asset URLs resolve from index.html for file protocol pages", () => {
  const baseUri = new URL("../index.html", import.meta.url).href;
  const resolved = resolveBattleAnimationAssetUrl(
    "assets/폴_스킬1_별가루폭발_16/paul_skill1_stardust_burst_safe313_sheet_horizontal.png",
    baseUri
  );

  assert.equal(
    resolved,
    new URL("../assets/폴_스킬1_별가루폭발_16/paul_skill1_stardust_burst_safe313_sheet_horizontal.png", import.meta.url).href
  );
  assert.match(resolved, /^file:\/\//);
  assert.match(resolved, /%ED%8F%B4_%EC%8A%A4%ED%82%AC1/);
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

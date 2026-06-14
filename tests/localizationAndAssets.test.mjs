import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("main html exposes the idle RPG mobile UI landmarks", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /lang="ko"/);
  assert.match(html, /id="idleRpgApp"/);
  assert.match(html, /class="resource-chip/);
  assert.match(html, /id="starDustValue"/);
  assert.match(html, /id="starCrystalValue"/);
  assert.match(html, /id="stageTitle"/);
  assert.match(html, /id="battlefield"/);
  assert.match(html, /id="skillBar"/);
  assert.match(html, /id="upgradeList"/);
  assert.match(html, /id="bottomNav"/);
  assert.match(html, /전투/);
  assert.match(html, /강화/);
});

test("idle RPG stylesheet builds a portrait phone-style game screen", async () => {
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

  assert.match(styles, /\.phone-shell\s*{[^}]*max-width:\s*460px/s);
  assert.match(styles, /\.game-screen\s*{[^}]*aspect-ratio:\s*9\s*\/\s*19\.5/s);
  assert.match(styles, /starlight_meadow_morning_iphone_1170x2532\.png/);
  assert.match(styles, /\.resource-chip\s*{/);
  assert.match(styles, /\.stage-card\s*{/);
  assert.match(styles, /\.battlefield\s*{/);
  assert.match(styles, /paul_basic_attack_frame_01\.png/);
  assert.match(styles, /paul_basic_attack_frame_16\.png/);
  assert.match(styles, /--paul-basic-attack-duration:\s*880ms/);
  assert.match(styles, /--paul-projectile-duration:\s*880ms/);
  assert.match(styles, /animation:\s*paul-basic-attack var\(--paul-basic-attack-duration\) steps\(1,\s*end\) infinite/);
  assert.match(styles, /@keyframes paul-basic-attack/);
  assert.match(styles, /slime_basic_attack_left_frame_01\.png/);
  assert.match(styles, /\.skill-card\s*{/);
  assert.match(styles, /\.upgrade-panel\s*{/);
  assert.match(styles, /\.bottom-nav\s*{/);
});

test("Paul battle sprite uses every provided basic attack frame in order", async () => {
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const frameMatches = [...styles.matchAll(/paul_basic_attack_frame_(\d{2})\.png/g)]
    .map((match) => match[1]);

  assert.deepEqual(frameMatches, [
    "01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12",
    "13", "14", "15", "16"
  ]);
  assert.doesNotMatch(styles, /star_mage_pose_05_cast_magic\.png/);
});

test("Paul basic attack projectile uses all supplied projectile frames", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const frameMatches = [...styles.matchAll(/paul_basic_attack_projectile_frame_(\d{2})\.png/g)]
    .map((match) => match[1]);

  assert.match(html, /class="projectile-sprite"/);
  assert.deepEqual(frameMatches, [
    "01", "02", "03", "04",
    "05", "06", "07", "08"
  ]);
  assert.match(styles, /animation:\s*paul-projectile-flight var\(--paul-projectile-duration\) cubic-bezier\(0\.18,\s*0\.78,\s*0\.22,\s*1\) infinite,\s*paul-projectile-frames var\(--paul-projectile-duration\) steps\(1,\s*end\) infinite/);
  assert.match(styles, /@keyframes paul-projectile-flight/);
  assert.match(styles, /@keyframes paul-projectile-frames/);
});

test("browser script wires upgrades, tab placeholders, local save, and offline rewards", async () => {
  const game = await readFile(new URL("../src/game.js", import.meta.url), "utf8");

  assert.match(game, /IDLE_STORAGE_KEY/);
  assert.match(game, /createIdleUiState/);
  assert.match(game, /applyIdleUpgrade/);
  assert.match(game, /calculateOfflineReward/);
  assert.match(game, /renderUpgradeRows/);
  assert.match(game, /upgradeListEl\.addEventListener\("click"/);
  assert.match(game, /bottomNavEl\.addEventListener\("click"/);
  assert.match(game, /localStorage\.setItem/);
  assert.match(game, /오프라인 보상/);
});

test("file protocol bundle contains the idle UI runtime without module imports", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const bundle = await readFile(new URL("../src/game.bundle.js", import.meta.url), "utf8");

  assert.match(html, /src="\.\/src\/game\.bundle\.js"/);
  assert.doesNotMatch(html, /type="module"/);
  assert.doesNotMatch(bundle, /^import\s/m);
  assert.match(bundle, /function createIdleUiState/);
  assert.match(bundle, /function applyIdleUpgrade/);
  assert.match(bundle, /function renderUpgradeRows/);
});

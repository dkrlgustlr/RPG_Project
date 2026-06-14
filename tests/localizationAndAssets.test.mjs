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
  assert.match(styles, /starlight_meadow_battle_platform\.png/);
  assert.match(styles, /\.resource-chip\s*{/);
  assert.match(styles, /\.stage-card\s*{/);
  assert.match(styles, /\.battlefield\s*{/);
  assert.match(styles, /paul_basic_attack_v2_frame_01\.png/);
  assert.match(styles, /paul_basic_attack_v2_frame_16\.png/);
  assert.match(styles, /--paul-basic-attack-duration:\s*1350ms/);
  assert.match(styles, /--slime-basic-attack-duration:\s*1400ms/);
  assert.match(styles, /--paul-projectile-duration:\s*880ms/);
  assert.match(styles, /animation:\s*paul-basic-attack var\(--paul-basic-attack-duration\) steps\(1,\s*end\) infinite,\s*paul-basic-motion var\(--paul-basic-attack-duration\) ease-in-out infinite/);
  assert.match(styles, /animation:\s*slime-basic-attack var\(--slime-basic-attack-duration\) steps\(1,\s*end\) infinite/);
  assert.match(styles, /@keyframes paul-basic-attack/);
  assert.match(styles, /@keyframes slime-basic-attack/);
  assert.match(styles, /slime_basic_attack_left_frame_01\.png/);
  assert.match(styles, /\.skill-card\s*{/);
  assert.match(styles, /\.upgrade-panel\s*{/);
  assert.match(styles, /\.bottom-nav\s*{/);
});

test("Paul battle sprite uses every provided basic attack frame in order", async () => {
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const frameMatches = [...styles.matchAll(/paul_basic_attack_v2_frame_(\d{2})\.png/g)]
    .map((match) => match[1]);

  assert.deepEqual(frameMatches, [
    "01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12",
    "13", "14", "15", "16"
  ]);
  assert.match(styles, /assets\/폴_평타_16_개선본\/paul_basic_attack_v2_frame_01\.png/);
  assert.match(styles, /@keyframes paul-basic-motion/);
  assert.doesNotMatch(styles, /star_mage_pose_05_cast_magic\.png/);
});

test("Paul battle sprite uses subtle motion smoothing for large pose changes", async () => {
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const motionBlock = styles.slice(
    styles.indexOf("@keyframes paul-basic-motion"),
    styles.indexOf("@keyframes paul-skill1-frames")
  );

  assert.match(styles, /\.paul-sprite\s*{[^}]*transform-origin:\s*50%\s*88%/s);
  assert.match(motionBlock, /translateX\(-52%\) translateY\(-2px\) rotate\(-1deg\) scale\(1\.01,\s*0\.995\)/);
  assert.match(motionBlock, /translateX\(-51%\) translateY\(1px\) rotate\(1deg\) scale\(1\.015,\s*0\.99\)/);
  assert.doesNotMatch(motionBlock, /translateX\(-5[5-9]%\)/);
  assert.doesNotMatch(motionBlock, /rotate\(-3deg\)/);
});

test("slime monster sprite uses every provided basic attack frame in order", async () => {
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const frameMatches = [...styles.matchAll(/slime_basic_attack_left_frame_(\d{2})\.png/g)]
    .map((match) => match[1]);

  assert.deepEqual(frameMatches, [
    "01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12",
    "13", "14", "15", "16"
  ]);
});

test("slime monster separates sprite frames from smooth body motion", async () => {
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

  assert.match(styles, /animation:\s*slime-basic-attack var\(--slime-basic-attack-duration\) steps\(1,\s*end\) infinite,\s*slime-basic-motion var\(--slime-basic-attack-duration\) ease-in-out infinite/);
  assert.match(styles, /@keyframes slime-basic-motion/);
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

test("Paul skill 1 uses the 32 frame stardust burst sprite sheet", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

  assert.match(html, /class="paul-skill1-sprite"/);
  assert.match(styles, /--paul-skill-cycle-duration:\s*6200ms/);
  assert.match(styles, /--paul-skill1-frame-size:\s*313px/);
  assert.match(styles, /--paul-skill1-sheet-shift:\s*-10016px/);
  assert.match(styles, /--paul-skill1-cast-duration:\s*1280ms/);
  assert.match(styles, /--paul-skill1-cycle-duration:\s*var\(--paul-skill-cycle-duration\)/);
  assert.match(styles, /paul_skill1_stardust_burst_32_std313_sheet_horizontal\.png/);
  assert.match(styles, /animation:\s*paul-skill1-frames var\(--paul-skill1-cast-duration\) steps\(32,\s*end\) infinite,\s*paul-skill1-window var\(--paul-skill1-cycle-duration\) linear infinite/);
  assert.match(styles, /@keyframes paul-skill1-frames/);
  assert.match(styles, /background-position:\s*var\(--paul-skill1-sheet-shift\) 0/);
  assert.doesNotMatch(styles, /calc\(var\(--paul-skill1-frame-size\) \* -32\)/);
  assert.match(styles, /@keyframes paul-skill1-window/);
});

test("Paul skill 2 uses the 16 frame starlight guard sprite sheet", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

  assert.match(html, /class="paul-skill2-sprite"/);
  assert.match(styles, /--paul-skill2-frame-size:\s*400px/);
  assert.match(styles, /--paul-skill2-sheet-shift:\s*-6400px/);
  assert.match(styles, /--paul-skill2-cast-duration:\s*1320ms/);
  assert.match(styles, /--paul-skill2-cycle-duration:\s*var\(--paul-skill-cycle-duration\)/);
  assert.match(styles, /paul_skill2_starlight_guard_safe400_sheet_horizontal\.png/);
  assert.match(styles, /animation:\s*paul-skill2-frames var\(--paul-skill2-cycle-duration\) steps\(1,\s*end\) infinite,\s*paul-skill2-window var\(--paul-skill2-cycle-duration\) cubic-bezier\(0\.2,\s*0\.72,\s*0\.22,\s*1\) infinite/);
  assert.match(styles, /@keyframes paul-skill2-frames/);
  assert.match(styles, /background-position:\s*var\(--paul-skill2-sheet-shift\) 0/);
  assert.match(styles, /54\.8%\s*{\s*background-position:\s*-3200px 0;\s*}/s);
  assert.match(styles, /@keyframes paul-skill2-window/);
  assert.match(styles, /paul-base-visibility var\(--paul-skill2-cycle-duration\) linear infinite/);
  assert.match(styles, /@keyframes paul-base-visibility/);
});

test("ultimate button triggers a 1.5 second cut-in illustration overlay", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const game = await readFile(new URL("../src/game.js", import.meta.url), "utf8");
  const bundle = await readFile(new URL("../src/game.bundle.js", import.meta.url), "utf8");

  assert.match(html, /id="ultimateButton"/);
  assert.match(html, /id="ultimateCutscene"/);
  assert.match(html, /class="ultimate-cutscene"/);
  assert.match(styles, /--ultimate-cutscene-duration:\s*1500ms/);
  assert.match(styles, /paul_ultimate_cutin\.png/);
  assert.match(styles, /\.ultimate-cutscene\s*{[^}]*z-index:\s*1/s);
  assert.match(styles, /\.ultimate-cutscene::before\s*{[^}]*background:\s*rgba\(6,\s*7,\s*18,\s*0\.62\)/s);
  assert.match(styles, /\.ultimate-cutscene\.is-playing\s*{[^}]*visibility:\s*visible/s);
  assert.match(styles, /\.ultimate-cutscene\.is-playing::before\s*{[^}]*animation:\s*ultimate-backdrop-dim var\(--ultimate-cutscene-duration\) ease-out both/s);
  assert.match(styles, /\.ultimate-cutscene\.is-playing \.ultimate-cutscene__image\s*{[^}]*animation:\s*ultimate-cutscene-in-out var\(--ultimate-cutscene-duration\) cubic-bezier\(0\.16,\s*0\.84,\s*0\.22,\s*1\) both/s);
  assert.match(styles, /@keyframes ultimate-backdrop-dim/);
  assert.match(styles, /@keyframes ultimate-cutscene-in-out/);
  assert.match(styles, /\.top-hud,\s*\.stage-card,\s*\.skill-card,\s*\.upgrade-panel,\s*\.nav-item,\s*\.boss-count-card\s*{[^}]*z-index:\s*2/s);
  assert.match(styles, /\.skill-bar\s*{[^}]*z-index:\s*3/s);
  assert.match(styles, /\.bottom-nav\s*{[^}]*z-index:\s*4/s);
  assert.match(game, /const ultimateButton = document\.querySelector\("#ultimateButton"\)/);
  assert.match(game, /const ultimateCutscene = document\.querySelector\("#ultimateCutscene"\)/);
  assert.match(game, /ULTIMATE_CUTSCENE_CLASS/);
  assert.match(game, /playUltimateCutscene/);
  assert.match(game, /ultimateButton\.addEventListener\("click", playUltimateCutscene\)/);
  assert.match(bundle, /function playUltimateCutscene/);
  assert.match(bundle, /ultimateButton\.addEventListener\("click", playUltimateCutscene\)/);
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

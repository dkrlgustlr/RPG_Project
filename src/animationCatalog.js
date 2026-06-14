const RUNTIME_STYLE_ID = "battle-animation-runtime-styles";

export const BATTLE_ANIMATION_DEFINITIONS = [
  {
    id: "paul-skill1",
    targetSelector: ".combatant.paul",
    className: "paul-skill1-sprite",
    frameSize: 313,
    frames: 16,
    sheetShift: -5008,
    castDuration: "1280ms",
    cycleDurationVar: "--paul-skill1-cycle-duration",
    assetPath: "assets/폴_스킬1_별가루폭발_16/paul_skill1_stardust_burst_safe313_sheet_horizontal.png",
    bottom: "-53px",
    zIndex: 4,
    filter:
      "drop-shadow(0 0 10px rgba(197, 255, 72, 0.5)) drop-shadow(0 12px 6px rgba(34, 62, 29, 0.24))",
    startTransform: "translateX(-42%) translateY(8px) scale(0.49)",
    transformOrigin: "43% 72%",
    frameTrack: {
      name: "paul-skill1-frames",
      timing: "steps(1, end)",
      durationVar: "--paul-skill1-cycle-duration",
      frameOffsets: [
        "0%", "2%", "4%", "6%",
        "8%", "10%", "12%", "14%",
        "16%", "18%", "20%", "22%",
        "24%", "25.5%", "27%", "28%"
      ],
      hideAt: "30%"
    },
    windowTrack: {
      name: "paul-skill1-window",
      timing: "linear",
      keyframes: [
        { offsets: ["0%"], opacity: 1, transform: "translateX(-42%) translateY(2px) scale(0.49)" },
        { offsets: ["2%", "22%"], opacity: 1, transform: "translateX(-42%) translateY(0) scale(0.5)" },
        { offsets: ["25%", "28%"], opacity: 1, transform: "translateX(-43%) translateY(-2px) scale(0.52)" },
        { offsets: ["30%", "100%"], opacity: 0, transform: "translateX(-42%) translateY(4px) scale(0.49)" }
      ]
    },
    timeline: {
      showStart: 0,
      hideEnd: 30
    },
    hidesBase: true
  },
  {
    id: "paul-skill2",
    targetSelector: ".combatant.paul",
    className: "paul-skill2-sprite",
    frameSize: 313,
    frames: 16,
    sheetShift: -5008,
    castDuration: "1320ms",
    cycleDurationVar: "--paul-skill2-cycle-duration",
    assetPath: "assets/폴_스킬2_별빛방어마법_16/paul_skill2_starlight_guard_sheet_horizontal.png",
    bottom: "-58px",
    zIndex: 3,
    filter:
      "drop-shadow(0 0 10px rgba(134, 231, 255, 0.58)) drop-shadow(0 0 18px rgba(255, 241, 128, 0.42))",
    startTransform: "translateX(-50%) translateY(10px) scale(0.6)",
    transformOrigin: "50% 72%",
    frameTrack: {
      name: "paul-skill2-frames",
      timing: "steps(1, end)",
      durationVar: "--paul-skill2-cycle-duration",
      holdUntil: "41.9%",
      frameOffsets: [
        "42%", "43.6%", "45.2%", "46.8%",
        "48.4%", "50%", "51.6%", "53.2%",
        "54.8%", "56.4%", "58%", "59.6%",
        "61.2%", "62.8%", "64.4%", "66%"
      ],
      hideAt: "67%"
    },
    windowTrack: {
      name: "paul-skill2-window",
      timing: "cubic-bezier(0.2, 0.72, 0.22, 1)",
      keyframes: [
        { offsets: ["0%", "39%"], opacity: 0, transform: "translateX(-50%) translateY(10px) scale(0.6)" },
        { offsets: ["42%"], opacity: 0.9, transform: "translateX(-50%) translateY(2px) scale(0.61)" },
        { offsets: ["46%", "58%"], opacity: 1, transform: "translateX(-50%) translateY(-1px) scale(0.63)" },
        { offsets: ["62%"], opacity: 0.95, transform: "translateX(-50%) translateY(0) scale(0.62)" },
        { offsets: ["67%", "100%"], opacity: 0, transform: "translateX(-50%) translateY(7px) scale(0.6)" }
      ]
    },
    timeline: {
      showStart: 42,
      hideEnd: 67
    },
    hidesBase: true
  }
];

export function initializeBattleAnimations(root = document) {
  ensureBattleAnimationStyle(root);
  ensureBattleAnimationLayers(root);
}

export function ensureBattleAnimationStyle(root = document) {
  const documentRef = root.ownerDocument ?? root;
  let style = documentRef.querySelector(`#${RUNTIME_STYLE_ID}`);

  if (!style) {
    style = documentRef.createElement("style");
    style.id = RUNTIME_STYLE_ID;
    documentRef.head.append(style);
  }

  style.textContent = createBattleAnimationStyleText(BATTLE_ANIMATION_DEFINITIONS, documentRef.baseURI);
  return style;
}

export function ensureBattleAnimationLayers(root = document) {
  for (const definition of BATTLE_ANIMATION_DEFINITIONS) {
    const target = root.querySelector(definition.targetSelector);
    if (!target) continue;

    let layer = target.querySelector(`.${definition.className}`);
    if (!layer) {
      layer = root.createElement("div");
      layer.className = definition.className;
      layer.setAttribute("aria-hidden", "true");
      target.prepend(layer);
    }

    layer.classList.add("battle-animation-layer");
    layer.dataset.animationId = definition.id;
  }
}

export function createBattleAnimationStyleText(definitions, baseUri = "") {
  const rootVariables = [
    "--paul-skill-cycle-duration: 6200ms",
    "--paul-skill1-frame-size: 313px",
    "--paul-skill1-sheet-shift: -5008px",
    "--paul-skill1-cast-duration: 1280ms",
    "--paul-skill1-cycle-duration: var(--paul-skill-cycle-duration)",
    "--paul-skill2-frame-size: 313px",
    "--paul-skill2-sheet-shift: -5008px",
    "--paul-skill2-cast-duration: 1320ms",
    "--paul-skill2-cycle-duration: var(--paul-skill-cycle-duration)"
  ];
  const css = [
    "/* #battle-animation-runtime-styles */",
    `:root {\n${rootVariables.map((line) => `  ${line};`).join("\n")}\n}`,
    ".battle-animation-layer {\n  position: absolute;\n  left: 50%;\n  pointer-events: none;\n  background-position: 0 0;\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n  image-rendering: auto;\n  opacity: 0;\n  will-change: background-position, opacity, transform;\n}",
    ".paul-sprite {\n  animation: paul-basic-attack var(--paul-basic-attack-duration) steps(1, end) infinite,\n    paul-basic-motion var(--paul-basic-attack-duration) ease-in-out infinite,\n    paul-base-visibility var(--paul-skill-cycle-duration) linear infinite;\n  will-change: background-image, transform, opacity;\n}",
    ...definitions.flatMap((definition) => [
      createLayerRule(definition, baseUri),
      createFrameKeyframes(definition),
      createWindowKeyframes(definition)
    ]),
    createBaseVisibilityKeyframes(definitions)
  ];

  return css.join("\n\n");
}

export function resolveBattleAnimationAssetUrl(assetPath, baseUri = "") {
  if (!baseUri) return assetPath;

  try {
    return new URL(assetPath, baseUri).href;
  } catch {
    return assetPath;
  }
}

function createLayerRule(definition, baseUri) {
  const frameDuration = definition.frameTrack.durationVar
    ? `var(${definition.frameTrack.durationVar})`
    : createVarName(definition, "cast-duration");
  const assetUrl = resolveBattleAnimationAssetUrl(definition.assetPath, baseUri);

  return `.${definition.className} {\n  bottom: ${definition.bottom};\n  z-index: ${definition.zIndex};\n  width: ${createVarName(definition, "frame-size")};\n  height: ${createVarName(definition, "frame-size")};\n  background-image: url("${assetUrl}");\n  filter: ${definition.filter};\n  transform: ${definition.startTransform};\n  transform-origin: ${definition.transformOrigin};\n  animation: ${definition.frameTrack.name} ${frameDuration} ${definition.frameTrack.timing} infinite,\n    ${definition.windowTrack.name} var(${definition.cycleDurationVar}) ${definition.windowTrack.timing} infinite;\n}`;
}

function createFrameKeyframes(definition) {
  if (definition.frameTrack.frameOffsets) {
    const holdRule = definition.frameTrack.holdUntil
      ? `  0%,\n  ${definition.frameTrack.holdUntil} {\n    background-position: 0 0;\n  }\n\n`
      : "";
    const frameRules = definition.frameTrack.frameOffsets
      .map((offset, index) => {
        const position = index === 0 ? "0" : `-${definition.frameSize * index}px`;
        return `  ${offset} {\n    background-position: ${position} 0;\n  }`;
      })
      .join("\n\n");

    return `@keyframes ${definition.frameTrack.name} {\n${holdRule}${frameRules}\n\n  ${definition.frameTrack.hideAt},\n  100% {\n    background-position: ${createVarName(definition, "sheet-shift")} 0;\n  }\n}`;
  }

  return `@keyframes ${definition.frameTrack.name} {\n  from {\n    background-position: 0 0;\n  }\n\n  to {\n    background-position: ${createVarName(definition, "sheet-shift")} 0;\n  }\n}`;
}

function createWindowKeyframes(definition) {
  const rules = definition.windowTrack.keyframes
    .map((frame) => {
      const offsets = frame.offsets.join(",\n  ");
      return `  ${offsets} {\n    opacity: ${frame.opacity};\n    transform: ${frame.transform};\n  }`;
    })
    .join("\n\n");

  return `@keyframes ${definition.windowTrack.name} {\n${rules}\n}`;
}

function createBaseVisibilityKeyframes(definitions) {
  const blockingDefinitions = definitions
    .filter((definition) => definition.hidesBase)
    .sort((left, right) => left.timeline.showStart - right.timeline.showStart);

  if (blockingDefinitions.length === 0) {
    return "";
  }

  const rules = [];
  let visibleStart = null;

  for (const definition of blockingDefinitions) {
    const start = definition.timeline.showStart;
    const end = definition.timeline.hideEnd;

    if (visibleStart !== null && visibleStart < start) {
      rules.push(createOpacityRule([`${visibleStart}%`, `${start - 0.1}%`], 1));
    }

    rules.push(createOpacityRule([`${start}%`, `${end}%`], 0));
    visibleStart = end + 1;
  }

  if (visibleStart !== null && visibleStart <= 100) {
    rules.push(createOpacityRule([`${visibleStart}%`, "100%"], 1));
  }

  return `@keyframes paul-base-visibility {\n${rules.join("\n\n")}\n}`;
}

function createVarName(definition, suffix) {
  return `var(--${definition.id}-${suffix})`;
}

function createOpacityRule(offsets, opacity) {
  return `  ${offsets.join(",\n  ")} {\n    opacity: ${opacity};\n  }`;
}

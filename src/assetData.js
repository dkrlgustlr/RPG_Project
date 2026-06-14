export const PALETTE = {
  ".": "transparent",
  A: "#10131d",
  B: "#20273a",
  C: "#68e8ff",
  D: "#f5f7ff",
  E: "#ffc857",
  F: "#65f0a1",
  G: "#ff5d73",
  H: "#9b5cff",
  I: "#ff6a3d",
  J: "#9be7ff",
  K: "#3b4260",
  L: "#151923",
  M: "#d74961",
  N: "#ff9a52",
  O: "#f4c36a",
  P: "#f7e6a0",
  Q: "#6b4b2e",
  R: "#9bdc5a",
  S: "#4fae55",
  T: "#24381e",
  U: "#e85b4f",
  V: "#ffe2b4",
  W: "#fff7df",
  X: "#7a5a37",
  Y: "#67b84c",
  Z: "#b9df69",
  a: "#f1b37a",
  b: "#c9784f",
  c: "#5b3a25",
  d: "#3f8cc7",
  e: "#235d91",
  f: "#3fa65b",
  g: "#1f6f43",
  h: "#7a4d2d",
  i: "#2d2119",
  j: "#d9e4ea",
  k: "#1f2d1e",
  l: "#f0d06b"
};

export const SPRITES = {
  player: [
    ".......kkkk.......",
    "......kcccck......",
    ".....kcccccck.....",
    ".....kcaaaack.....",
    "....kcabbbackk....",
    "....kcaaaaack.....",
    ".....kaaaak.......",
    "....kkffffkk......",
    "...kffdddffk......",
    "..kffgdeddgfk.....",
    "..kfggdddggfk.....",
    "..kfggdldggfk.....",
    "...kffdddffk......",
    "....kdhhhdk.......",
    "...khhhhhhhk......",
    "...khh...hhk......",
    "....ii...ii.......",
    "...kii...iik......",
    "..kkii...iikk.....",
    "..................",
    ".................."
  ],
  enemy: [
    "....RRRRRR....",
    "...RRSSSSRR...",
    "..RRSSSSSSRR..",
    ".RRSSTTSSSRR.",
    ".RSSSTTSSSSR.",
    "RRSSSSSSSSRR",
    "RSSSSZZSSSSR",
    "RSSSZZZZSSSR",
    ".RSSSSSSSSR.",
    "..RRSSSSRR..",
    "...RR..RR...",
    "....R..R...."
  ],
  elite: [
    ".....UUUUUU.....",
    "...UUUWWWWUU...",
    "..UUWWWWWWUUU..",
    ".UUUWUUUUWUUU.",
    "UUUUUUUUUUUUUU",
    "...UVVVVVVU....",
    "..VVVTTTTVV....",
    "..VVTTWTTTV....",
    "...VTTTTTV.....",
    "...VVVVVV......",
    "..hhVVVVhh.....",
    ".hh......hh....",
    "hh........hh..."
  ],
  boss: [
    "........YYYYYY........",
    "......YYYZZZZYYY......",
    "....YYYZZXXXXZZYY.....",
    "...YYZZXXTTTTXXZYY....",
    "..YYZXXTWWWWTXXZYY....",
    ".YYZXXTWYWWYTXXZYY....",
    "YYZZXXXXXXXXXXXXZYY...",
    "YZZXXYYYYYYYYXXZZY....",
    "YZXYYYYZZZZYYYYXZY....",
    ".XXYYYZZXXZZYYYXX.....",
    ".XXZZZXXXXXXZZZXX.....",
    "XX..XXXYYYYXXX..XX....",
    "X...XXYYYYYYXX...X....",
    "....XXYYXXYYXX........",
    "...XXXYY..YYXXX.......",
    "..XXX......XXX........",
    ".XX..........XX......."
  ],
  drone: [
    "...C.C...",
    "..CDDDC..",
    ".CDDCDDC.",
    "CDDPDPDDC",
    ".CDDCDDC.",
    "..CDDDC..",
    ".C..D..C.",
    "C.......C",
    "........."
  ],
  turret: [
    "...EEE...",
    "..EEPEE..",
    ".EEKDKEE.",
    ".KKKDKKK.",
    "KKKPEPKKK",
    "..KAAAK..",
    ".AA...AA.",
    "AA.....AA",
    "........."
  ],
  gem: [
    ".F.",
    "FFF",
    ".F."
  ],
  spark: [
    "C.C",
    ".D.",
    "C.C"
  ],
  starBolt: [
    "......E......",
    ".....EPE.....",
    "....EPWPE....",
    "...EPWWWPE...",
    "..EPPWWWPPH..",
    ".EPPWWWWWPPH.",
    "EPPPWWCWWWPPH",
    ".HPPWWWWWPPH.",
    "..HPPWWWPPH..",
    "...HPWWWPH...",
    "....HPWPH....",
    ".....HPH.....",
    "......H......"
  ],
  ice: [
    "....J....",
    "...JDJ...",
    "..JDDDJ..",
    ".JDDWDDJ.",
    "JDDWJWDDJ",
    ".JDDWDDJ.",
    "..JDDDJ..",
    "...JDJ...",
    "....J...."
  ],
  bolt: [
    "....E....",
    "...EPE...",
    "..EPPPE..",
    ".EPPWPE.",
    "EPPWWWPE",
    ".EPPWPE.",
    "..EPPPE..",
    "...EPE...",
    "....E...."
  ],
  poison: [
    "....F....",
    "...FSF...",
    "..FSRSF..",
    ".FSRRRSF.",
    "FSRRTRRSF",
    ".FSRRRSF.",
    "..FSRSF..",
    "...FSF...",
    "....F...."
  ],
  curse: [
    "....H....",
    "...HLH...",
    "..HLLLH..",
    ".HLAALH.",
    "HLLAALLH",
    ".HLAALH.",
    "..HLLLH..",
    "...HLH...",
    "....H...."
  ],
  void: [
    "......H......",
    "...HHLLLHH...",
    "..HLLAAALLH..",
    ".HLAKHHHKALH.",
    ".HLAHPPPHALH.",
    "HLAHPPWPHALH",
    "HLAHPPPPHALH",
    "HLAHPPWPHALH",
    ".HLAHPPPHALH.",
    ".HLAKHHHKALH.",
    "..HLLAAALLH..",
    "...HHLLLHH...",
    "......H......"
  ],
  floor: [
    "LLLLKLLL",
    "LLLLLLLL",
    "LLKLLLLL",
    "LLLLLLLL",
    "LLLLLLKL",
    "LLLLLLLL",
    "LKLLLLLL",
    "LLLLLLLL"
  ],
  crate: [
    "BBBBBB",
    "BEKKKB",
    "BKEEKB",
    "BKEEKB",
    "BKKKEB",
    "BBBBBB"
  ],
  conduit: [
    "K..K..K.",
    ".K..K..K",
    "..K..K..",
    "K..K..K."
  ]
};

export const SKILL_ICONS = {
  "spark-shot": [
    "..C...C.",
    "...C.C..",
    "CCCCDCCC",
    "...C.C..",
    "..C...C.",
    "........",
    ".C....C.",
    "..CCCC.."
  ],
  "chain-link": [
    "CC..CC..",
    "C.DD.C..",
    "CC..CC..",
    "..CC..CC",
    "..C.DD.C",
    "..CC..CC",
    "...C.C..",
    "....C..."
  ],
  "voltage-core": [
    "..CCCC..",
    ".CDAADC.",
    "CDCCCCDC",
    "C..CC..C",
    "C.CDDC.C",
    "CDCCCCDC",
    ".CDAADC.",
    "..CCCC.."
  ],
  "flame-flask": [
    "...D....",
    "..DDD...",
    "..NIN...",
    ".NIINN..",
    ".IIII...",
    "IINIII..",
    ".IIIN...",
    "..II...."
  ],
  "magnet-glove": [
    "GG....GG",
    "GG....GG",
    "GG....GG",
    "GGG..GGG",
    ".GGGGGG.",
    "..GGGG..",
    ".C....C.",
    "C......C"
  ],
  "heat-core": [
    "..NNNN..",
    ".NIIIIN.",
    "NIIEEIIN",
    "NIEIIEIN",
    "NIIEEIIN",
    ".NIIIIN.",
    "..NNNN..",
    "...II..."
  ],
  "ice-shard": [
    "J...J...",
    ".J.J....",
    "..D.....",
    "JJDDDJJJ",
    "..D.....",
    ".J.J....",
    "J...J...",
    "....J..."
  ],
  splitter: [
    "C......C",
    ".C....C.",
    "..C..C..",
    "...DD...",
    "..C..C..",
    ".C....C.",
    "C......C",
    "........"
  ],
  piercer: [
    "....D...",
    "...DD...",
    "..DDD...",
    "DDDDDDDD",
    "..DDD...",
    "...DD...",
    "....D...",
    "........"
  ],
  "micro-drone": [
    "..C..C..",
    ".CD..DC.",
    "C..DD..C",
    "..CDDC..",
    "..CDDC..",
    "C..DD..C",
    ".CD..DC.",
    "..C..C.."
  ],
  "pocket-turret": [
    "...E....",
    "..EEE...",
    "..KDK...",
    ".KKDKK..",
    ".KKEKK..",
    "..KKK...",
    ".A...A..",
    "A.....A."
  ],
  "cooling-kit": [
    "J..J..J.",
    ".J.J.J..",
    "..JDJ...",
    "JJDDDJJ.",
    "..JDJ...",
    ".J.J.J..",
    "J..J..J.",
    "........"
  ],
  "shield-belt": [
    "..CCCC..",
    ".C....C.",
    "C..DD..C",
    "C.DCCD.C",
    "C.DCCD.C",
    ".C.DD.C.",
    "..CCCC..",
    "...CC..."
  ],
  "counter-coil": [
    "C.C.C.C.",
    ".C.C.C.C",
    "C.CDC.C.",
    ".CDDDC.C",
    "C.CDC.C.",
    ".C.C.C.C",
    "C.C.C.C.",
    "........"
  ],
  "swift-boots": [
    "..D..D..",
    ".DDD.DDD",
    ".DCC.DCC",
    ".DCC.DCC",
    "DDCCDDCC",
    "E....E..",
    ".EE...EE",
    "........"
  ],
  "vital-gel": [
    "..F..F..",
    ".FFFFFF.",
    "FFDFFDFF",
    "FFFFFFFF",
    ".FFFFFF.",
    "..FFFF..",
    "...FF...",
    "........"
  ],
  "toxic-vial": [
    "...F....",
    "..FSF...",
    ".FSRSF..",
    ".SRRRS..",
    ".SRTRS..",
    "..SSS...",
    ".F...F..",
    "F.....F."
  ],
  "venom-culture": [
    "..FFFF..",
    ".FSRRSF.",
    "FSRFFRSF",
    "FRFSSFRT",
    "FRFSSFRT",
    "FSRFFRSF",
    ".FSRRSF.",
    "..FFFF.."
  ],
  "plague-bloom": [
    "...F....",
    ".F.S.F..",
    "F.SRS.F.",
    ".SRTRS..",
    "F.SRS.F.",
    ".F.S.F..",
    "...F....",
    "..TTT..."
  ],
  "black-lotus": [
    "...H....",
    ".H.F.H..",
    "HFSSSFH.",
    ".SRTTRS.",
    "HFSSSFH.",
    ".H.F.H..",
    "...H....",
    "..TTT..."
  ],
  "curse-sigil": [
    "..HHHH..",
    ".HLAALH.",
    "HLAHALLH",
    "HLAAALAH",
    "HLAHALLH",
    ".HLAALH.",
    "..HHHH..",
    "...H...."
  ],
  "doom-mark": [
    "H......H",
    ".H....H.",
    "..HAAH..",
    "...LL...",
    "..HAAH..",
    ".H....H.",
    "H......H",
    "...HH..."
  ],
  "soul-harvest": [
    "..HHHH..",
    ".HPPPPH.",
    "HPWLLWPH",
    "HPLHHLPH",
    "HPWLLWPH",
    ".HPPPPH.",
    "..HHHH..",
    "...H...."
  ],
  "void-orb": [
    "..HHHH..",
    ".HLLLLH.",
    "HLLAALLH",
    "HLAHHALH",
    "HLAHHALH",
    "HLLAALLH",
    ".HLLLLH.",
    "..HHHH.."
  ]
};

export const UI_ICONS = {
  "core-shard": [
    "..CCCC..",
    ".CJJJJC.",
    "CJJDDJJC",
    "CJDEEDJC",
    "CJDEEDJC",
    "CJJDDJJC",
    ".CJJJJC.",
    "..CCCC.."
  ],
  gear: [
    "..KDDK..",
    ".KDDDDK.",
    "KDDKKDDK",
    "DDKPPKDD",
    "DDKPPKDD",
    "KDDKKDDK",
    ".KDDDDK.",
    "..KDDK.."
  ]
};

export const META_NODE_ICONS = {
  "root-core": SKILL_ICONS["voltage-core"],
  "damage-1": [
    "..KKKK..",
    ".KDDDDK.",
    "KDDDDDDK",
    "EEEEEEDK",
    "KDDDDDDK",
    ".KDDDDK.",
    "..KKKK..",
    "........"
  ],
  "damage-2": [
    "...D....",
    "..DDD...",
    ".DDDDD..",
    "DDDEEDDD",
    ".DDDDD..",
    "..DDD...",
    "...D....",
    "........"
  ],
  "starting-spark-1": SKILL_ICONS["spark-shot"],
  "hp-1": SKILL_ICONS["shield-belt"],
  "hp-2": [
    "..FFFF..",
    ".FDDDF.",
    "FFDDDFF.",
    "FFFFFFF.",
    ".FDDDF..",
    "..FFF...",
    "...F....",
    "........"
  ],
  "starting-vital-1": SKILL_ICONS["vital-gel"],
  "pickup-1": [
    "GG....GG",
    "G......G",
    "G..CC..G",
    ".GCDDGG.",
    ".GCDDGG.",
    "G..CC..G",
    "G......G",
    "GG....GG"
  ],
  "pickup-2": SKILL_ICONS["magnet-glove"],
  "pierce-training-1": SKILL_ICONS["piercer"],
  "core-harvester-1": [
    "..EEEE..",
    ".EFFFFE.",
    "EFDDDFE.",
    "EFDDFEE.",
    "EFDDDFE.",
    ".EFFFFE.",
    "..EEEE..",
    "....E..."
  ],
  "reroll-1": [
    "..CCCC..",
    ".C....C.",
    "C..DD.C.",
    "C.DD..C.",
    "C....CC.",
    ".CCCC...",
    "...C....",
    "........"
  ],
  "core-harvester-2": [
    "..EEEE..",
    ".EFFFE..",
    "EFDDDFE.",
    "EFDDFEE.",
    "EFDDDFE.",
    ".EFFFE..",
    "..EEEE..",
    "..E..E.."
  ],
  "reroll-2": SKILL_ICONS.splitter,
  "unlock-fire-core": SKILL_ICONS["heat-core"],
  "unlock-ice-core": SKILL_ICONS["ice-shard"],
  "unlock-drone-lab": SKILL_ICONS["micro-drone"],
  "overclock-1": [
    "C.C.C.C.",
    ".CDDDC..",
    "CDEEEEC.",
    ".DEAAED.",
    "CDEEEEC.",
    ".CDDDC..",
    "C.C.C.C.",
    "........"
  ]
};

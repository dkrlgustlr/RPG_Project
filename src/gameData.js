export const STORAGE_KEY = "coreBreakerProgress.v1";

export const KIND_LABELS = {
  weapon: "무기",
  modifier: "변형",
  passive: "성장",
  utility: "유틸"
};

export const RARITY_LABELS = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary"
};

export const RARITY_WEIGHTS = {
  common: 58,
  rare: 28,
  epic: 11,
  legendary: 3
};

export const CHARACTER_ROSTER = [
  {
    id: "core-minion",
    name: "별빛 마법사",
    role: "기본형",
    description: "별 머리와 낡은 로브를 두른 대표 캐릭터입니다.",
    unlockedByDefault: true
  },
  {
    id: "spark-scout",
    name: "스파크 정찰병",
    role: "속도형",
    description: "가벼운 장비로 더 빠르게 움직이는 전기 계열 캐릭터입니다.",
    unlockNode: "starting-spark-1"
  },
  {
    id: "bulwark-buddy",
    name: "방벽 친구",
    role: "생존형",
    description: "두꺼운 슈트와 보호막으로 오래 버티는 캐릭터입니다.",
    unlockNode: "starting-vital-1"
  }
];

export const META_TREE = [
  {
    id: "root-core",
    name: "실험 코어",
    description: "기본 코어. 모든 영구 성장의 시작점입니다.",
    cost: 0,
    prerequisites: [],
    position: { x: 1200, y: 650 },
    effects: {}
  },
  {
    id: "damage-1",
    name: "개량 총열",
    description: "모든 무기 피해량 +8%",
    cost: 25,
    prerequisites: ["root-core"],
    position: { x: 900, y: 650 },
    effects: { damageMultiplier: 0.08 }
  },
  {
    id: "damage-2",
    name: "고압 탄두",
    description: "모든 무기 피해량 추가 +12%",
    cost: 70,
    prerequisites: ["damage-1"],
    position: { x: 600, y: 650 },
    effects: { damageMultiplier: 0.12 }
  },
  {
    id: "starting-spark-1",
    name: "초기 전압",
    description: "매 런 시작 시 스파크 탄 레벨 +1",
    cost: 95,
    prerequisites: ["damage-2"],
    position: { x: 300, y: 650 },
    effects: { startingDamageLevel: 1 }
  },
  {
    id: "hp-1",
    name: "강화 슈트",
    description: "최대 체력 +18",
    cost: 25,
    prerequisites: ["root-core"],
    position: { x: 1500, y: 650 },
    effects: { maxHealth: 18 }
  },
  {
    id: "hp-2",
    name: "충격 흡수 장갑",
    description: "최대 체력 추가 +24",
    cost: 70,
    prerequisites: ["hp-1"],
    position: { x: 1800, y: 650 },
    effects: { maxHealth: 24 }
  },
  {
    id: "starting-vital-1",
    name: "생체 예열",
    description: "매 런 시작 시 생체 젤 레벨 +1",
    cost: 95,
    prerequisites: ["hp-2"],
    position: { x: 2100, y: 650 },
    effects: { startingHealthLevel: 1 }
  },
  {
    id: "pickup-1",
    name: "자석 센서",
    description: "경험치 결정 획득 범위 +30",
    cost: 25,
    prerequisites: ["root-core"],
    position: { x: 1200, y: 880 },
    effects: { pickupRange: 30 }
  },
  {
    id: "pickup-2",
    name: "광역 자력장",
    description: "경험치 결정 획득 범위 추가 +25",
    cost: 70,
    prerequisites: ["pickup-1"],
    position: { x: 900, y: 880 },
    effects: { pickupRange: 25 }
  },
  {
    id: "pierce-training-1",
    name: "관통 훈련",
    description: "모든 투사체 기본 관통 +1",
    cost: 90,
    prerequisites: ["pickup-2"],
    position: { x: 600, y: 880 },
    effects: { startingPierce: 1 }
  },
  {
    id: "core-harvester-1",
    name: "코어 수확기",
    description: "런 보상 코어 조각 +10%",
    cost: 30,
    prerequisites: ["root-core"],
    position: { x: 1200, y: 420 },
    effects: { rewardMultiplier: 0.1 }
  },
  {
    id: "reroll-1",
    name: "선택지 재배선",
    description: "런마다 스킬 선택지 새로고침 1회",
    cost: 40,
    prerequisites: ["core-harvester-1"],
    position: { x: 1500, y: 420 },
    effects: { rerolls: 1 }
  },
  {
    id: "core-harvester-2",
    name: "고밀도 회수",
    description: "런 보상 코어 조각 추가 +15%",
    cost: 85,
    prerequisites: ["core-harvester-1"],
    position: { x: 1200, y: 190 },
    effects: { rewardMultiplier: 0.15 }
  },
  {
    id: "reroll-2",
    name: "전술 재선택",
    description: "런마다 스킬 선택지 새로고침 추가 +1회",
    cost: 100,
    prerequisites: ["reroll-1", "core-harvester-2"],
    position: { x: 1500, y: 190 },
    effects: { rerolls: 1 }
  },
  {
    id: "unlock-fire-core",
    name: "화염 코어",
    description: "화염 스킬과 화염 시너지를 해금합니다.",
    cost: 50,
    prerequisites: ["damage-1"],
    position: { x: 900, y: 420 },
    effects: { unlockTags: ["fire"] }
  },
  {
    id: "unlock-ice-core",
    name: "냉각 코어",
    description: "얼음 스킬과 냉각 시너지를 해금합니다.",
    cost: 50,
    prerequisites: ["hp-1"],
    position: { x: 1500, y: 880 },
    effects: { unlockTags: ["ice"] }
  },
  {
    id: "unlock-drone-lab",
    name: "드론 연구소",
    description: "드론과 포탑 계열 스킬을 해금합니다.",
    cost: 55,
    prerequisites: ["pickup-1"],
    position: { x: 1200, y: 1110 },
    effects: { unlockTags: ["drone", "turret"] }
  },
  {
    id: "overclock-1",
    name: "오버클럭 루프",
    description: "공학 시너지의 화력이 증가합니다.",
    cost: 75,
    prerequisites: ["unlock-drone-lab"],
    position: { x: 1200, y: 1320 },
    effects: { engineeringBonus: 0.2 }
  }
];

export const SKILLS = [
  {
    id: "spark-shot",
    name: "스파크 탄",
    kind: "weapon",
    rarity: "common",
    tags: ["projectile", "electric"],
    description: "가까운 적에게 전기 탄환을 자동 발사합니다.",
    maxLevel: 5
  },
  {
    id: "chain-link",
    name: "연쇄 회로",
    kind: "modifier",
    rarity: "rare",
    tags: ["electric", "chain"],
    description: "전기 공격이 근처 적에게 튕겨 나갑니다.",
    maxLevel: 3
  },
  {
    id: "voltage-core",
    name: "전압 코어",
    kind: "passive",
    rarity: "epic",
    tags: ["electric", "damage"],
    description: "전기 압력과 무기 피해량을 높입니다.",
    maxLevel: 3
  },
  {
    id: "flame-flask",
    name: "화염 플라스크",
    kind: "weapon",
    rarity: "rare",
    tags: ["area", "fire"],
    description: "불타는 장판을 남기는 플라스크를 던집니다.",
    maxLevel: 5
  },
  {
    id: "heat-core",
    name: "열기 코어",
    kind: "passive",
    rarity: "epic",
    tags: ["fire", "damage"],
    description: "화염 효과가 더 오래 불타게 합니다.",
    maxLevel: 3,
    lockedBy: "unlock-fire-core"
  },
  {
    id: "ice-shard",
    name: "얼음 파편",
    kind: "weapon",
    rarity: "common",
    tags: ["projectile", "ice"],
    description: "적을 느리게 하는 분열 파편을 발사합니다.",
    maxLevel: 5
  },
  {
    id: "splitter",
    name: "분열 탄두",
    kind: "modifier",
    rarity: "rare",
    tags: ["projectile", "split"],
    description: "투사체 효과가 작은 파편으로 갈라집니다.",
    maxLevel: 3
  },
  {
    id: "piercer",
    name: "관통 침",
    kind: "modifier",
    rarity: "common",
    tags: ["projectile", "pierce"],
    description: "투사체가 더 많은 적을 꿰뚫고 지나갑니다.",
    maxLevel: 3
  },
  {
    id: "micro-drone",
    name: "마이크로 드론",
    kind: "weapon",
    rarity: "common",
    tags: ["drone", "summon"],
    description: "주위를 돌며 근처 적을 쏘는 드론을 호출합니다.",
    maxLevel: 5
  },
  {
    id: "pocket-turret",
    name: "포켓 포탑",
    kind: "weapon",
    rarity: "rare",
    tags: ["turret", "summon"],
    description: "일정 간격으로 임시 포탑을 설치합니다.",
    maxLevel: 5
  },
  {
    id: "toxic-vial",
    name: "독성 약병",
    kind: "weapon",
    rarity: "common",
    tags: ["poison", "projectile"],
    description: "명중한 적에게 독을 묻히는 약병을 던집니다.",
    maxLevel: 5
  },
  {
    id: "curse-sigil",
    name: "저주 인장",
    kind: "weapon",
    rarity: "rare",
    tags: ["curse", "debuff"],
    description: "적에게 저주 표식을 박아 받는 피해를 늘립니다.",
    maxLevel: 5
  },
  {
    id: "plague-bloom",
    name: "역병 꽃",
    kind: "weapon",
    rarity: "epic",
    tags: ["poison", "area"],
    description: "독 구름을 피워 범위 안의 적을 계속 중독시킵니다.",
    maxLevel: 4
  },
  {
    id: "void-orb",
    name: "공허 구체",
    kind: "weapon",
    rarity: "legendary",
    tags: ["curse", "projectile"],
    description: "저주를 흩뿌리는 거대한 공허 구체를 발사합니다.",
    maxLevel: 1
  },
  {
    id: "cooling-kit",
    name: "냉각 키트",
    kind: "passive",
    rarity: "rare",
    tags: ["cooldown", "engineering"],
    description: "무기 재사용 대기시간을 줄입니다.",
    maxLevel: 4
  },
  {
    id: "shield-belt",
    name: "보호막 벨트",
    kind: "passive",
    rarity: "rare",
    tags: ["defense", "shield"],
    description: "시간이 지나면 회복되는 피해 흡수막을 얻습니다.",
    maxLevel: 3
  },
  {
    id: "counter-coil",
    name: "반격 코일",
    kind: "modifier",
    rarity: "epic",
    tags: ["defense", "electric", "counter"],
    description: "피격 시 근처 적에게 전기 충격을 방출합니다.",
    maxLevel: 3
  },
  {
    id: "swift-boots",
    name: "기동 부츠",
    kind: "passive",
    rarity: "common",
    tags: ["speed"],
    description: "몰려드는 적 사이를 더 빠르게 빠져나갑니다.",
    maxLevel: 4
  },
  {
    id: "vital-gel",
    name: "생체 젤",
    kind: "passive",
    rarity: "common",
    tags: ["health"],
    description: "최대 체력과 회복력을 높입니다.",
    maxLevel: 4
  },
  {
    id: "venom-culture",
    name: "맹독 배양",
    kind: "modifier",
    rarity: "rare",
    tags: ["poison", "spread"],
    description: "중독된 적이 쓰러지면 근처 적에게 독이 옮겨갑니다.",
    maxLevel: 3
  },
  {
    id: "doom-mark",
    name: "파멸 표식",
    kind: "modifier",
    rarity: "epic",
    tags: ["curse", "burst"],
    description: "저주받은 적이 쓰러질 때 어두운 충격파를 터뜨립니다.",
    maxLevel: 3
  },
  {
    id: "soul-harvest",
    name: "영혼 수확",
    kind: "passive",
    rarity: "legendary",
    tags: ["curse", "growth"],
    description: "상태이상에 걸린 적을 처치하면 체력을 회복합니다.",
    maxLevel: 1
  },
  {
    id: "black-lotus",
    name: "검은 연꽃",
    kind: "modifier",
    rarity: "legendary",
    tags: ["poison", "growth"],
    description: "독 피해가 강해지고 전염 범위가 넓어집니다.",
    maxLevel: 1
  }
];

export const SYNERGIES = [
  {
    id: "chain-lightning",
    name: "연쇄 번개",
    description: "스파크 탄이 적들 사이를 잇는 추가 전류를 만듭니다.",
    requiredSkills: ["spark-shot", "chain-link", "voltage-core"],
    requiredNode: null,
    tags: ["electric"]
  },
  {
    id: "vortex-flame",
    name: "소용돌이 화염장",
    description: "화염 장판이 적을 중심으로 끌어당깁니다.",
    requiredSkills: ["flame-flask", "cooling-kit", "heat-core"],
    requiredNode: "unlock-fire-core",
    tags: ["fire", "area"]
  },
  {
    id: "crystal-storm",
    name: "결정 폭풍",
    description: "얼음 파편이 관통하며 부채꼴 파편으로 갈라집니다.",
    requiredSkills: ["ice-shard", "splitter", "piercer"],
    requiredNode: "unlock-ice-core",
    tags: ["ice", "projectile"]
  },
  {
    id: "storm-drone",
    name: "번개 드론",
    description: "드론이 스파크 탄과 연동해 전기 사슬을 발사합니다.",
    requiredSkills: ["micro-drone", "spark-shot", "chain-link"],
    requiredNode: "unlock-drone-lab",
    tags: ["drone", "electric"]
  },
  {
    id: "turret-grid",
    name: "포탑 격자망",
    description: "포탑의 사격 주기와 사거리가 강화됩니다.",
    requiredSkills: ["pocket-turret", "cooling-kit", "micro-drone"],
    requiredNode: "unlock-drone-lab",
    tags: ["turret", "engineering"]
  },
  {
    id: "tesla-shield",
    name: "테슬라 실드",
    description: "보호막이 피해를 받으면 근거리 전기 폭발을 일으킵니다.",
    requiredSkills: ["shield-belt", "counter-coil", "voltage-core"],
    requiredNode: null,
    tags: ["defense", "electric"]
  }
];

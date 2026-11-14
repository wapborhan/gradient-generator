const BACKGROUND_DATA = [
  // Original classic favorites enhanced
  {
    id: 1,
    name: "Midnight Indigo",
    category: "Dark",
    code: `linear-gradient(135deg, #2b5876 0%, #4e4376 100%)`,
  },
  {
    id: 2,
    name: "Cerulean Depths",
    category: "Ocean",
    code: `linear-gradient(90deg, #314755 0%, #26a0da 100%)`,
  },
  {
    id: 3,
    name: "Teal Horizon",
    category: "Ocean",
    code: `linear-gradient(90deg, #77a1d3 0%, #79cbca 51%, #77a1d3 100%)`,
  },
  {
    id: 4,
    name: "Cotton Candy",
    category: "Pastel",
    code: `linear-gradient(90deg, #ff6e7f 0%, #bfe9ff 51%, #ff6e7f 100%)`,
  },
  {
    id: 5,
    name: "Crimson Blaze",
    category: "Vibrant",
    code: `linear-gradient(90deg, #e52d27 0%, #b31217 51%, #e52d27 100%)`,
  },
  {
    id: 6,
    name: "Espresso Sand",
    category: "Dark",
    code: `linear-gradient(90deg, #603813 0%, #b29f94 51%, #603813 100%)`,
  },
  {
    id: 7,
    name: "Golden Emerald",
    category: "Vibrant",
    code: `linear-gradient(90deg, #16a085 0%, #f4d03f 51%, #16a085 100%)`,
  },
  {
    id: 8,
    name: "Ruby Passion",
    category: "Vibrant",
    code: `linear-gradient(90deg, #d31027 0%, #ea384d 51%, #d31027 100%)`,
  },
  {
    id: 9,
    name: "Sunny Meadows",
    category: "Pastel",
    code: `linear-gradient(90deg, #ede574 0%, #e1f5c4 51%, #ede574 100%)`,
  },
  {
    id: 10,
    name: "Cyan Glow",
    category: "Ocean",
    code: `linear-gradient(90deg, #02aab0 0%, #00cdac 51%, #02aab0 100%)`,
  },
  {
    id: 11,
    name: "Electric Violet",
    category: "Neon",
    code: `linear-gradient(90deg, #da22ff 0%, #9733ee 51%, #da22ff 100%)`,
  },
  {
    id: 12,
    name: "Forest Mist",
    category: "Ocean",
    code: `linear-gradient(90deg, #348f50 0%, #56b4d3 51%, #348f50 100%)`,
  },
  {
    id: 13,
    name: "Olive Moss",
    category: "Vibrant",
    code: `linear-gradient(90deg, #3ca55c 0%, #b5ac49 51%, #3ca55c 100%)`,
  },
  {
    id: 14,
    name: "Desert Lilac",
    category: "Pastel",
    code: `linear-gradient(90deg, #cc95c0 0%, #dbd4b4 51%, #cc95c0 100%)`,
  },
  {
    id: 15,
    name: "Deep Marine",
    category: "Ocean",
    code: `linear-gradient(90deg, #003973 0%, #e5e5be 51%, #003973 100%)`,
  },
  {
    id: 16,
    name: "Berry Lagoon",
    category: "Sunset",
    code: `linear-gradient(90deg, #e55d87 0%, #5fc3e4 51%, #e55d87 100%)`,
  },
  {
    id: 17,
    name: "Obsidian Shimmer",
    category: "Dark",
    code: `linear-gradient(90deg, #403b4a 0%, #e7e9bb 51%, #403b4a 100%)`,
  },
  {
    id: 18,
    name: "Amber Sunset",
    category: "Sunset",
    code: `linear-gradient(90deg, #f09819 0%, #edde5d 51%, #f09819 100%)`,
  },
  {
    id: 19,
    name: "Blood Orange",
    category: "Sunset",
    code: `linear-gradient(90deg, #ff512f 0%, #dd2476 51%, #ff512f 100%)`,
  },
  {
    id: 20,
    name: "Royal Plum",
    category: "Dark",
    code: `linear-gradient(90deg, #aa076b 0%, #61045f 51%, #aa076b 100%)`,
  },
  {
    id: 21,
    name: "Aqua Marine",
    category: "Ocean",
    code: `linear-gradient(90deg, #1a2980 0%, #26d0ce 51%, #1a2980 100%)`,
  },
  {
    id: 22,
    name: "Solar Flare",
    category: "Sunset",
    code: `linear-gradient(90deg, #ff512f 0%, #f09819 51%, #ff512f 100%)`,
  },
  {
    id: 23,
    name: "Twilight Rose",
    category: "Pastel",
    code: `linear-gradient(90deg, #1d2b64 0%, #f8cdda 51%, #1d2b64 100%)`,
  },
  {
    id: 24,
    name: "Sky High",
    category: "Ocean",
    code: `linear-gradient(90deg, #1fa2ff 0%, #12d8fa 51%, #1fa2ff 100%)`,
  },
  {
    id: 25,
    name: "Maldives Aqua",
    category: "Ocean",
    code: `linear-gradient(90deg, #4cb8c4 0%, #3cd3ad 51%, #4cb8c4 100%)`,
  },
  {
    id: 26,
    name: "Peach Blossom",
    category: "Pastel",
    code: `linear-gradient(90deg, #dd5e89 0%, #f7bb97 51%, #dd5e89 100%)`,
  },
  {
    id: 27,
    name: "Cherry Bomb",
    category: "Vibrant",
    code: `linear-gradient(90deg, #eb3349 0%, #ff7963 51%, #eb3349 100%)`,
  },
  // V2 Modern Additions
  {
    id: 28,
    name: "Cyberpunk 2077",
    category: "Neon",
    code: `linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #6b11ff 100%)`,
  },
  {
    id: 29,
    name: "Aurora Borealis",
    category: "Neon",
    code: `linear-gradient(135deg, #0575e6 0%, #00f260 100%)`,
  },
  {
    id: 30,
    name: "Galactic Void",
    category: "Dark",
    code: `linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)`,
  },
  {
    id: 31,
    name: "California Dreamin'",
    category: "Sunset",
    code: `linear-gradient(135deg, #f12711 0%, #f5af19 100%)`,
  },
  {
    id: 32,
    name: "Hyper Violet",
    category: "Neon",
    code: `linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)`,
  },
  {
    id: 33,
    name: "Ethereal Glass",
    category: "Pastel",
    code: `linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)`,
  },
  {
    id: 34,
    name: "Mojito Lime",
    category: "Vibrant",
    code: `linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`,
  },
  {
    id: 35,
    name: "Vampire Velvet",
    category: "Dark",
    code: `linear-gradient(135deg, #200122 0%, #6f0000 100%)`,
  },
  {
    id: 36,
    name: "Sublime Radiance",
    category: "Sunset",
    code: `linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)`,
  }
];

export default BACKGROUND_DATA;


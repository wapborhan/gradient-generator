const HOVER_BUTTON = [
  {
    id: 1,
    name: "Cosmic Indigo",
    text: "Explore Space",
    category: "Dark",
    style: "glow",
    code: `linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)`,
    tailwind: "bg-gradient-to-r from-[#2b5876] via-[#4e4376] to-[#2b5876]"
  },
  {
    id: 2,
    name: "Aqua Velocity",
    text: "Get Started",
    category: "Ocean",
    style: "shine",
    code: `linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%)`,
    tailwind: "bg-gradient-to-r from-[#314755] via-[#26a0da] to-[#314755]"
  },
  {
    id: 3,
    name: "Turquoise Wave",
    text: "Download App",
    category: "Ocean",
    style: "glow",
    code: `linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%)`,
    tailwind: "bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#77a1d3]"
  },
  {
    id: 4,
    name: "Cotton Breeze",
    text: "Try Free",
    category: "Pastel",
    style: "pill",
    code: `linear-gradient(to right, #ff6e7f 0%, #bfe9ff 51%, #ff6e7f 100%)`,
    tailwind: "bg-gradient-to-r from-[#ff6e7f] via-[#bfe9ff] to-[#ff6e7f]"
  },
  {
    id: 5,
    name: "Fiery Crimson",
    text: "Upgrade Pro",
    category: "Vibrant",
    style: "glow",
    code: `linear-gradient(to right, #e52d27 0%, #b31217 51%, #e52d27 100%)`,
    tailwind: "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27]"
  },
  {
    id: 6,
    name: "Espresso Bronze",
    text: "Learn More",
    category: "Dark",
    style: "lift",
    code: `linear-gradient(to right, #603813 0%, #b29f94 51%, #603813 100%)`,
    tailwind: "bg-gradient-to-r from-[#603813] via-[#b29f94] to-[#603813]"
  },
  {
    id: 7,
    name: "Golden Sun",
    text: "Claim Reward",
    category: "Vibrant",
    style: "glow",
    code: `linear-gradient(to right, #16a085 0%, #f4d03f 51%, #16a085 100%)`,
    tailwind: "bg-gradient-to-r from-[#16a085] via-[#f4d03f] to-[#16a085]"
  },
  {
    id: 8,
    name: "Ruby Flame",
    text: "Buy Now",
    category: "Vibrant",
    style: "glow",
    code: `linear-gradient(to right, #d31027 0%, #ea384d 51%, #d31027 100%)`,
    tailwind: "bg-gradient-to-r from-[#d31027] via-[#ea384d] to-[#d31027]"
  },
  {
    id: 9,
    name: "Lemon Mint",
    text: "Discover",
    category: "Pastel",
    style: "lift",
    code: `linear-gradient(to right, #ede574 0%, #e1f5c4 51%, #ede574 100%)`,
    tailwind: "bg-gradient-to-r from-[#ede574] via-[#e1f5c4] to-[#ede574]"
  },
  {
    id: 10,
    name: "Neon Teal",
    text: "Activate",
    category: "Ocean",
    style: "glow",
    code: `linear-gradient(to right, #02aab0 0%, #00cdac 51%, #02aab0 100%)`,
    tailwind: "bg-gradient-to-r from-[#02aab0] via-[#00cdac] to-[#02aab0]"
  },
  {
    id: 11,
    name: "Cyber Violet",
    text: "Join VIP",
    category: "Neon",
    style: "shine",
    code: `linear-gradient(to right, #da22ff 0%, #9733ee 51%, #da22ff 100%)`,
    tailwind: "bg-gradient-to-r from-[#da22ff] via-[#9733ee] to-[#da22ff]"
  },
  {
    id: 12,
    name: "Amazon Canopy",
    text: "Start Trial",
    category: "Ocean",
    style: "lift",
    code: `linear-gradient(to right, #348f50 0%, #56b4d3 51%, #348f50 100%)`,
    tailwind: "bg-gradient-to-r from-[#348f50] via-[#56b4d3] to-[#348f50]"
  },
  {
    id: 13,
    name: "Olive Gold",
    text: "Book Demo",
    category: "Vibrant",
    style: "pill",
    code: `linear-gradient(to right, #3ca55c 0%, #b5ac49 51%, #3ca55c 100%)`,
    tailwind: "bg-gradient-to-r from-[#3ca55c] via-[#b5ac49] to-[#3ca55c]"
  },
  {
    id: 14,
    name: "Mauve Sunset",
    text: "View Gallery",
    category: "Pastel",
    style: "glow",
    code: `linear-gradient(to right, #cc95c0 0%, #dbd4b4 51%, #cc95c0 100%)`,
    tailwind: "bg-gradient-to-r from-[#cc95c0] via-[#dbd4b4] to-[#cc95c0]"
  },
  {
    id: 15,
    name: "Navy Vanilla",
    text: "Documentation",
    category: "Ocean",
    style: "lift",
    code: `linear-gradient(to right, #003973 0%, #e5e5be 51%, #003973 100%)`,
    tailwind: "bg-gradient-to-r from-[#003973] via-[#e5e5be] to-[#003973]"
  },
  {
    id: 16,
    name: "Bubblegum Splash",
    text: "Subscribe",
    category: "Sunset",
    style: "glow",
    code: `linear-gradient(to right, #e55d87 0%, #5fc3e4 51%, #e55d87 100%)`,
    tailwind: "bg-gradient-to-r from-[#e55d87] via-[#5fc3e4] to-[#e55d87]"
  },
  {
    id: 17,
    name: "Dark Carbon",
    text: "Deploy Now",
    category: "Dark",
    style: "shine",
    code: `linear-gradient(to right, #403b4a 0%, #e7e9bb 51%, #403b4a 100%)`,
    tailwind: "bg-gradient-to-r from-[#403b4a] via-[#e7e9bb] to-[#403b4a]"
  },
  {
    id: 18,
    name: "Marigold Sun",
    text: "View Pricing",
    category: "Sunset",
    style: "glow",
    code: `linear-gradient(to right, #f09819 0%, #edde5d 51%, #f09819 100%)`,
    tailwind: "bg-gradient-to-r from-[#f09819] via-[#edde5d] to-[#f09819]"
  },
  {
    id: 19,
    name: "Electric Magenta",
    text: "Sign Up Free",
    category: "Sunset",
    style: "glow",
    code: `linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100%)`,
    tailwind: "bg-gradient-to-r from-[#ff512f] via-[#dd2476] to-[#ff512f]"
  },
  {
    id: 20,
    name: "Orchid Velvet",
    text: "Unlock All",
    category: "Dark",
    style: "glow",
    code: `linear-gradient(to right, #aa076b 0%, #61045f 51%, #aa076b 100%)`,
    tailwind: "bg-gradient-to-r from-[#aa076b] via-[#61045f] to-[#aa076b]"
  },
  {
    id: 21,
    name: "Deep Pacific",
    text: "Explore",
    category: "Ocean",
    style: "shine",
    code: `linear-gradient(to right, #1a2980 0%, #26d0ce 51%, #1a2980 100%)`,
    tailwind: "bg-gradient-to-r from-[#1a2980] via-[#26d0ce] to-[#1a2980]"
  },
  {
    id: 22,
    name: "Blazing Tangerine",
    text: "Launch App",
    category: "Sunset",
    style: "glow",
    code: `linear-gradient(to right, #ff512f 0%, #f09819 51%, #ff512f 100%)`,
    tailwind: "bg-gradient-to-r from-[#ff512f] via-[#f09819] to-[#ff512f]"
  },
  {
    id: 23,
    name: "Royal Rose",
    text: "Install Extension",
    category: "Pastel",
    style: "pill",
    code: `linear-gradient(to right, #1d2b64 0%, #f8cdda 51%, #1d2b64 100%)`,
    tailwind: "bg-gradient-to-r from-[#1d2b64] via-[#f8cdda] to-[#1d2b64]"
  },
  {
    id: 24,
    name: "Skyline Azure",
    text: "Get In Touch",
    category: "Ocean",
    style: "glow",
    code: `linear-gradient(to right, #1fa2ff 0%, #12d8fa 51%, #1fa2ff 100%)`,
    tailwind: "bg-gradient-to-r from-[#1fa2ff] via-[#12d8fa] to-[#1fa2ff]"
  },
  {
    id: 25,
    name: "Emerald Isle",
    text: "Start Creating",
    category: "Ocean",
    style: "shine",
    code: `linear-gradient(to right, #4cb8c4 0%, #3cd3ad 51%, #4cb8c4 100%)`,
    tailwind: "bg-gradient-to-r from-[#4cb8c4] via-[#3cd3ad] to-[#4cb8c4]"
  },
  {
    id: 26,
    name: "Pink Champagne",
    text: "Watch Video",
    category: "Pastel",
    style: "lift",
    code: `linear-gradient(to right, #dd5e89 0%, #f7bb97 51%, #dd5e89 100%)`,
    tailwind: "bg-gradient-to-r from-[#dd5e89] via-[#f7bb97] to-[#dd5e89]"
  },
  {
    id: 27,
    name: "Firecracker",
    text: "Instant Access",
    category: "Vibrant",
    style: "glow",
    code: `linear-gradient(to right, #eb3349 0%, #ff7963 51%, #eb3349 100%)`,
    tailwind: "bg-gradient-to-r from-[#eb3349] via-[#ff7963] to-[#eb3349]"
  },
  {
    id: 28,
    name: "Mint Emerald",
    text: "Create Free Account",
    category: "Ocean",
    style: "shine",
    code: `linear-gradient(to right, #1d976c 0%, #93f9b9 51%, #1d976c 100%)`,
    tailwind: "bg-gradient-to-r from-[#1d976c] via-[#93f9b9] to-[#1d976c]"
  }
];

export default HOVER_BUTTON;


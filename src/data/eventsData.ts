import dataverseLogo from '../assets/images/logo_dataverse_1788549411571.jpg';
import vizmindsLogo from '../assets/images/logo_vizminds_1788549433316.jpg';
import survivalLogo from '../assets/images/logo_survival_showdown_1788549451061.jpg';
import gameOfBidsLogo from '../assets/images/logo_game_of_bids_1788549469054.jpg';
import foundersWildLogo from '../assets/images/logo_founders_wild_1788597820429.jpg';
import snehaPoster from '../assets/images/coordinator_sneha_agrawal.png';
import ananyaPoster from '../assets/images/coordinator_ananya_pathak.png';
import vedangPoster from '../assets/images/coordinator_vedang_pathak.png';
import atharvaPoster from '../assets/images/coordinator_atharva_andhare.png';
import alanPoster from '../assets/images/coordinator_alan_biju.png';
import fallgoonPoster from '../assets/images/coordinator_fallgoon.png';
import manthanPoster from '../assets/images/coordinator_manthan_udasi.png';
import vedPoster from '../assets/images/coordinator_ved_nair.png';
import sarthakPoster from '../assets/images/coordinator_sarthak_pande.png';
import stephenPoster from '../assets/images/coordinator_stephen_dhanvajir.png';

export interface Coordinator {
  name: string;
  role: 'Event Coordinator' | 'Event Co-coordinator' | 'Coordinator' | 'Co-coordinator';
  phone: string;
  image?: string;
}

export interface PricingOption {
  type: 'Solo' | 'Duo' | 'Trio' | 'Team (2-4)' | 'Team (3-5)' | string;
  price: number;
  label: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'data' | 'gaming' | 'strategy' | 'startup';
  categoryLabel: string;
  date: string;
  prizePool: string;
  numericPrize: number;
  image: string;
  description: string;
  whyJoin: string[];
  takeaways?: string[];
  highlights?: string[];
  workshopInfo?: string;
  format?: string;
  pricing: PricingOption[];
  coordinators: Coordinator[];
  registerUrl: string;
  mythologicalArchetype: string;
  color: {
    accent: string;
    border: string;
    glow: string;
    badgeBg: string;
    textAccent: string;
  };
}

export const FEST_DATA = {
  name: 'DataDive 5.0',
  theme: 'The Odyssey',
  themeSubtitle: 'Ancient Greek Mythology Fused With Futuristic Space Exploration',
  department: 'Department of Computer Science & Engineering (Data Science)',
  date: '10th September 2026',
  venue: 'Campus Tech Complex & Data Laboratories',
  totalPrizePool: '₹15,000+',
  totalEvents: '5 Flagship Arenas',
  edition: 'Edition 5.0',
};

export const EVENTS: EventItem[] = [
  {
    id: 'dataverse',
    title: 'DATAVERSE 5.0',
    subtitle: 'From Raw Data to Real Insights!',
    tagline: 'Where Data Meets Logic, Accuracy & Creativity',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    date: '10th September 2026',
    prizePool: '₹3,000',
    numericPrize: 3000,
    image: dataverseLogo,
    mythologicalArchetype: 'The Trial of Daedalus & The Data Labyrinth',
    description:
      'Data is everywhere, but raw data alone tells us nothing. Transform raw data into real insights with DataVerse 5.0 — completely beginner-friendly, no coding required!',
    whyJoin: [
      'Solve fun puzzles and brain teasers with a data quiz',
      'Work with real, messy data and learn how to make sense of it',
      'Learn simple tricks to sort and filter information',
      'Understand how to clean up messy data step-by-step',
      'Turn boring numbers into easy-to-read charts and graphs',
      'Get a taste of how Machine Learning works, even as a beginner',
      'Compete to solve problems accurately and win prizes',
    ],
    workshopInfo:
      'Details will be announced shortly — stay tuned for pre-event sessions to help you sharpen your skills before the main challenge.',
    pricing: [
      { type: 'Solo', price: 80, label: 'Solo Adventurer' },
      { type: 'Duo', price: 120, label: 'Duo Alliance' },
      { type: 'Trio', price: 150, label: 'Trio Vanguard' },
    ],
    coordinators: [
      { name: 'Sneha Agrawal', role: 'Event Coordinator', phone: '8080550340', image: snehaPoster },
      { name: 'Ananya Pathak', role: 'Event Co-coordinator', phone: '8275372331', image: ananyaPoster },
    ],
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf7UOYZxnSZ-c6XOj8Fy8Cti3-qYRz8iiFgZ6IlTX6dRoS9VQ/viewform?usp=dialog',
    color: {
      accent: 'from-amber-500 to-yellow-600',
      border: 'border-amber-500/30 hover:border-amber-400',
      glow: 'shadow-amber-500/20',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      textAccent: 'text-amber-400',
    },
  },
  {
    id: 'vizminds',
    title: 'VizMinds 3.0',
    subtitle: 'From Raw Data to Real Decisions',
    tagline: 'Where Data Stops Being Just Numbers, and Starts Becoming Decisions',
    category: 'data',
    categoryLabel: 'Power BI & Intelligence',
    date: '10th September 2026',
    prizePool: 'Upto ₹3,000',
    numericPrize: 3000,
    image: vizmindsLogo,
    mythologicalArchetype: "The Oracle of Apollo's Executive Vision",
    description:
      'Transform raw numbers into executive decision dashboards with Power BI! No prior coding required — just creative thinking and analytical vision.',
    whyJoin: [
      'Learn to transform raw, messy data into impactful, executive-level dashboards',
      'No coding or technical background required — only creativity and logical thinking',
      'A dedicated pre-event workshop ensures beginners are fully prepared',
      'Compete in a fair, two-stage format that rewards genuine skill',
      'Gain hands-on, in-demand experience with Power BI and data visualization',
      'Receive a certificate of participation, regardless of the outcome',
    ],
    workshopInfo:
      'Hands-on training on Power BI fundamentals, data cleaning, and executive dashboard design before the event.',
    pricing: [
      { type: 'Solo', price: 80, label: 'Solo Analyst' },
      { type: 'Duo', price: 120, label: 'Duo Insight Team' },
      { type: 'Trio', price: 150, label: 'Trio Executive Board' },
    ],
    coordinators: [
      { name: 'Vedang Pathak', role: 'Event Coordinator', phone: '9540494095', image: vedangPoster },
      { name: 'Atharva Andhare', role: 'Event Co-coordinator', phone: '8446321781', image: atharvaPoster },
    ],
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf6gOKzb7tomvNfGi-ImY3ghqsHbuCwwPLvQia0cIzqj962Og/viewform?usp=dialog',
    color: {
      accent: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      glow: 'shadow-cyan-500/20',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      textAccent: 'text-cyan-400',
    },
  },
  {
    id: 'survival-showdown',
    title: 'SURVIVAL SHOWDOWN 2.0',
    subtitle: 'Survive Together. Fight Together. Become the Top Dog.',
    tagline: 'Colosseum of the Titans — WWE 2K26 Championship',
    category: 'gaming',
    categoryLabel: 'WWE 2K26 Esports',
    date: '10th September 2026',
    prizePool: '₹1,500',
    numericPrize: 1500,
    image: survivalLogo,
    mythologicalArchetype: 'The Spartan Arena of Ares & Hercules',
    description:
      'Enter the WWE 2K26 arena with your partner for high-octane tag team action! Battle through brutal knockout rounds to claim the title of Top Dog.',
    whyJoin: [
      'High-octane WWE 2K26 duos gameplay on big-screen rigs',
      'Thrilling knockout tournament format with live commentary',
      'Showcase your teamwork, tag-team combos, strategy & in-ring skills',
      'Win exciting cash prizes + ultimate bragging rights',
      'Connect with fellow gamers in an electrifying crowd atmosphere',
    ],
    format: 'Duo Team Tournament | Knockout Format | Grand Finale — 2 Teams Battle for Glory!',
    pricing: [
      { type: 'Solo', price: 50, label: 'Solo Contender' },
      { type: 'Duo', price: 100, label: 'Tag Team Duo' },
    ],
    coordinators: [
      { name: 'Alan K Biju', role: 'Event Coordinator', phone: '9643728841', image: alanPoster },
      { name: 'Fallgoon Motghare', role: 'Event Co-coordinator', phone: '9022915399', image: fallgoonPoster },
    ],
    registerUrl: 'https://forms.gle/MCvDKne2eYeYivBz6',
    color: {
      accent: 'from-red-600 to-rose-700',
      border: 'border-red-500/30 hover:border-red-400',
      glow: 'shadow-red-500/20',
      badgeBg: 'bg-red-500/10 text-red-300 border-red-500/30',
      textAccent: 'text-red-400',
    },
  },
  {
    id: 'game-of-bids',
    title: 'GAME OF BIDS 2026',
    subtitle: 'The Ultimate IPL Auction Experience',
    tagline: 'Manage Your ₹80 Crore Purse & Build Your Dream Playing XI',
    category: 'strategy',
    categoryLabel: 'IPL Auction & Strategy',
    date: '10th September 2026',
    prizePool: 'Upto ₹4,000',
    numericPrize: 4000,
    image: gameOfBidsLogo,
    mythologicalArchetype: "The Council of Olympus & Hermes' Merchant Gavel",
    description:
      'Experience the high-stakes thrill of a live IPL auction! Manage a ₹80 Crore purse, outsmart rival franchises, and build your championship Playing XI.',
    whyJoin: [
      'Experience the IPL Auction First-Hand – Feel the adrenaline of live bidding & last-second paddle raises',
      'Build Your Dream XI – Draft marquee players, overseas stars, and budget anchors',
      'Battle Against Rival Franchises – Outsmart opponents, trigger bidding traps, and secure your targets',
      'Test Your Cricket Instincts – Blend analytical stats with instinct under ticking clocks',
    ],
    takeaways: [
      'Sharpen Decision-Making under high-stake pressure',
      'Master Budget Management: make every Crore count',
      'Develop Team Strategy with co-franchise owners',
      'Create Unforgettable Memories at the auction table',
    ],
    pricing: [{ type: 'Team (2-4)', price: 200, label: 'Franchise Table (2-4 Members)' }],
    coordinators: [
      { name: 'Manthan Udasi', role: 'Event Coordinator', phone: '9302294096', image: manthanPoster },
      { name: 'Ved Nair', role: 'Event Co-coordinator', phone: '9307678510', image: vedPoster },
    ],
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf23nPsZzyjIz3qmb9YI8LDc3Xv_WldMmVQ5oX7PIPM6YygQQ/viewform?usp=dialog',
    color: {
      accent: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      glow: 'shadow-emerald-500/20',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      textAccent: 'text-emerald-400',
    },
  },
  {
    id: 'founders-gone-wild',
    title: 'FOUNDERS GONE WILD 🎪✨',
    subtitle: 'Where Ridiculous Ideas Become Brilliant!',
    tagline: 'You don’t bring an idea. You earn it.',
    category: 'startup',
    categoryLabel: 'Startup Circus & Ideation',
    date: '10th September 2026',
    prizePool: 'Upto ₹3,000',
    numericPrize: 3000,
    image: foundersWildLogo,
    mythologicalArchetype: 'The Argonauts & The Wildcard Oracle of Innovation',
    description:
      "You don’t bring an idea — you earn it! Combine wild concept cards, build an absurdly brilliant startup pitch with AI tools, and wow the judges.",
    whyJoin: [
      'No two ideas are the same — limitless wild and brilliant combinations',
      'Fast, interactive & crazy fun gamified challenge format',
      'AI tools allowed — use generative AI to brainstorm, build, and soft launch!',
      'Quiz to earn points & shop for game-changing wildcard cards',
      'Prize pool up to ₹3,000 + official verified certificates for all participants',
    ],
    highlights: [
      'Quiz to earn points & venture tokens',
      'Shop for random serious + absurd cards',
      'Combine wild pairs (AI + Banana 🍌, Cybersecurity + Rubber Duck 🦆)',
      'Build it, pitch it, soft launch it live (Min. 3 cards to advance)',
    ],
    pricing: [
      { type: 'Duo', price: 100, label: 'Duo Team (2 Members)' },
      { type: 'Team (3-5)', price: 150, label: 'Squad Team (3–5 Members)' },
    ],
    coordinators: [
      { name: 'Sarthak Pande', role: 'Event Coordinator', phone: '9977744879', image: sarthakPoster },
      { name: 'Stephen Dhanvajir', role: 'Event Co-coordinator', phone: '7768820280', image: stephenPoster },
    ],
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform?usp=dialog',
    color: {
      accent: 'from-purple-600 via-fuchsia-600 to-amber-500',
      border: 'border-purple-500/30 hover:border-purple-400',
      glow: 'shadow-purple-500/20',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      textAccent: 'text-purple-400',
    },
  },
];

export const ODYSSEY_STAGES = [
  {
    stage: 1,
    code: 'STAGE 01 // 00:00',
    title: 'The Spartan Ember',
    subtitle: 'Where Raw Will Meets the Hearth of Ares',
    description: 'In the volcanic forge of ancient Troy, the warrior stands armed with iron, awaiting the spark of knowledge.',
    mythicSymbol: 'Ω',
  },
  {
    stage: 2,
    code: 'STAGE 02 // 00:01',
    title: 'Breach of the Cosmic Rift',
    subtitle: 'Shattering the Veil Between Time & Space',
    description: 'A blade strike tears the fabric of reality. Celestial stardust floods the ruined temples as an interdimensional portal ignites.',
    mythicSymbol: 'Δ',
  },
  {
    stage: 3,
    code: 'STAGE 03 // 00:02',
    title: 'The Stargate Archway',
    subtitle: 'Monument of the Ancient Astral Architects',
    description: 'Suspended in the stellar void, the monumental Greek archway stands guardian over the swirling cosmic nebulas.',
    mythicSymbol: 'Ψ',
  },
  {
    stage: 4,
    code: 'STAGE 04 // 00:03 - 00:04',
    title: 'The Oracle’s Astrolabe',
    subtitle: 'Golden Constellation Runes of Destiny',
    description: 'Sacred geometric runes and zodiac glyphs illuminate the cosmic vortex, encoding the algorithms of the universe.',
    mythicSymbol: 'Σ',
  },
  {
    stage: 5,
    code: 'STAGE 05 // 00:05 - 00:06',
    title: 'The Cyber Nexus of Ithaca',
    subtitle: 'Emergence into DataDive 5.0',
    description: 'The journey culminates at the futuristic cyber nexus, orbiting the eternal golden star of data intelligence.',
    mythicSymbol: 'Φ',
  },
];

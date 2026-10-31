import { DeviceProfile, NetworkProfile } from '../types';

export const DEVICE_PROFILES: DeviceProfile[] = [
  {
    id: 'jiophone-next',
    name: 'JioPhone Next',
    brand: 'Reliance Jio / Google',
    chipset: 'Unisoc QM215 / SC9863A (28nm)',
    ram: '2GB LPDDR3',
    ramMb: 2048,
    screen: '360x720 css (720x1440 physical)',
    screenWidth: 360,
    screenHeight: 720,
    os: 'Pragati OS (Android 11 Go)',
    cpuThrottlingMultiplier: 6.0,
    marketShareIndiaPct: 18.5,
    priceSegment: '₹4,499 - ₹6,499',
    popularIn: 'Tier-2 & Tier-3 Cities, Rural India'
  },
  {
    id: 'redmi-9a',
    name: 'Xiaomi Redmi 9A / 9A Sport',
    brand: 'Xiaomi',
    chipset: 'MediaTek Helio G25 (12nm)',
    ram: '2GB LPDDR4X',
    ramMb: 2048,
    screen: '360x800 css (720x1600 physical)',
    screenWidth: 360,
    screenHeight: 800,
    os: 'MIUI 12.5 (Android 10/11)',
    cpuThrottlingMultiplier: 4.8,
    marketShareIndiaPct: 24.2,
    priceSegment: '₹6,999 - ₹7,999',
    popularIn: 'Semi-Urban, College Students, Gig Workers'
  },
  {
    id: 'realme-c20',
    name: 'Realme C20 / C11',
    brand: 'Realme',
    chipset: 'MediaTek Helio G35 (12nm)',
    ram: '2GB LPDDR4X',
    ramMb: 2048,
    screen: '360x800 css (720x1600 physical)',
    screenWidth: 360,
    screenHeight: 800,
    os: 'Realme UI Go Edition',
    cpuThrottlingMultiplier: 4.5,
    marketShareIndiaPct: 14.8,
    priceSegment: '₹7,499',
    popularIn: 'Tier-2 Towns & First-Time Buyers'
  },
  {
    id: 'ultra-budget-go',
    name: 'Ultra-Budget 1GB Android Go',
    brand: 'Itel / Lava / Karbonn',
    chipset: 'Unisoc SC7731E (Quad-Core 1.3GHz)',
    ram: '1GB LPDDR3',
    ramMb: 1024,
    screen: '320x534 css (480x800 physical)',
    screenWidth: 320,
    screenHeight: 534,
    os: 'Android 10 Go Edition',
    cpuThrottlingMultiplier: 7.5,
    marketShareIndiaPct: 12.3,
    priceSegment: '₹2,999 - ₹4,499',
    popularIn: 'Rural India & Feature Phone Upgraders'
  },
  {
    id: 'samsung-m02',
    name: 'Samsung Galaxy M02',
    brand: 'Samsung',
    chipset: 'MediaTek MT6739W (Quad-Core 1.5GHz)',
    ram: '2GB RAM',
    ramMb: 2048,
    screen: '360x760 css (720x1520 physical)',
    screenWidth: 360,
    screenHeight: 760,
    os: 'One UI Core (Android 10)',
    cpuThrottlingMultiplier: 5.2,
    marketShareIndiaPct: 11.4,
    priceSegment: '₹6,999',
    popularIn: 'Tier-1 & Tier-2 Budget Segment'
  },
  {
    id: 'legacy-webview',
    name: 'Legacy Android 9 (Chrome 81 WebView)',
    brand: 'Generic Older Smartphone',
    chipset: 'Snapdragon 425 / 430',
    ram: '2GB RAM',
    ramMb: 2048,
    screen: '360x640 css (720x1280 physical)',
    screenWidth: 360,
    screenHeight: 640,
    os: 'Android 9.0 Pie (Outdated System WebView)',
    cpuThrottlingMultiplier: 6.5,
    marketShareIndiaPct: 8.7,
    priceSegment: 'Older Devices (2018-2020)',
    popularIn: 'Secondary Handsets, Low-Income Households'
  }
];

export const NETWORK_PROFILES: NetworkProfile[] = [
  {
    id: 'slow-2g',
    name: 'Slow 2G (Edge)',
    technology: '2.5G EDGE',
    speed: '56 kbps',
    speedKbps: 56,
    rtt: 1850,
    packetLoss: 14.5,
    description: 'Minimal cellular signal in basements, moving trains, and remote village tracts across Uttar Pradesh, Bihar, and Rajasthan.',
    typicalLocation: 'Rural corridors & indoor dead zones'
  },
  {
    id: 'rural-3g',
    name: 'Tier-3 Rural 3G (HSPA)',
    technology: '3.5G HSPA+',
    speed: '450 kbps',
    speedKbps: 450,
    rtt: 780,
    packetLoss: 6.2,
    description: 'Common in rural mandis, small agricultural hubs, and suburban rail lines.',
    typicalLocation: 'Tier-3 towns & peripheral districts'
  },
  {
    id: 'congested-4g',
    name: 'Congested 4G (Peak Hours)',
    technology: 'LTE Band 3/5/40',
    speed: '1.2 Mbps',
    speedKbps: 1200,
    rtt: 420,
    packetLoss: 4.8,
    description: 'High tower subscriber saturation during 7 PM - 11 PM in crowded metro markets (Delhi Chandni Chowk, Mumbai Dadar).',
    typicalLocation: 'Densely populated Indian cities'
  },
  {
    id: 'unstable-metro',
    name: 'Unstable 4G (High Jitter)',
    technology: 'Cellular Rapid Handover',
    speed: '800 kbps',
    speedKbps: 800,
    rtt: 650,
    packetLoss: 9.5,
    description: 'Rapid cell-tower jumping with heavy packet loss during metro bus/auto-rickshaw commute.',
    typicalLocation: 'Daily commuters across Bengaluru, Pune, Hyderabad'
  },
  {
    id: 'fup-throttled',
    name: 'FUP Throttled (128 kbps)',
    technology: 'Fair Usage Policy Throttle',
    speed: '128 kbps',
    speedKbps: 128,
    rtt: 1200,
    packetLoss: 5.0,
    description: 'Post 1.5GB/day limit throttle enforced by Jio and Airtel on prepaid packs.',
    typicalLocation: 'Over 40% of Indian mobile users past 8 PM'
  }
];

export const SAMPLE_TARGETS = [
  {
    name: 'Fast E-Commerce (Flipkart Lite)',
    url: 'https://m.flipkart.com',
    category: 'E-Commerce',
    hint: 'Optimized PWA for low bandwidth'
  },
  {
    name: 'Indian Railways (IRCTC Mobile)',
    url: 'https://irctc.co.in',
    category: 'Govt Services',
    hint: 'High-traffic ticketing portal with strict timeouts'
  },
  {
    name: 'Quick Commerce (Zepto)',
    url: 'https://zeptonow.com',
    category: 'Quick Commerce',
    hint: 'Rich product catalogs & real-time delivery tracking'
  },
  {
    name: 'CoWIN Portal',
    url: 'https://cowin.gov.in',
    category: 'Govt Portal',
    hint: 'Mass-scale public health registration platform'
  },
  {
    name: 'Zerodha Kite Trading',
    url: 'https://kite.zerodha.com',
    category: 'Fintech',
    hint: 'Low-latency financial charts and instant order placement'
  },
  {
    name: 'Wikipedia Mobile',
    url: 'https://en.m.wikipedia.org',
    category: 'Information',
    hint: 'Lightweight static HTML benchmark'
  }
];

export const INDIAN_ECOSYSTEM_STATS = [
  {
    label: 'Market Share Under ₹10,000',
    value: '42.8%',
    source: 'IDC & Counterpoint Research India',
    desc: 'Nearly half of Indian smartphone users own sub-$120 devices with 2GB-3GB RAM.'
  },
  {
    label: 'Avg Cellular RTT Latency',
    value: '480 ms',
    source: 'TRAI Mobile Quality of Service Report',
    desc: 'Cell tower congestion in non-metro regions yields 4x to 8x the latency of European networks.'
  },
  {
    label: 'Cart Abandonment on >5s Load',
    value: '64%',
    source: 'Google Next Billion Users (NBU) Study',
    desc: 'Indian mobile shoppers bounce if the checkout screen doesn’t interact within 5 seconds.'
  },
  {
    label: 'RAM Low Memory Killer Rate',
    value: '1 in 3 tabs',
    source: 'Android Go Edition Memory Metrics',
    desc: 'Heavy JS (>150MB heap) forces background tab killing on 1GB and 2GB RAM phones.'
  }
];

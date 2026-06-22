// ─── Oryx Doors & Windows — Demo Mock Data ───────────────────────────────────

export const fmtAED = (n: number) =>
  `AED ${n.toLocaleString('en-AE', { maximumFractionDigits: 0 })}`

export const fmtAEDShort = (n: number) =>
  n >= 1_000_000 ? `AED ${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `AED ${Math.round(n / 1000)}K` : `AED ${n}`

export const PRODUCTS = [
  'Classic Folding Doors', 'Soho Collection', 'Slim Sliding Doors', 'Premium Sliding',
  'Front Doors', 'Internal Glass Doors', 'Pivoting Doors', 'Renson Pergolas',
  'Outdoor Blinds', 'Windows', 'Insect Screens', 'Velux Skylights',
] as const

export const SALESPEOPLE = [
  'Khalid Al Mansoori', 'Sarah Mitchell', 'Rajesh Nair', 'Maria Santos',
  'Omar Haddad', 'James Whitfield', 'Priya Sharma', 'Ahmed Al Suwaidi',
  'Carlo Reyes', 'Layla Khoury', 'Daniel Brooks', 'Fatima Al Zaabi',
]

// ─── Clients ─────────────────────────────────────────────────────────────────
export interface Client {
  id: number; name: string; type: 'Residential' | 'Commercial' | 'F&B'
  location: string; city: 'Dubai' | 'Abu Dhabi' | 'Riyadh'
  projects: number; lifetimeValue: number
  warranty: 'Lifetime Active' | 'Pending Registration' | 'Claim Open'
  lastInteraction: string
}

const dubaiVillaAreas = ['Emirates Hills', 'Al Barari', 'Palm Jumeirah', 'Jumeirah Golf Estates', 'Dubai Hills Estate', 'Arabian Ranches', 'Jumeirah Islands', 'The Lakes', 'District One', 'Tilal Al Ghaf']
const adAreas = ['Al Raha Beach', 'Saadiyat Island', 'Yas Island', 'Al Bateen', 'Khalifa City']
const riyadhAreas = ['Al Nakheel', 'Hittin', 'Al Malqa', 'Diplomatic Quarter', 'Al Yasmin']

const residentialNames = [
  'Villa Al Falasi', 'The Henderson Residence', 'Villa Khoury', 'Mansour Family Villa', 'The Oberoi Residence',
  'Villa Bin Drai', 'The Castellano Villa', 'Al Qassimi Residence', 'The Whitmore House', 'Villa Sayegh',
  'The Patel Residence', 'Villa Al Shamsi', 'The Laurent Villa', 'Bin Hendi Residence', 'The Kowalski Villa',
  'Villa Al Marri', 'The Okonkwo Residence', 'Villa Haddad', 'The Lindqvist House', 'Al Tayer Residence',
  'The Fernandes Villa', 'Villa Al Ghurair', 'The Aleksandrov Residence', 'Villa Nasser', 'The Drummond House',
  'Villa Al Otaiba', 'The Chen Residence', 'Villa Boutros', 'The Van der Berg Villa', 'Al Habtoor Residence',
  'The Rossi Villa', 'Villa Al Nahyan', 'The Murphy Residence', 'Villa Karam', 'The Eriksson House',
  'Villa Al Rashid', 'The Abubakar Residence', 'Villa Tabbah', 'The Sinclair Villa', 'Al Suwaidi Residence',
]
const commercialNames = [
  'Marriott Al Forsan', 'The Address Boulevard', 'Gaia DIFC', 'Zuma Dubai', 'La Petite Maison',
  'COYA Abu Dhabi', 'Nobu Riyadh', 'The Guild DIFC', 'Em Sherif Café', 'Atlantis F&B Pavilion',
  'Cipriani Yas Island', 'Sushi Samba Tower', 'Bla Bla Beach Club', 'The Maine Land',
  'Hilton Saadiyat Wing B', 'Núla Café Alserkal', 'Orange Feels Café', 'Tashas Al Barsha',
  'One&Only Royal Mirage', 'Rixos Premium Annex', 'Six Senses Residences', 'The St. Regis Gardens',
]

const warranties: Client['warranty'][] = ['Lifetime Active', 'Lifetime Active', 'Lifetime Active', 'Lifetime Active', 'Pending Registration', 'Claim Open']
const interactions = ['2 days ago', '5 days ago', '1 week ago', 'Yesterday', 'Today', '2 weeks ago', '3 days ago', '1 month ago', '4 days ago', '6 days ago']

export const CLIENTS: Client[] = [
  ...residentialNames.map((name, i): Client => {
    const cityRoll = i % 7
    const city: Client['city'] = cityRoll < 4 ? 'Dubai' : cityRoll < 6 ? 'Abu Dhabi' : 'Riyadh'
    const location = city === 'Dubai' ? dubaiVillaAreas[i % dubaiVillaAreas.length] : city === 'Abu Dhabi' ? adAreas[i % adAreas.length] : riyadhAreas[i % riyadhAreas.length]
    return {
      id: i + 1, name, type: 'Residential', city, location,
      projects: 1 + (i % 4), lifetimeValue: 85_000 + ((i * 137_911) % 740_000),
      warranty: warranties[i % warranties.length], lastInteraction: interactions[i % interactions.length],
    }
  }),
  ...commercialNames.map((name, i): Client => {
    const cityRoll = i % 6
    const city: Client['city'] = cityRoll < 3 ? 'Dubai' : cityRoll < 5 ? 'Abu Dhabi' : 'Riyadh'
    const location = city === 'Dubai' ? ['DIFC', 'Downtown', 'Palm Jumeirah', 'Alserkal Avenue', 'JBR', 'Business Bay'][i % 6] : city === 'Abu Dhabi' ? adAreas[i % adAreas.length] : riyadhAreas[i % riyadhAreas.length]
    return {
      id: 100 + i, name, type: i % 3 === 0 ? 'Commercial' : 'F&B', city, location,
      projects: 1 + (i % 3), lifetimeValue: 180_000 + ((i * 211_417) % 1_400_000),
      warranty: warranties[(i + 2) % warranties.length], lastInteraction: interactions[(i + 3) % interactions.length],
    }
  }),
]

// ─── Pipeline / Kanban ───────────────────────────────────────────────────────
export type Stage = 'Enquiry' | 'Site Visit' | 'Quote Sent' | 'Negotiation' | 'Won' | 'In Production' | 'Installed'
export const STAGES: Stage[] = ['Enquiry', 'Site Visit', 'Quote Sent', 'Negotiation', 'Won', 'In Production', 'Installed']

export interface Deal {
  id: number; client: string; projectType: 'Villa' | 'Apartment' | 'Commercial' | 'F&B'
  product: string; value: number; daysInStage: number; salesperson: string; stage: Stage
}

const dealSeed: [string, Deal['projectType'], string, number, number, number][] = [
  // Enquiry
  ['Villa Al Shamsi', 'Villa', 'Renson Pergolas', 145000, 2, 0],
  ['The Chen Residence', 'Villa', 'Slim Sliding Doors', 210000, 4, 1],
  ['Núla Café Alserkal', 'F&B', 'Classic Folding Doors', 88000, 1, 2],
  ['The Murphy Residence', 'Villa', 'Velux Skylights', 36000, 6, 3],
  ['Al Tayer Residence', 'Villa', 'Front Doors', 52000, 3, 4],
  // Site Visit
  ['Villa Boutros', 'Villa', 'Premium Sliding', 265000, 5, 5],
  ['Tashas Al Barsha', 'F&B', 'Slim Sliding Doors', 174000, 8, 6],
  ['The Lindqvist House', 'Villa', 'Soho Collection', 198000, 3, 7],
  ['Six Senses Residences', 'Commercial', 'Windows', 640000, 11, 8],
  // Quote Sent
  ['The Henderson Residence', 'Villa', 'Classic Folding Doors', 320000, 9, 9],
  ['Gaia DIFC', 'F&B', 'Pivoting Doors', 152000, 17, 10],
  ['Villa Al Marri', 'Villa', 'Renson Pergolas', 230000, 6, 11],
  ['The Kowalski Villa', 'Villa', 'Outdoor Blinds', 64000, 21, 0],
  ['Orange Feels Café', 'F&B', 'Slim Sliding Doors', 96000, 4, 1],
  ['Villa Sayegh', 'Villa', 'Internal Glass Doors', 78000, 12, 2],
  // Negotiation
  ['The St. Regis Gardens', 'Commercial', 'Premium Sliding', 850000, 16, 3],
  ['Villa Al Ghurair', 'Villa', 'Soho Collection', 425000, 7, 4],
  ['Bla Bla Beach Club', 'F&B', 'Classic Folding Doors', 290000, 19, 5],
  ['The Patel Residence', 'Apartment', 'Slim Sliding Doors', 118000, 5, 6],
  // Won
  ['Villa Al Falasi', 'Villa', 'Renson Pergolas', 385000, 3, 7],
  ['Em Sherif Café', 'F&B', 'Folding + Pergola Combo', 540000, 2, 8],
  ['The Whitmore House', 'Villa', 'Windows + Skylights', 162000, 5, 9],
  // In Production
  ['Cipriani Yas Island', 'F&B', 'Slim Sliding Doors', 480000, 12, 10],
  ['Villa Nasser', 'Villa', 'Classic Folding Doors', 275000, 8, 11],
  ['The Rossi Villa', 'Villa', 'Pivoting Doors', 134000, 15, 0],
  ['Al Qassimi Residence', 'Villa', 'Premium Sliding', 310000, 6, 1],
  // Installed
  ['Zuma Dubai', 'F&B', 'Internal Glass Doors', 196000, 1, 2],
  ['Villa Haddad', 'Villa', 'Soho Collection', 244000, 2, 3],
  ['The Drummond House', 'Villa', 'Renson Pergolas', 167000, 4, 4],
]
const stageBuckets = [5, 4, 6, 4, 3, 4, 3]
export const DEALS: Deal[] = dealSeed.map((d, i) => {
  let idx = i, stageIdx = 0
  for (const count of stageBuckets) { if (idx < count) break; idx -= count; stageIdx++ }
  return { id: 2200 + i, client: d[0], projectType: d[1], product: d[2], value: d[3], daysInStage: d[4], salesperson: SALESPEOPLE[d[5]], stage: STAGES[stageIdx] }
})

// ─── Leads ───────────────────────────────────────────────────────────────────
export type LeadSource = 'Website' | 'Instagram' | 'Referral' | 'Showroom Walk-in' | 'Google Ads' | 'WhatsApp'
export interface Lead {
  id: number; name: string; source: LeadSource; score: 'Hot' | 'Warm' | 'Cold'
  interest: string; location: string; received: string; owner: string
}
export const LEADS: Lead[] = [
  { id: 1, name: 'Mohammed Al Habtoor', source: 'Referral', score: 'Hot', interest: 'Renson Pergolas + Outdoor Blinds', location: 'Emirates Hills', received: 'Today, 10:42', owner: SALESPEOPLE[0] },
  { id: 2, name: 'Jessica Tan', source: 'Instagram', score: 'Hot', interest: 'Slim Sliding Doors', location: 'Palm Jumeirah', received: 'Today, 09:15', owner: SALESPEOPLE[1] },
  { id: 3, name: 'Faisal Al Otaibi', source: 'Website', score: 'Warm', interest: 'Classic Folding Doors', location: 'Riyadh — Hittin', received: 'Yesterday', owner: SALESPEOPLE[7] },
  { id: 4, name: 'The Loft Bistro (Mgmt)', source: 'WhatsApp', score: 'Hot', interest: 'Folding Doors — terrace front', location: 'DIFC', received: 'Yesterday', owner: SALESPEOPLE[4] },
  { id: 5, name: 'Anita Deshmukh', source: 'Google Ads', score: 'Warm', interest: 'Windows + Insect Screens', location: 'Arabian Ranches', received: '2 days ago', owner: SALESPEOPLE[2] },
  { id: 6, name: 'Tariq Bin Ghalib', source: 'Showroom Walk-in', score: 'Hot', interest: 'Soho Collection — full villa', location: 'Al Barari', received: '2 days ago', owner: SALESPEOPLE[5] },
  { id: 7, name: 'Sophie Marchand', source: 'Instagram', score: 'Warm', interest: 'Velux Skylights', location: 'Jumeirah Golf Estates', received: '3 days ago', owner: SALESPEOPLE[6] },
  { id: 8, name: 'Coastal Kitchen Co.', source: 'Website', score: 'Cold', interest: 'Internal Glass Doors', location: 'Yas Island', received: '4 days ago', owner: SALESPEOPLE[8] },
  { id: 9, name: 'Hessa Al Mazrouei', source: 'Referral', score: 'Warm', interest: 'Premium Sliding', location: 'Saadiyat Island', received: '4 days ago', owner: SALESPEOPLE[11] },
  { id: 10, name: 'Daniel Okafor', source: 'Google Ads', score: 'Cold', interest: 'Front Doors', location: 'Dubai Hills Estate', received: '5 days ago', owner: SALESPEOPLE[9] },
  { id: 11, name: 'Reem Al Saud', source: 'Instagram', score: 'Hot', interest: 'Renson Pergolas — rooftop', location: 'Riyadh — Al Malqa', received: '5 days ago', owner: SALESPEOPLE[7] },
  { id: 12, name: 'Marco Bellini', source: 'Showroom Walk-in', score: 'Warm', interest: 'Pivoting Doors', location: 'District One', received: '6 days ago', owner: SALESPEOPLE[10] },
]

export const FUNNEL = [
  { stage: 'Enquiry', count: 312, pct: 100 },
  { stage: 'Site Visit', count: 187, pct: 60 },
  { stage: 'Quote', count: 142, pct: 46 },
  { stage: 'Won', count: 64, pct: 21 },
]

export const SOURCE_ROI = [
  { source: 'Instagram', spend: 42000, revenue: 1180000, leads: 86 },
  { source: 'Google Ads', spend: 65000, revenue: 920000, leads: 104 },
  { source: 'Website', spend: 18000, revenue: 740000, leads: 71 },
  { source: 'Referral', spend: 8000, revenue: 1460000, leads: 38 },
  { source: 'Showroom', spend: 30000, revenue: 680000, leads: 29 },
  { source: 'WhatsApp', spend: 5000, revenue: 410000, leads: 44 },
]

// ─── Installation Teams ──────────────────────────────────────────────────────
export interface Team {
  id: number; lead: string; job: string; client: string
  city: 'Dubai' | 'Abu Dhabi' | 'Riyadh'; area: string
  products: string; progress: number; due: string
  status: 'On Track' | 'At Risk' | 'Delayed'
  civ: 'Stocked' | 'Restock Due' | 'In Transit'
  onTimeRate: number; qualityScore: number; rating: number; installs: number; ciScore: number
}
export const TEAMS: Team[] = [
  { id: 1, lead: 'Ramon Dela Cruz', job: '#1271', client: 'Villa Nasser', city: 'Dubai', area: 'Al Barari', products: 'Classic Folding Doors ×4', progress: 78, due: '13 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 96, qualityScore: 9.2, rating: 4.9, installs: 14, ciScore: 87 },
  { id: 2, lead: 'Suresh Kumar', job: '#1275', client: 'Cipriani Yas Island', city: 'Abu Dhabi', area: 'Yas Island', products: 'Slim Sliding ×8, Glass Partitions', progress: 45, due: '18 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 93, qualityScore: 8.8, rating: 4.7, installs: 12, ciScore: 81 },
  { id: 3, lead: 'Joseph Mwangi', job: '#1268', client: 'The Rossi Villa', city: 'Dubai', area: 'Jumeirah Islands', products: 'Pivoting Door, Front Door', progress: 90, due: '12 Jun', status: 'On Track', civ: 'Restock Due', onTimeRate: 91, qualityScore: 8.9, rating: 4.8, installs: 13, ciScore: 78 },
  { id: 4, lead: 'Arnel Bautista', job: '#1280', client: 'Al Qassimi Residence', city: 'Dubai', area: 'Emirates Hills', products: 'Premium Sliding ×6', progress: 30, due: '21 Jun', status: 'At Risk', civ: 'Stocked', onTimeRate: 84, qualityScore: 7.9, rating: 4.4, installs: 11, ciScore: 64 },
  { id: 5, lead: 'Mohammed Irfan', job: '#1273', client: 'Villa Haddad', city: 'Dubai', area: 'Dubai Hills Estate', products: 'Soho Collection — phase 2', progress: 62, due: '15 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 95, qualityScore: 9.0, rating: 4.8, installs: 15, ciScore: 84 },
  { id: 6, lead: 'Carlos Mendoza', job: '#1282', client: 'Em Sherif Café', city: 'Dubai', area: 'Downtown', products: 'Folding Doors ×3, Pergola', progress: 15, due: '26 Jun', status: 'On Track', civ: 'In Transit', onTimeRate: 92, qualityScore: 8.6, rating: 4.6, installs: 12, ciScore: 76 },
  { id: 7, lead: 'Anil Thapa', job: '#1265', client: 'The St. Regis Gardens', city: 'Abu Dhabi', area: 'Saadiyat Island', products: 'Premium Sliding ×12', progress: 55, due: '14 Jun', status: 'Delayed', civ: 'Restock Due', onTimeRate: 79, qualityScore: 8.1, rating: 4.3, installs: 10, ciScore: 58 },
  { id: 8, lead: 'Roberto Villanueva', job: '#1277', client: 'Villa Al Falasi', city: 'Dubai', area: 'Palm Jumeirah', products: 'Renson Pergola — Camargue', progress: 70, due: '16 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 94, qualityScore: 9.1, rating: 4.9, installs: 13, ciScore: 85 },
  { id: 9, lead: 'Imran Shaikh', job: '#1284', client: 'The Whitmore House', city: 'Dubai', area: 'Jumeirah Golf Estates', products: 'Windows ×14, Skylights ×3', progress: 38, due: '19 Jun', status: 'At Risk', civ: 'Stocked', onTimeRate: 88, qualityScore: 8.4, rating: 4.5, installs: 12, ciScore: 71 },
  { id: 10, lead: 'Bayani Santos', job: '#1279', client: 'Zuma Dubai', city: 'Dubai', area: 'DIFC', products: 'Internal Glass Doors ×6', progress: 100, due: 'Done 10 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 97, qualityScore: 9.4, rating: 4.9, installs: 16, ciScore: 90 },
  { id: 11, lead: 'Krishna Pillai', job: '#1286', client: 'Hilton Saadiyat Wing B', city: 'Abu Dhabi', area: 'Saadiyat Island', products: 'Slim Sliding ×10', progress: 22, due: '24 Jun', status: 'On Track', civ: 'In Transit', onTimeRate: 90, qualityScore: 8.7, rating: 4.6, installs: 11, ciScore: 74 },
  { id: 12, lead: 'Eduardo Ramos', job: '#1270', client: 'Villa Al Ghurair', city: 'Dubai', area: 'Al Barari', products: 'Soho Collection — full set', progress: 85, due: '13 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 98, qualityScore: 9.6, rating: 5.0, installs: 17, ciScore: 94 },
  { id: 13, lead: 'Abdul Rahman Khan', job: '#1288', client: 'Nobu Riyadh', city: 'Riyadh', area: 'Diplomatic Quarter', products: 'Folding Doors ×5', progress: 48, due: '20 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 89, qualityScore: 8.5, rating: 4.5, installs: 10, ciScore: 72 },
  { id: 14, lead: 'Marvin Aquino', job: '#1283', client: 'The Drummond House', city: 'Dubai', area: 'Tilal Al Ghaf', products: 'Renson Pergola + Blinds', progress: 95, due: '12 Jun', status: 'On Track', civ: 'Restock Due', onTimeRate: 93, qualityScore: 8.9, rating: 4.7, installs: 13, ciScore: 80 },
  { id: 15, lead: 'Vijay Menon', job: '#1287', client: 'Al Raha Beach Villa 22', city: 'Abu Dhabi', area: 'Al Raha Beach', products: 'Windows ×9, Insect Screens', progress: 33, due: '23 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 91, qualityScore: 8.6, rating: 4.6, installs: 12, ciScore: 75 },
  { id: 16, lead: 'Nestor Garcia', job: '#1290', client: 'Villa Al Rashid', city: 'Riyadh', area: 'Al Nakheel', products: 'Premium Sliding ×4', progress: 12, due: '28 Jun', status: 'On Track', civ: 'In Transit', onTimeRate: 86, qualityScore: 8.2, rating: 4.4, installs: 9, ciScore: 67 },
  { id: 17, lead: 'Sami Al Hashimi', job: '#1281', client: 'The Guild DIFC', city: 'Dubai', area: 'DIFC', products: 'Pivoting Doors ×2, Glass Walls', progress: 58, due: '17 Jun', status: 'At Risk', civ: 'Stocked', onTimeRate: 87, qualityScore: 8.3, rating: 4.5, installs: 11, ciScore: 69 },
  { id: 18, lead: 'Dennis Ocampo', job: '#1289', client: 'The Laurent Villa', city: 'Dubai', area: 'District One', products: 'Folding Doors ×6, Front Door', progress: 25, due: '25 Jun', status: 'On Track', civ: 'Stocked', onTimeRate: 92, qualityScore: 8.8, rating: 4.7, installs: 12, ciScore: 79 },
]

// ─── Revenue trend ───────────────────────────────────────────────────────────
export const REVENUE_TREND = [
  { month: 'Jul', revenue: 2.9, target: 3.0 }, { month: 'Aug', revenue: 2.6, target: 3.0 },
  { month: 'Sep', revenue: 3.2, target: 3.2 }, { month: 'Oct', revenue: 3.5, target: 3.2 },
  { month: 'Nov', revenue: 3.8, target: 3.4 }, { month: 'Dec', revenue: 3.4, target: 3.4 },
  { month: 'Jan', revenue: 3.6, target: 3.6 }, { month: 'Feb', revenue: 3.9, target: 3.6 },
  { month: 'Mar', revenue: 4.1, target: 3.8 }, { month: 'Apr', revenue: 3.7, target: 3.8 },
  { month: 'May', revenue: 4.0, target: 4.0 }, { month: 'Jun', revenue: 4.2, target: 4.0 },
]

// ─── Andon alerts & activity ─────────────────────────────────────────────────
export interface Andon { id: number; severity: 'red' | 'amber'; title: string; detail: string; time: string; owner: string }
export const ANDON_ALERTS: Andon[] = [
  { id: 1, severity: 'red', title: 'Team 7 installation delayed — material shortage', detail: 'St. Regis Gardens: 4 sliding panels held at JAFZA customs. Countermeasure: partial install resequenced; client notified.', time: '2h ago', owner: 'Ops — A. Thapa' },
  { id: 2, severity: 'amber', title: '3 quotes pending approval >48hrs', detail: 'Q-2241, Q-2238, Q-2235 awaiting commercial sign-off. Total value AED 612K.', time: '4h ago', owner: 'Sales Ops' },
  { id: 3, severity: 'red', title: 'Customer complaint unresolved 24hrs', detail: 'Villa Sayegh — sliding door alignment after handover. Service visit not yet scheduled.', time: '6h ago', owner: 'Customer Care' },
  { id: 4, severity: 'amber', title: 'CIV restock due — Teams 3, 7, 14', detail: 'Sealant and gasket stock below standard level on three installation vehicles.', time: 'Today', owner: 'Logistics' },
]

export interface Activity { id: number; type: 'quote' | 'install' | 'payment' | 'lead' | 'kaizen'; text: string; time: string }
export const ACTIVITY: Activity[] = [
  { id: 1, type: 'payment', text: 'Payment received — AED 192,500 from Cipriani Yas Island (40% milestone)', time: '12 min ago' },
  { id: 2, type: 'install', text: 'Team 10 completed installation #1279 — Zuma Dubai, Internal Glass Doors ×6', time: '38 min ago' },
  { id: 3, type: 'quote', text: 'Quote Q-2252 sent to The Chen Residence — AED 210,000 (Slim Sliding)', time: '1h ago' },
  { id: 4, type: 'lead', text: 'New hot lead: Mohammed Al Habtoor — Pergolas, Emirates Hills (Referral)', time: '2h ago' },
  { id: 5, type: 'kaizen', text: 'Kaizen implemented: pre-cut gasket kits — 11 min saved per door install', time: '3h ago' },
  { id: 6, type: 'quote', text: 'Quote Q-2251 approved — Villa Al Ghurair, AED 425,000 (Soho Collection)', time: '4h ago' },
  { id: 7, type: 'payment', text: 'Payment received — AED 83,500 from Villa Haddad (final milestone)', time: '5h ago' },
  { id: 8, type: 'install', text: 'Team 14 at 95% — Drummond House pergola, handover tomorrow', time: '6h ago' },
]

// ─── Quotes & Billing ────────────────────────────────────────────────────────
export interface Quote { id: string; client: string; products: string; value: number; status: 'Draft' | 'Sent' | 'Approved' | 'Rejected' | 'Expired'; days: number; owner: string }
export const QUOTES: Quote[] = [
  { id: 'Q-2252', client: 'The Chen Residence', products: 'Slim Sliding Doors ×6', value: 210000, status: 'Sent', days: 0, owner: SALESPEOPLE[1] },
  { id: 'Q-2251', client: 'Villa Al Ghurair', products: 'Soho Collection — full villa', value: 425000, status: 'Approved', days: 1, owner: SALESPEOPLE[4] },
  { id: 'Q-2249', client: 'Gaia DIFC', products: 'Pivoting Doors ×2', value: 152000, status: 'Sent', days: 17, owner: SALESPEOPLE[10] },
  { id: 'Q-2247', client: 'The Henderson Residence', products: 'Classic Folding Doors ×5', value: 320000, status: 'Sent', days: 9, owner: SALESPEOPLE[9] },
  { id: 'Q-2245', client: 'Bla Bla Beach Club', products: 'Folding Doors — beachfront ×4', value: 290000, status: 'Sent', days: 19, owner: SALESPEOPLE[5] },
  { id: 'Q-2244', client: 'Villa Al Marri', products: 'Renson Pergola — Algarve', value: 230000, status: 'Sent', days: 6, owner: SALESPEOPLE[11] },
  { id: 'Q-2243', client: 'The Kowalski Villa', products: 'Outdoor Blinds ×8', value: 64000, status: 'Expired', days: 31, owner: SALESPEOPLE[0] },
  { id: 'Q-2241', client: 'Orange Feels Café', products: 'Slim Sliding ×3', value: 96000, status: 'Draft', days: 3, owner: SALESPEOPLE[1] },
  { id: 'Q-2240', client: 'Six Senses Residences', products: 'Windows — Tower 2 batch', value: 640000, status: 'Sent', days: 11, owner: SALESPEOPLE[8] },
  { id: 'Q-2238', client: 'Villa Sayegh', products: 'Internal Glass Doors ×4', value: 78000, status: 'Draft', days: 4, owner: SALESPEOPLE[2] },
  { id: 'Q-2236', client: 'The Maine Land', products: 'Folding Doors ×3', value: 185000, status: 'Rejected', days: 14, owner: SALESPEOPLE[6] },
  { id: 'Q-2235', client: 'Hessa Al Mazrouei', products: 'Premium Sliding ×4', value: 198000, status: 'Draft', days: 2, owner: SALESPEOPLE[11] },
]

export interface Invoice { id: string; client: string; value: number; status: 'Paid' | 'Pending' | 'Overdue'; daysOverdue?: number; due: string }
export const INVOICES: Invoice[] = [
  { id: 'INV-1842', client: 'Cipriani Yas Island', value: 192500, status: 'Paid', due: '10 Jun' },
  { id: 'INV-1841', client: 'Villa Haddad', value: 83500, status: 'Paid', due: '10 Jun' },
  { id: 'INV-1839', client: 'Zuma Dubai', value: 98000, status: 'Pending', due: '18 Jun' },
  { id: 'INV-1836', client: 'The St. Regis Gardens', value: 255000, status: 'Pending', due: '21 Jun' },
  { id: 'INV-1828', client: 'Atlantis F&B Pavilion', value: 176000, status: 'Overdue', daysOverdue: 22, due: '20 May' },
  { id: 'INV-1825', client: 'Sushi Samba Tower', value: 84000, status: 'Overdue', daysOverdue: 31, due: '11 May' },
  { id: 'INV-1819', client: 'The Castellano Villa', value: 46000, status: 'Overdue', daysOverdue: 12, due: '30 May' },
  { id: 'INV-1816', client: 'Villa Bin Drai', value: 38000, status: 'Overdue', daysOverdue: 8, due: '3 Jun' },
  { id: 'INV-1812', client: 'Marriott Al Forsan', value: 36000, status: 'Overdue', daysOverdue: 45, due: '27 Apr' },
  { id: 'INV-1845', client: 'Villa Al Falasi', value: 154000, status: 'Pending', due: '25 Jun' },
]

export const AGING = [
  { bucket: 'Current', amount: 601500 }, { bucket: '1–15 days', amount: 84000 },
  { bucket: '16–30 days', amount: 222000 }, { bucket: '31–45 days', amount: 120000 },
  { bucket: '45+ days', amount: 36000 },
]

// ─── Appointments ────────────────────────────────────────────────────────────
export type ApptType = 'Site Visit' | 'Installation' | 'Showroom Consultation' | 'Service Call'
export interface Appt { id: number; day: number; time: string; type: ApptType; client: string; location: string; assignee: string; conflict?: boolean }
export const APPOINTMENTS: Appt[] = [
  { id: 1, day: 11, time: '09:00', type: 'Installation', client: 'Villa Nasser', location: 'Al Barari', assignee: 'Team 1' },
  { id: 2, day: 11, time: '10:30', type: 'Site Visit', client: 'Mohammed Al Habtoor', location: 'Emirates Hills', assignee: 'Khalid Al Mansoori' },
  { id: 3, day: 11, time: '11:00', type: 'Showroom Consultation', client: 'Tariq Bin Ghalib', location: 'Oryx Showroom — Al Quoz', assignee: 'Sarah Mitchell' },
  { id: 4, day: 11, time: '14:00', type: 'Service Call', client: 'Villa Sayegh', location: 'The Lakes', assignee: 'Service Unit 2' },
  { id: 5, day: 11, time: '14:00', type: 'Site Visit', client: 'Jessica Tan', location: 'Palm Jumeirah', assignee: 'Sarah Mitchell', conflict: true },
  { id: 6, day: 11, time: '16:30', type: 'Showroom Consultation', client: 'Marco Bellini', location: 'Oryx Showroom — Al Quoz', assignee: 'Daniel Brooks' },
  { id: 7, day: 12, time: '08:30', type: 'Installation', client: 'The Rossi Villa — handover', location: 'Jumeirah Islands', assignee: 'Team 3' },
  { id: 8, day: 12, time: '10:00', type: 'Site Visit', client: 'The Loft Bistro', location: 'DIFC', assignee: 'Omar Haddad' },
  { id: 9, day: 12, time: '15:00', type: 'Installation', client: 'Drummond House — handover', location: 'Tilal Al Ghaf', assignee: 'Team 14' },
  { id: 10, day: 13, time: '09:00', type: 'Installation', client: 'Villa Al Ghurair', location: 'Al Barari', assignee: 'Team 12' },
  { id: 11, day: 13, time: '11:30', type: 'Site Visit', client: 'Reem Al Saud', location: 'Riyadh — Al Malqa', assignee: 'Ahmed Al Suwaidi' },
  { id: 12, day: 14, time: '10:00', type: 'Showroom Consultation', client: 'Sophie Marchand', location: 'Oryx Showroom — Al Quoz', assignee: 'Priya Sharma' },
  { id: 13, day: 14, time: '13:00', type: 'Service Call', client: 'One&Only Royal Mirage', location: 'Al Sufouh', assignee: 'Service Unit 1' },
  { id: 14, day: 15, time: '09:30', type: 'Site Visit', client: 'Hessa Al Mazrouei', location: 'Saadiyat Island', assignee: 'Fatima Al Zaabi' },
  { id: 15, day: 15, time: '14:00', type: 'Installation', client: 'Villa Haddad — phase 2', location: 'Dubai Hills Estate', assignee: 'Team 5' },
  { id: 16, day: 16, time: '10:00', type: 'Installation', client: 'Villa Al Falasi pergola', location: 'Palm Jumeirah', assignee: 'Team 8' },
  { id: 17, day: 17, time: '11:00', type: 'Site Visit', client: 'Faisal Al Otaibi', location: 'Riyadh — Hittin', assignee: 'Ahmed Al Suwaidi' },
  { id: 18, day: 18, time: '09:00', type: 'Installation', client: 'Cipriani Yas Island', location: 'Yas Island', assignee: 'Team 2' },
  { id: 19, day: 19, time: '15:30', type: 'Showroom Consultation', client: 'Anita Deshmukh', location: 'Oryx Showroom — Al Quoz', assignee: 'Rajesh Nair' },
  { id: 20, day: 20, time: '10:00', type: 'Service Call', client: 'Tashas Al Barsha', location: 'Al Barsha', assignee: 'Service Unit 2' },
]

// ─── Kaizen ──────────────────────────────────────────────────────────────────
export interface KaizenCard { id: number; idea: string; by: string; dept: string; status: 'New' | 'Testing' | 'Implemented'; saving: string }
export const KAIZEN: KaizenCard[] = [
  { id: 1, idea: 'Foam finger holes in toolboxes — every tool has a shadow position, missing tools visible at a glance', by: 'Ramon Dela Cruz', dept: 'Installation', status: 'Implemented', saving: '2 sec per tool grab · ~40 hrs/yr fleet-wide' },
  { id: 2, idea: 'Pre-cut gasket kits packed per door at the factory instead of cutting on site', by: 'Eduardo Ramos', dept: 'Installation', status: 'Implemented', saving: '11 min per door · AED 38K/yr' },
  { id: 3, idea: 'QR code on every installed unit linking to warranty + care instructions', by: 'Layla Khoury', dept: 'Customer Care', status: 'Implemented', saving: '~60 support calls/month avoided' },
  { id: 4, idea: 'Standard photo checklist (12 angles) at handover — kills disputes before they start', by: 'Marvin Aquino', dept: 'Installation', status: 'Implemented', saving: 'Rework disputes down 35%' },
  { id: 5, idea: 'Magnetic levelling jig for pivot door alignment — one-person job instead of two', by: 'Joseph Mwangi', dept: 'Installation', status: 'Testing', saving: 'Est. 25 min per pivot install' },
  { id: 6, idea: 'WhatsApp template flows for quote follow-ups at day 3 / 7 / 14', by: 'Sarah Mitchell', dept: 'Sales', status: 'Testing', saving: 'Est. +8% quote conversion' },
  { id: 7, idea: 'Colour-coded screw bins in CIVs matched to product line', by: 'Anil Thapa', dept: 'Logistics', status: 'Testing', saving: 'Est. 6 min per install' },
  { id: 8, idea: 'Site-visit measurement app replaces paper forms — syncs to quote engine', by: 'Priya Sharma', dept: 'Sales', status: 'New', saving: 'Est. 1 day off quote turnaround' },
  { id: 9, idea: 'Pre-departure CIV checklist board (5S) at warehouse exit gate', by: 'Vijay Menon', dept: 'Logistics', status: 'New', saving: 'Est. 90% fewer return trips' },
  { id: 10, idea: 'Glass panel trolley with adjustable padding — two sizes cover all products', by: 'Suresh Kumar', dept: 'Installation', status: 'New', saving: 'Est. AED 15K/yr breakage reduction' },
]

export const KAIZEN_LEADERS = [
  { name: 'Ramon Dela Cruz', dept: 'Installation', ideas: 9, implemented: 6 },
  { name: 'Eduardo Ramos', dept: 'Installation', ideas: 7, implemented: 5 },
  { name: 'Layla Khoury', dept: 'Customer Care', ideas: 6, implemented: 4 },
  { name: 'Sarah Mitchell', dept: 'Sales', ideas: 5, implemented: 3 },
  { name: 'Vijay Menon', dept: 'Logistics', ideas: 5, implemented: 2 },
]

// ─── Customer Care ───────────────────────────────────────────────────────────
export interface Feedback { id: number; client: string; type: 'Rating' | 'Complaint' | 'Service Request'; rating?: number; text: string; time: string; status: 'New' | 'In Progress' | 'Resolved' }
export const FEEDBACK: Feedback[] = [
  { id: 1, client: 'Zuma Dubai', type: 'Rating', rating: 5, text: 'Flawless installation, zero disruption to service hours. Team 10 worked overnight as promised.', time: 'Today', status: 'Resolved' },
  { id: 2, client: 'Villa Sayegh', type: 'Complaint', text: 'Sliding door alignment slightly off after handover — door catches at midpoint.', time: 'Yesterday', status: 'In Progress' },
  { id: 3, client: 'Villa Haddad', type: 'Rating', rating: 5, text: 'The Soho doors transformed the house. Installation team was meticulous and tidy.', time: 'Yesterday', status: 'Resolved' },
  { id: 4, client: 'The Castellano Villa', type: 'Service Request', text: 'Requesting insect screen re-tension on two windows, master bedroom.', time: '2 days ago', status: 'New' },
  { id: 5, client: 'Atlantis F&B Pavilion', type: 'Complaint', text: 'Communication during the 3-day delay was poor — we found out from the site manager, not Oryx.', time: '3 days ago', status: 'In Progress' },
  { id: 6, client: 'The Drummond House', type: 'Rating', rating: 4, text: 'Pergola looks superb. One remote pairing issue resolved on the spot.', time: '3 days ago', status: 'Resolved' },
  { id: 7, client: 'One&Only Royal Mirage', type: 'Service Request', text: 'Annual maintenance visit for 14 folding door sets, beach restaurant block.', time: '4 days ago', status: 'New' },
  { id: 8, client: 'Villa Bin Drai', type: 'Rating', rating: 5, text: 'Second project with Oryx. Lifetime warranty is why we keep coming back.', time: '5 days ago', status: 'Resolved' },
]

export const NPS_TREND = [
  { month: 'Jan', nps: 58 }, { month: 'Feb', nps: 61 }, { month: 'Mar', nps: 64 },
  { month: 'Apr', nps: 60 }, { month: 'May', nps: 67 }, { month: 'Jun', nps: 71 },
]

// ─── Messaging ───────────────────────────────────────────────────────────────
export interface Channel { id: string; name: string; unread: number }
export const CHANNELS: Channel[] = [
  { id: 'ops', name: 'Operations', unread: 3 },
  { id: 'sales', name: 'Sales Floor', unread: 0 },
  { id: 'install', name: 'Installation Teams', unread: 7 },
  { id: 'care', name: 'Customer Care', unread: 1 },
  { id: 'kaizen', name: 'Kaizen Ideas', unread: 2 },
]
export interface Msg { id: number; from: string; role: string; text: string; time: string; me?: boolean }
export const MESSAGES: Record<string, Msg[]> = {
  ops: [
    { id: 1, from: 'Anil Thapa', role: 'Team 7 Lead', text: 'Customs released 2 of 4 panels for St. Regis. Remaining 2 expected tomorrow AM. Resequencing install to start with east elevation.', time: '14:22' },
    { id: 2, from: 'Hannah Lewis', role: 'Ops Coordinator', text: 'Good countermeasure. Client PM notified — they appreciated the proactive call. Logging this as Andon resolution path.', time: '14:31' },
    { id: 3, from: 'Anil Thapa', role: 'Team 7 Lead', text: 'Also flagging: CIV sealant stock below standard. Restock before Thursday please.', time: '14:33' },
    { id: 4, from: 'Guy Dawson', role: 'Managing Director', text: 'Well handled. Let\'s add a customs-buffer rule to the planning standard for KSA-bound materials.', time: '15:05', me: true },
  ],
  sales: [
    { id: 1, from: 'Sarah Mitchell', role: 'Senior Sales', text: 'Chen Residence quote sent — AED 210K. They asked about acoustic glass upgrade, sending addendum.', time: '11:40' },
    { id: 2, from: 'Khalid Al Mansoori', role: 'Sales Lead', text: 'Al Habtoor referral wants a site visit this week. Premium pergola + blinds, Emirates Hills. High intent.', time: '12:15' },
  ],
  install: [
    { id: 1, from: 'Bayani Santos', role: 'Team 10 Lead', text: 'Zuma handover complete. 12-photo checklist uploaded. Client signed off on first walkthrough. 👍', time: '09:48' },
    { id: 2, from: 'Eduardo Ramos', role: 'Team 12 Lead', text: 'Al Ghurari villa at 85%. Pre-cut gasket kits saved us ~1.5 hrs today across 8 doors.', time: '10:22' },
    { id: 3, from: 'Hannah Lewis', role: 'Ops Coordinator', text: 'Team 12 — your method is being written into the standard work doc this week. Nice one.', time: '10:30' },
  ],
  care: [
    { id: 1, from: 'Layla Khoury', role: 'Customer Care Lead', text: 'Villa Sayegh alignment issue: service visit booked tomorrow 14:00, Service Unit 2. Root cause review after.', time: '13:02' },
  ],
  kaizen: [
    { id: 1, from: 'Vijay Menon', role: 'Logistics', text: 'New idea submitted: 5S pre-departure checklist board at the warehouse exit gate. Stops the "forgot the brackets" return trips.', time: '08:15' },
    { id: 2, from: 'Guy Dawson', role: 'Managing Director', text: 'Love it. Pilot with Teams 15 and 16 next week — measure return-trip rate before/after.', time: '08:40', me: true },
  ],
}

// ─── Department snapshots & misc ─────────────────────────────────────────────
export const TEAM_MONTHLY = [
  { month: 'Jan', installs: 31, onTime: 89 }, { month: 'Feb', installs: 34, onTime: 90 },
  { month: 'Mar', installs: 38, onTime: 92 }, { month: 'Apr', installs: 35, onTime: 91 },
  { month: 'May', installs: 41, onTime: 93 }, { month: 'Jun', installs: 44, onTime: 94 },
]

export const NOTIFICATIONS = [
  { id: 1, text: 'Andon: Team 7 material shortage — countermeasure active', time: '2h ago', unread: true },
  { id: 2, text: 'Q-2251 approved: Villa Al Ghurair, AED 425K', time: '4h ago', unread: true },
  { id: 3, text: 'Payment received: AED 192,500 — Cipriani Yas Island', time: 'Today', unread: true },
  { id: 4, text: 'Kaizen idea moved to Testing: magnetic levelling jig', time: 'Yesterday', unread: false },
  { id: 5, text: 'NPS for May finalised: 67 (+7 vs Apr)', time: 'Yesterday', unread: false },
]

// ─── AI Copilot canned answers ───────────────────────────────────────────────
export const COPILOT_QA: { q: string; a: string }[] = [
  {
    q: 'Which installation teams need support this week?',
    a: 'Three teams are flagged this week:\n\n• **Team 7 (Anil Thapa)** — Delayed at St. Regis Gardens. Root cause: 4 sliding panels held in customs. Countermeasure in motion: install resequenced, 2 panels released. Risk to 14 Jun handover remains — recommend adding 2 installers from Team 10 (now free after Zuma).\n\n• **Team 4 (Arnel Bautista)** — At Risk on Al Qassimi Residence and rework rate up 15% this month. Recurring theme: sealing finish. Countermeasure: schedule the sealing standard-work refresher before phase 2.\n\n• **Team 9 (Imran Shaikh)** — At Risk on Whitmore House; skylight flashing kit arrived late. Buffer recovered if Friday weather holds.\n\nStandardize: Team 12\'s gasket-kit method is saving ~1.5 hrs/job — rolling it to Teams 4 and 7 first would have the highest impact.',
  },
  {
    q: 'Why did we lose quotes last month?',
    a: 'Root-cause breakdown of the 9 quotes lost in May (AED 1.42M):\n\n• **Price (4 quotes, 44%)** — all four were >AED 150K and received zero follow-up between day 3 and day 14. Large quotes close 40% slower; our follow-up cadence doesn\'t adjust for size.\n• **Lead time (3 quotes)** — competitor quoted 4-week delivery vs our 7. All three were F&B fit-outs with fixed opening dates.\n• **Spec mismatch (2 quotes)** — client wanted slimmer sightlines; Slim Sliding was never offered as an alternative.\n\nCountermeasures: tiered follow-up sequence for quotes >AED 150K (drafted, in Kaizen Testing), fast-track production lane for F&B (needs ops review), and a product-alternative prompt in the quote builder.',
  },
  {
    q: 'Where are we wasting the most time?',
    a: 'Top 3 waste streams identified this quarter (Muda analysis):\n\n1. **Waiting — quote approvals (est. 110 hrs/quarter).** Quotes sit a median 52 hrs awaiting commercial sign-off. Three are stuck >48 hrs right now. Countermeasure: auto-approve under AED 100K within standard margin.\n\n2. **Transport — CIV return trips (est. 85 hrs/quarter).** 1 in 6 installs has a return trip for missing materials. The 5S pre-departure checklist (Kaizen #9, New) directly targets this — recommend fast-tracking the pilot.\n\n3. **Motion — on-site gasket cutting (being eliminated).** Pre-cut kits already save 11 min/door; full fleet rollout completes this month, worth ~AED 38K/yr.\n\nTotal addressable: ~195 hrs/quarter ≈ AED 210K/yr at blended install rates.',
  },
  {
    q: 'Which product line should marketing push?',
    a: '**Renson Pergolas** — strongest signal across three datasets:\n\n• Instagram leads convert **2.3×** better for premium pergolas than any other product line, at the lowest cost per won deal (AED 1,860).\n• Pergola deals average **AED 232K** with a 31% close rate vs 21% portfolio average.\n• Q3 seasonality: pergola enquiries historically rise 40% as outdoor-living season approaches — the budget window is now.\n\nSecondary push: **Soho Collection** for the Riyadh market — 3 of the last 5 Riyadh wins included it, and KSA pipeline is up 28% QoQ.\n\nSuggested reallocation: shift AED 15K/month from Google Ads (lowest ROI at 14×) to Instagram pergola campaigns (28× ROI). Standardize the winning creative format: installed-project reels from Palm Jumeirah and Al Barari.',
  },
]

export const company = {
  name: "Safeway Electric Switchgear Trading LLC",
  short: "Safeway",
  tagline: "Powering Reliability, Distributing Trust",
  founded: 1998,
  years: 28,
  email: "switchgear@safewaytechnical.com",
  website: "www.safewaytechnical.com",
  whatsapp: "https://wa.me/message/SU6N36WV4QNYO1",
  phones: [
    { label: "+971 2 876 4882", href: "tel:+97128764882" },
    { label: "+971 56 511 2047", href: "tel:+971565112047" },
  ],
};

export type Location = {
  kind: string;
  name: string;
  address: string[];
  phones: { label: string; href: string }[];
  email?: string;
  lat: number;
  lng: number;
  mapUrl: string;
};

export const locations: Location[] = [
  {
    kind: "Switchgear Division",
    name: "Safeway Electric Switchgear Trading LLC",
    address: ["Musaffah Industrial M13", "P.O. Box 29609, Abu Dhabi, UAE"],
    phones: company.phones,
    email: company.email,
    lat: 24.3691602,
    lng: 54.5000631,
    mapUrl: "https://www.google.com/maps/dir//24.3691602,54.5000631",
  },
  {
    kind: "Retail Division · Head Office",
    name: "Safeway Technical Trading Company LLC",
    address: ["Musaffah Industrial M09", "Abu Dhabi, UAE"],
    phones: [
      { label: "+971 2 554 2500", href: "tel:+97125542500" },
      { label: "+971 54 531 4727", href: "tel:+971545314727" },
    ],
    lat: 24.3735221,
    lng: 54.5054825,
    mapUrl: "https://www.google.com/maps/dir//24.3735221,54.5054825",
  },
  {
    kind: "Retail Division · Branch",
    name: "Safeway Technical Trading Co LLC Branch",
    address: ["LOGIHUB Building, Shop 3.3", "Musaffah Industrial M45, Abu Dhabi, UAE"],
    phones: [
      { label: "+971 2 559 3318", href: "tel:+97125593318" },
      { label: "+971 56 507 0685", href: "tel:+971565070685" },
    ],
    lat: 24.3497396,
    lng: 54.4781843,
    mapUrl: "https://www.google.com/maps/dir//24.3497396,54.4781843",
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export const brands = [
  { slug: "abb", name: "ABB" },
  { slug: "schneider-electric", name: "Schneider Electric" },
  { slug: "siemens", name: "Siemens" },
  { slug: "eaton", name: "Eaton" },
  { slug: "legrand", name: "Legrand" },
  { slug: "hager", name: "Hager" },
  { slug: "phoenix-contact", name: "Phoenix Contact" },
  { slug: "weidmuller", name: "Weidmüller" },
  { slug: "finder", name: "Finder" },
  { slug: "mean-well", name: "Mean Well" },
  { slug: "dorman-smith", name: "Dorman Smith" },
  { slug: "himel", name: "Himel" },
  { slug: "giovenzana", name: "Giovenzana International" },
  { slug: "salzer", name: "Salzer" },
  { slug: "gic", name: "GIC" },
  { slug: "rr-electric", name: "RR Electric" },
  { slug: "espanza", name: "Espanza" },
  { slug: "manumag", name: "Manumag" },
];

export const specs = [
  {
    icon: "shield",
    title: "Manufacturing Standard",
    items: ["IEC 61439-1 & 2: 2020 Edition 3", "IEC 61921:20"],
  },
  {
    icon: "building",
    title: "Authorities",
    items: ["TAQA (ADDC & AADC)", "DEWA & FEWA"],
  },
  { icon: "bolt", title: "Panel Ratings", items: ["Up to 2500A"] },
  { icon: "pulse", title: "Short-Circuit Rating", items: ["36kA", "50kA", "65kA"] },
  { icon: "drop", title: "IP Rating", items: ["IP31", "IP41", "IP54", "IP65"] },
  {
    icon: "sliders",
    title: "Forms of Separation",
    items: ["Form 2b", "Form 3b", "Form 4b Type 6"],
  },
  {
    icon: "cabinet",
    title: "Enclosures",
    items: [
      "Electrogalvanized sheet steel",
      "Glass reinforced polyester (GRP)",
      "Single & double wall aluminium",
      "Stainless steel",
      "Explosion-proof ATEX rated",
    ],
  },
  {
    icon: "mount",
    title: "Mounting",
    items: ["Floor mounting type", "Wall mounting type"],
  },
  { icon: "thermo", title: "Ambient Temperature", items: ["50 °C"] },
  {
    icon: "cable",
    title: "Cable Entry",
    items: ["Top & bottom", "Front or rear access", "As per client requirement"],
  },
] as const;

export const products = [
  {
    code: "MDB",
    title: "Main Distribution Boards",
    detail: "Form 2b, Form 3b & Form 4b Type 6 with bus couplers & ATS.",
    tags: ["Form 4b Type 6", "Bus couplers", "ATS"],
    image: "/images/products/mdb.webp",
    installed: "/images/installed/mdb.jpg",
  },
  {
    code: "SMDB",
    title: "Sub Main Distribution Boards",
    detail: "Form 2b, Form 3b & Form 4b Type 6 sub-main boards for building and plant distribution.",
    tags: ["Form 2b", "Form 3b", "Form 4b"],
    image: "/images/products/smdb.webp",
    installed: "/images/installed/smdb.jpg",
  },
  {
    code: "FDB",
    title: "Final Distribution Boards",
    detail: "Final circuit distribution for commercial, industrial and residential projects.",
    tags: ["Commercial", "Residential"],
    image: "/images/products/fdb.webp",
    installed: "/images/installed/fdb.jpg",
  },
  {
    code: "ATS",
    title: "Source Changeover Systems",
    detail: "Manual changeover and automatic transfer switch (ATS) panels.",
    tags: ["Manual", "ATS"],
    image: "/images/products/ats.webp",
    installed: "/images/installed/ats.jpg",
  },
  {
    code: "MCC",
    title: "Motor Control Center Panels",
    detail: "Centralised motor starting, protection and control for plant equipment.",
    tags: ["Motor starters", "Protection"],
    image: "/images/products/mcc.webp",
    installed: "/images/installed/mcc.jpg",
  },
  {
    code: "PLC",
    title: "PLC & Conventional Control Panels",
    detail:
      "Transfer pumps, booster pumps, swimming pools, fan controls, pump controls, AHU, FAHU and VFD panels.",
    tags: ["AHU / FAHU", "VFD", "Pumps"],
    image: "/images/products/plc.webp",
    installed: "/images/installed/plc.jpg",
  },
  {
    code: "CAP",
    title: "Capacitor Banks",
    detail: "Power factor correction panels built to IEC 61921.",
    tags: ["IEC 61921"],
    image: "/images/products/capacitor.webp",
    installed: "/images/installed/capacitor.jpg",
  },
  {
    code: "ISP",
    title: "Industrial Socket Panels",
    detail: "Socket distribution panels for workshops, sites and industrial facilities.",
    tags: ["Industrial"],
    image: "/images/products/socket.webp",
    installed: "/images/installed/socket.jpg",
  },
];

export const sectors = [
  {
    title: "Commercial",
    body: "Towers, malls, hotels and offices.",
    image: "/images/sectors/commercial.jpg",
  },
  {
    title: "Industrial",
    body: "Plants, warehouses and process facilities.",
    image: "/images/sectors/industrial.jpg",
  },
  {
    title: "Residential",
    body: "Villas, buildings and communities.",
    image: "/images/sectors/residential.jpg",
  },
  {
    title: "Infrastructure",
    body: "Pumping stations and utility services.",
    image: "/images/sectors/infrastructure.jpg",
  },
];

export const milestones = [
  {
    icon: "shield",
    title: "Built to IEC 61439",
    body: "Assemblies manufactured to IEC 61439-1 & 2: 2020 Edition 3, and capacitor banks to IEC 61921.",
  },
  {
    icon: "building",
    title: "Authority-ready",
    body: "Panels built for TAQA (ADDC & AADC), DEWA and FEWA requirements across the Emirates.",
  },
  {
    icon: "thermo",
    title: "Rated for 50 °C",
    body: "Designed for the region's ambient temperatures, with IP ratings from IP31 to IP65.",
  },
  {
    icon: "bolt",
    title: "Components you trust",
    body: "Switchgear and controls from ABB, Schneider Electric, Siemens, Eaton, Legrand and more.",
  },
  {
    icon: "truck",
    title: "On-time delivery",
    body: "Quick availability and on-time delivery for every project, big or small.",
  },
  {
    icon: "wrench",
    title: "Support after handover",
    body: "Expert product selection for contractors and consultants, and after-sales service.",
  },
];

export const faqs = [
  {
    q: "Which standards are Safeway panels built to?",
    a: "Our LV switchgear and control gear assemblies are manufactured to IEC 61439-1 & 2: 2020 Edition 3, and capacitor banks to IEC 61921.",
  },
  {
    q: "Are your panels suitable for TAQA, DEWA and FEWA projects?",
    a: "Yes. We build panels for projects under TAQA (ADDC & AADC), DEWA and FEWA authority requirements.",
  },
  {
    q: "What ratings and forms of separation do you offer?",
    a: "Panel ratings up to 2500A, short-circuit ratings of 36kA, 50kA and 65kA, and Form 2b, Form 3b and Form 4b Type 6 separation.",
  },
  {
    q: "Which enclosure types are available?",
    a: "Electrogalvanized sheet steel, glass reinforced polyester (GRP), single and double wall aluminium, stainless steel and explosion-proof ATEX rated enclosures, floor or wall mounted.",
  },
  {
    q: "Can cable entry be customised?",
    a: "Yes. Top and bottom cable entry with front or rear access is available based on your project requirements.",
  },
  {
    q: "Where are you located?",
    a: "Our switchgear division is in Musaffah Industrial M13, Abu Dhabi, with retail showrooms in Musaffah M09 and M45.",
  },
];

export const controlPanels = [
  { icon: "mcc", title: "Motor Control Center" },
  { icon: "plc", title: "PLC Control Panel" },
  { icon: "vfd", title: "VFD Control Panel" },
  { icon: "pump", title: "Pump Control Panel" },
  { icon: "fan", title: "Fan Control Panel" },
  { icon: "ro", title: "RO System Control Panel" },
] as const;

export const mission = [
  {
    title: "Specialization",
    body: "Provide a focused range of high-quality switchgear products that meet international safety standards.",
  },
  {
    title: "Reliability",
    body: "Ensure quick availability and on-time delivery for every project, big or small.",
  },
  {
    title: "Partnership",
    body: "Support contractors, consultants, and industries with expert product selection and after-sales service.",
  },
  {
    title: "Growth",
    body: "Uphold the 28-year Safeway legacy by continuously raising the bar on quality and service.",
  },
];

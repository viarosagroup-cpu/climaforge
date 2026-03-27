export const upgradeOptionPrices = {
  finishes: { standard: 0, premium: 3000, luxury: 8000 },
  colors: { neutral: 0, warm: 500, cool: 500, bold: 1000 },
  layout: { default: 0, extended: 5000, compact: -2000 },
  upgrades: {
    'Solar panels': 4500,
    'Smart home package': 3200,
    'Premium appliances': 2800,
    'Extended deck': 2200,
    'Off-grid water system': 5500,
    'Ducted air conditioning': 3800,
  },
};

export function calcOrderTotal(basePrice, config) {
  let total = basePrice;
  total += upgradeOptionPrices.finishes[config.finishes] ?? 0;
  total += upgradeOptionPrices.colors[config.colors] ?? 0;
  total += upgradeOptionPrices.layout[config.layout] ?? 0;
  (config.upgrades || []).forEach(u => { total += upgradeOptionPrices.upgrades[u] ?? 0; });
  return total;
}

export const models = [
  { 
    id: 1, 
    name: "The Veranda", 
    desc: "A modern modular home with a covered front porch, practical layout, and strong everyday appeal. Designed to be easy to sell and easy to live in.", 
    basePrice: 39900,
    price: "From $39,900", 
    img: "/images/veranda.jpg",
    floorplan: "/photo-dump/1-bedroom.png",
    installationVideo: "/photo-dump/20FT container house installation video.mp4",
    elevationDrawing: "/photo-dump/20FT Elevation Drawing.pdf",
    details: "The Veranda is our signature design. It features a welcoming covered porch, open-plan living spaces, and flexible bedroom configurations.",
    specs: ["3 bedrooms", "2 bathrooms", "Kitchen & dining area", "Living room", "Covered porch"],
    customizations: ["Interior finishes", "Color palette", "Layout adjustments", "Fixture upgrades"]
  },
  { 
    id: 2, 
    name: "The Haven", 
    desc: "A lighter, more residential version with a relaxed feel. Clean lines, simple materials, and a softer look that suits lifestyle buyers.", 
    basePrice: 42500,
    price: "From $42,500", 
    img: "/images/haven.jpg",
    floorplan: "/photo-dump/2-bedroom.png",
    details: "The Haven brings a residential, family-focused approach to modular living. Perfect for those wanting comfort and practicality.",
    specs: ["3-4 bedrooms", "2 bathrooms", "Spacious living areas", "Modern kitchen", "Multiple outdoor spaces"],
    customizations: ["Material selection", "Space reconfiguration", "Finishes package", "Outdoor options"]
  },
  { 
    id: 3, 
    name: "The Veranda Lite", 
    desc: "A more affordable take on the Veranda. Keeps the same core layout but simplifies finishes to hit a lower price point without losing usability.", 
    basePrice: 34900,
    price: "From $34,900", 
    img: "/images/veranda-lite.jpg",
    details: "The Veranda Lite delivers the Veranda's proven design with simplified finishes for maximum value. No compromises on usability.",
    specs: ["3 bedrooms", "2 bathrooms", "Kitchen & dining", "Living room", "Practical layout"],
    customizations: ["Finish upgrades", "Interior paint", "Fixture options"]
  },
  { 
    id: 4, 
    name: "The Peak", 
    desc: "A more architectural design with an angled roof and stronger visual presence. Feels more premium while still being practical to build.", 
    basePrice: 49900,
    price: "From $49,900", 
    img: "/images/peak.jpg",
    details: "The Peak makes a statement with its distinctive architecture. Premium materials and finish options elevate the entire experience.",
    specs: ["3-4 bedrooms", "2-3 bathrooms", "Vaulted ceilings", "Premium kitchen", "Architectural features"],
    customizations: ["Premium finishes", "Custom colors", "High-end fixtures", "Extended features"]
  },
  { 
    id: 5, 
    name: "The Flatline", 
    desc: "A simple, efficient box design focused on cost, speed, and scalability. Ideal for budget buyers, developers, or bulk installs.", 
    basePrice: 18900,
    price: "From $18,900", 
    img: "/images/flatline.jpg",
    details: "The Flatline is all efficiency. Streamlined design, quick build times, and maximum affordability—perfect for cost-conscious buyers.",
    specs: ["1-2 bedrooms", "1 bathroom", "Compact kitchen", "Living area", "Quick build"],
    customizations: ["Basic upgrades", "Paint colors", "Simple fixtures"]
  },
  { 
    id: 6, 
    name: "The Duo", 
    desc: "An extended layout that feels larger without overcomplicating the build. Better flow, more space, and suited for longer stays or dual use.", 
    basePrice: 54900,
    price: "From $54,900", 
    img: "/images/duo.jpg",
    details: "The Duo offers generous space and flow for extended living or dual-unit configurations. Maximum comfort and flexibility.",
    specs: ["4 bedrooms", "2-3 bathrooms", "Large living spaces", "Modern kitchen", "Flexible zones"],
    customizations: ["Zone customization", "Material upgrades", "Layout reconfiguration", "Premium finish packages"]
  }
];

export const testimonials = [
  {
    quote: "Climaforge delivered exactly what they promised, a beautiful, well built home in timely manner. The quality is outstanding.",
    name: "Sarah Thompson",
    location: "Gold Coast, QLD"
  },
  {
    quote: "The attention to detail and modern design exceeded our expectations. Our son loves the open layout and own privacy.",
    name: "Michael Chen",
    location: "Ocean Shores, NSW"
  },
  {
    quote: "From enquiry to delivery, the process was smooth and professional. Highly recommend for anyone wanting a premium modular home.",
    name: "Emma Richardson",
    location: "Sunshine Coast, QLD"
  },
  {
    quote: "We love the design and it feels modern without being overdone.",
    name: "Sam Green",
    location: "Logan, QLD"
  },
  {
    quote: "Much more realistic than a traditional build for us right now.",
    name: "Pasquale",
    location: "Gawler, SA"
  },
  {
    quote: "Exactly the kind of clean, practical design we have been looking for.",
    name: "Tony Sabalinko",
    location: "Two Wells, SA"
  }
];

export const processSteps = [
  "Choose your model",
  "Customise layout and finishes",
  "We manufacture your home",
  "Delivered to your door",
];

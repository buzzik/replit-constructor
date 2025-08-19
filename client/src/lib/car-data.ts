import { CarModel, ConfigurationSection } from "@shared/schema";

export const carModels: CarModel[] = [
  {
    id: "tesla-model-3",
    name: "Tesla Model 3",
    basePrice: 45000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Starting at $45,000"
  },
  {
    id: "tesla-model-y",
    name: "Tesla Model Y",
    basePrice: 52000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Starting at $52,000"
  },
  {
    id: "bmw-i4",
    name: "BMW i4",
    basePrice: 56000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Starting at $56,000"
  },
  {
    id: "audi-etron",
    name: "Audi e-tron",
    basePrice: 65000,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Starting at $65,000"
  },
  {
    id: "mercedes-eqs",
    name: "Mercedes EQS",
    basePrice: 75000,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Starting at $75,000"
  }
];

export const configurationSections: ConfigurationSection[] = [
  {
    id: "color",
    name: "Color",
    icon: "fas fa-palette",
    options: [
      { id: "white", name: "Pearl White", description: "Standard paint", price: 0, isDefault: true },
      { id: "black", name: "Solid Black", description: "Premium paint", price: 1000 },
      { id: "red", name: "Red Multi-Coat", description: "Premium paint", price: 2000 },
      { id: "blue", name: "Deep Blue Metallic", description: "Premium paint", price: 1500 },
      { id: "silver", name: "Midnight Silver", description: "Metallic paint", price: 500 }
    ]
  },
  {
    id: "battery",
    name: "Battery",
    icon: "fas fa-battery-full",
    options: [
      { id: "standard", name: "Standard Range", description: "272 miles EPA est. range", price: 0, isDefault: true },
      { id: "long-range", name: "Long Range", description: "358 miles EPA est. range", price: 10000 },
      { id: "performance", name: "Performance", description: "315 miles EPA est. range, 3.1s 0-60 mph", price: 15000 }
    ]
  },
  {
    id: "software",
    name: "Software",
    icon: "fas fa-microchip",
    options: [
      { id: "basic", name: "Basic Package", description: "Standard features and connectivity", price: 0, isDefault: true },
      { id: "premium", name: "Premium Connectivity", description: "Streaming, live traffic, satellite maps", price: 3000 },
      { id: "autopilot", name: "Full Self-Driving", description: "Advanced autopilot and self-driving features", price: 8000 }
    ]
  },
  {
    id: "hardware",
    name: "Hardware",
    icon: "fas fa-tools",
    options: [
      { id: "standard", name: "Standard Package", description: "Basic hardware configuration", price: 0, isDefault: true },
      { id: "sport", name: "Sport Package", description: "Enhanced suspension and braking", price: 2500 },
      { id: "luxury", name: "Luxury Package", description: "Premium hardware and components", price: 5000 }
    ]
  },
  {
    id: "interior",
    name: "Interior",
    icon: "fas fa-couch",
    options: [
      { id: "cloth", name: "Premium Cloth", description: "High-quality fabric seats", price: 0, isDefault: true },
      { id: "leather", name: "Synthetic Leather", description: "Durable synthetic leather seats", price: 1500 },
      { id: "premium-leather", name: "Premium Leather", description: "Luxury leather with heated seats", price: 3000 }
    ]
  },
  {
    id: "wheels",
    name: "Wheels",
    icon: "fas fa-circle",
    options: [
      { id: "18", name: "18\" Aero Wheels", description: "Standard efficiency wheels", price: 0, isDefault: true },
      { id: "19", name: "19\" Sport Wheels", description: "Enhanced performance wheels", price: 1500 },
      { id: "20", name: "20\" Performance", description: "High-performance wheels", price: 2500 },
      { id: "21", name: "21\" Turbine", description: "Premium design wheels", price: 4000 }
    ]
  }
];

export const getDefaultConfiguration = () => {
  const config: Record<string, string> = {};
  configurationSections.forEach(section => {
    const defaultOption = section.options.find(opt => opt.isDefault) || section.options[0];
    config[section.id] = defaultOption.id;
  });
  return config;
};

export const getOptionPrice = (sectionId: string, optionId: string): number => {
  const section = configurationSections.find(s => s.id === sectionId);
  const option = section?.options.find(o => o.id === optionId);
  return option?.price || 0;
};

export const getOptionDetails = (sectionId: string, optionId: string) => {
  const section = configurationSections.find(s => s.id === sectionId);
  const option = section?.options.find(o => o.id === optionId);
  return option;
};

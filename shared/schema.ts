import { z } from "zod";

export const carConfigurationSchema = z.object({
  carModel: z.string(),
  color: z.string(),
  battery: z.string(),
  software: z.string(),
  hardware: z.string(),
  interior: z.string(),
  wheels: z.string(),
});

export const quoteSchema = z.object({
  configuration: carConfigurationSchema,
  basePrice: z.number(),
  optionsPricing: z.record(z.number()),
  totalPrice: z.number(),
  customerInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  }).optional(),
});

export type CarConfiguration = z.infer<typeof carConfigurationSchema>;
export type Quote = z.infer<typeof quoteSchema>;

export interface CarModel {
  id: string;
  name: string;
  basePrice: number;
  image: string;
  description: string;
}

export interface ConfigurationOption {
  id: string;
  name: string;
  description: string;
  price: number;
  isDefault?: boolean;
}

export interface ConfigurationSection {
  id: string;
  name: string;
  icon: string;
  options: ConfigurationOption[];
}

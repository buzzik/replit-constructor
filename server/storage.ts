import { CarConfiguration, Quote } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for car configurator data
export interface IStorage {
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: Omit<Quote, 'id'>): Promise<Quote>;
  getQuotes(): Promise<Quote[]>;
}

export class MemStorage implements IStorage {
  private quotes: Map<string, Quote>;

  constructor() {
    this.quotes = new Map();
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(quoteData: Omit<Quote, 'id'>): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote & { id: string } = { ...quoteData, id };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }
}

export const storage = new MemStorage();

export type QuoteCategory = 
  | 'Philosophers' 
  | 'Islamic' 
  | 'Success' 
  | 'Life Advice' 
  | 'Love' 
  | 'Patience' 
  | 'Knowledge' 
  | 'Happiness' 
  | 'Poets' 
  | 'Leaders';

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
}

export type ColorTheme = 'green' | 'blue' | 'purple' | 'crimson';

export interface AppSettings {
  theme: 'light' | 'dark';
  colorTheme: ColorTheme;
  fontSize: number;
}

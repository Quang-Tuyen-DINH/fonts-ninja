export interface Price {
  formatedPrice: string;
  amount: number;
  currency: string;
}

export interface Foundry {
  id: string;
  name: string;
  totalFamilies: number;
}

export interface FontImagesVariant {
  svg: string;
  width: number;
  height: number;
}

export interface FontImages {
  alphabet: FontImagesVariant;
  pangram?: FontImagesVariant;
}

export interface FontFamily {
  idFont: number | string;
  url: string;
  price: Price | null;
  idFamily: string;
  name: string;
  totalFonts: number;
  foundry: Foundry;
  images: {
    alphabet: FontImagesVariant;
    pangram?: FontImagesVariant;
  };
}

export interface FamiliesPagePayload {
  families: FontFamily[];
  totalFamilies?: number;
}

export type FamilyDetailsPayload = FontFamily;
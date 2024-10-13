export type Vertical = "fashion" | "home" | "general";

export enum Locale {
  EN_US = "en_US",
  EN_GB = "en_GB",
  EN_CA = "en_CA",
  ES_ES = "es_ES",
  ES_MX = "es_MX",
  FR_FR = "fr_FR",
  FR_CA = "fr_CA",
  DE_DE = "de_DE",
  ZH_CN = "zh_CN",
  JA_JP = "ja_JP",
}
export interface Catalog {
  _id: string;
  name: string;
  vertical: Vertical;
  isPrimary: boolean;
  locales: Locale[];
  indexedAt: string;
}

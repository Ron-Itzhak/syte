import { Catalog, Locale } from "../app/catalogs/types";

export const mockCatalogs: Catalog[] = [
  {
    _id: "1",
    name: "FashionCatalogUS",
    vertical: "fashion",
    isPrimary: true,
    locales: ["en_US" as Locale, "es_ES" as Locale],
    indexedAt: "2024-09-20T10:30:00Z",
  },
  {
    _id: "2",
    name: "HomeCatalogCA",
    vertical: "home",
    isPrimary: true,
    locales: ["en_CA" as Locale, "fr_CA" as Locale],
    indexedAt: "2024-08-15T14:45:00Z",
  },
  {
    _id: "3",
    name: "GeneralCatalogGlobal",
    vertical: "general",
    isPrimary: true,
    locales: ["en_US" as Locale, "es_ES" as Locale, "fr_FR" as Locale],
    indexedAt: "2024-10-05T08:20:00Z",
  },
  {
    _id: "4",
    name: "FashionCatalogEU",
    vertical: "fashion",
    isPrimary: false,
    locales: ["en_GB" as Locale, "fr_FR" as Locale, "de_DE" as Locale],
    indexedAt: "2024-07-10T12:00:00Z",
  },
  {
    _id: "5",
    name: "HomeCatalogUS",
    vertical: "home",
    isPrimary: false,
    locales: ["en_US" as Locale, "es_ES" as Locale],
    indexedAt: "2024-09-30T09:50:00Z",
  },
];

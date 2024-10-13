db = db.getSiblingDB("syte");

db.createCollection("catalogs");
db.catalogs.insertMany([
  {
    name: "FashionCatalogUS",
    vertical: "fashion",
    isPrimary: true,
    locales: ["en_US"],
    indexedAt: "2024-09-20T10:30:00Z",
  },
  {
    name: "HomeCatalogCA",
    vertical: "home",
    isPrimary: true,
    locales: ["en_CA", "fr_CA"],
    indexedAt: "2024-08-15T14:45:00Z",
  },
  {
    name: "GeneralCatalogGlobal",
    vertical: "general",
    isPrimary: true,
    locales: ["en_US", "es_ES", "fr_FR"],
    indexedAt: "2024-10-05T08:20:00Z",
  },
  {
    name: "FashionCatalogEU",
    vertical: "fashion",
    isPrimary: false,
    locales: ["en_GB", "fr_FR", "de_DE"],
    indexedAt: "2024-07-10T12:00:00Z",
  },
  {
    name: "HomeCatalogUS",
    vertical: "home",
    isPrimary: false,
    locales: ["en_US", "es_ES"],
    indexedAt: "2024-09-30T09:50:00Z",
  },
]);

db.catalogs.createIndex({ vertical: 1, isPrimary: 1 });

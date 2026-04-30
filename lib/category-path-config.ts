/** Pathnames shared by middleware and category routes — IDs must exist in SERVICE_CATEGORIES. */
export type CategoryPathRow = {
  categoryId: string;
  slugEs: string;
  slugCa: string;
  slugEn: string;
};

export const CATEGORY_PATH_ROWS: CategoryPathRow[] = [
  { categoryId: "obra-nueva", slugEs: "obra-nueva", slugCa: "obra-nova", slugEn: "new-build" },
  {
    categoryId: "reformas-integrales",
    slugEs: "reformas-integrales",
    slugCa: "reformes-integrals",
    slugEn: "full-renovations",
  },
  {
    categoryId: "fachadas-estructuras",
    slugEs: "fachadas-estructuras",
    slugCa: "facanes-i-estructures",
    slugEn: "facades-and-structures",
  },
  {
    categoryId: "instalaciones",
    slugEs: "instalaciones",
    slugCa: "instalacions",
    slugEn: "installations",
  },
  {
    categoryId: "acabados-interiores",
    slugEs: "acabados-interiores",
    slugCa: "acabats-interiors",
    slugEn: "interior-finishes",
  },
  {
    categoryId: "banos-cocinas",
    slugEs: "banos-cocinas",
    slugCa: "banys-i-cuines",
    slugEn: "bathrooms-and-kitchens",
  },
  {
    categoryId: "urbanizacion-exterior",
    slugEs: "urbanizacion-exterior",
    slugCa: "urbanitzacio-exterior",
    slugEn: "outdoor-works",
  },
  {
    categoryId: "obras-civiles",
    slugEs: "obras-civiles",
    slugCa: "obres-civils",
    slugEn: "civil-works",
  },
  {
    categoryId: "hormigonado-estructuras",
    slugEs: "hormigonado-y-estructuras",
    slugCa: "formigonat-i-estructures",
    slugEn: "concrete-work-and-structures",
  },
  {
    categoryId: "construccion-piscinas",
    slugEs: "construccion-de-piscinas",
    slugCa: "construccio-de-piscines",
    slugEn: "swimming-pool-construction",
  },
  {
    categoryId: "demolicion-derribo",
    slugEs: "demolicion-y-derribo",
    slugCa: "demolicio-i-enderroc",
    slugEn: "demolition",
  },
];

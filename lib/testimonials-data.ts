export type Testimonial = {
  name: string;
  location: string;
  text: string;
  service: string;
};

// These reviews are intentionally static and language-fixed.
// They do NOT change when the UI language changes - each review
// stays in the language the client originally wrote it in.
export const TESTIMONIALS: Testimonial[] = [
  // ── Spanish reviews ──────────────────────────────────────────────
  {
    name: "María García",
    location: "Barcelona",
    text: "Reformaron nuestro piso en tiempo récord y con una calidad impecable. El precio fue el mejor que encontramos en el mercado. ¡Totalmente recomendados!",
    service: "Reforma integral de piso",
  },
  {
    name: "Carlos Martínez",
    location: "Sabadell",
    text: "Construyeron nuestra vivienda unifamiliar con un seguimiento personalizado en cada etapa. Profesionales de verdad y cumplen lo que prometen.",
    service: "Construcción de vivienda unifamiliar",
  },
  {
    name: "Jordi Sánchez",
    location: "Barcelona",
    text: "Reformamos nuestro restaurante en el Eixample con ellos y el resultado superó todas las expectativas. Entregaron en plazo, sin sorpresas en el presupuesto y con unos acabados de primer nivel. Nuestros clientes lo notan.",
    service: "Reforma de local gastronómico",
  },
  {
    name: "Elena Romero",
    location: "Badalona",
    text: "Contratamos ObraDirecta para la reforma completa de nuestro gimnasio. Gestionaron todo: demolición, instalaciones, suelos técnicos y vestuarios. Ahora tenemos un espacio moderno y funcional que encanta a nuestros socios.",
    service: "Reforma integral de gimnasio",
  },
  {
    name: "Miguel Torres",
    location: "L'Hospitalet de Llobregat",
    text: "Construyeron desde cero nuestro local comercial en tiempo récord. El equipo coordinó perfectamente todas las fases y nos dejaron el espacio listo para abrir en el plazo acordado.",
    service: "Construcción de local comercial",
  },
  // ── Catalan reviews ───────────────────────────────────────────────
  {
    name: "Anna Puig",
    location: "L'Hospitalet",
    text: "Van rehabilitar la façana del nostre edifici en menys temps del previst. Tracte excel·lent i resultat fantàstic. Repetiria sense cap dubte.",
    service: "Rehabilitació de façana",
  },
  {
    name: "Pere Mas",
    location: "Terrassa",
    text: "Van fer la reforma integral del nostre local comercial al centre de Terrassa. Professionalitat total des del primer dia: pressupost clar, terminis complerts i qualitat impecable als acabats.",
    service: "Reforma integral de local comercial",
  },
  {
    name: "Marta Ribas",
    location: "Barcelona",
    text: "Vam renovar completament el bany i la cuina del pis i el canvi és espectacular. Molt endreçats durant tota l'obra i el preu va ser molt competitiu. Els recomanaria a tothom.",
    service: "Reforma de bany i cuina",
  },
  {
    name: "Joan Ferrer",
    location: "Gràcia, Barcelona",
    text: "Van adaptar les nostres oficines a l'estàndard actual: nova distribució, instal·lació elèctrica, climatització i acabats moderns. Tot en dues setmanes sense aturar l'activitat. Impressionant.",
    service: "Reforma d'oficines",
  },
  // ── English reviews ───────────────────────────────────────────────
  {
    name: "James Mitchell",
    location: "Barcelona",
    text: "We hired ObraDirecta to fully renovate our flat in the Gràcia neighbourhood. From the first visit to the final handover, everything was transparent and professional. The quality of the finishes is exceptional.",
    service: "Full flat renovation",
  },
  {
    name: "Sarah Williams",
    location: "Barcelona",
    text: "We opened a wine bar in Poble Sec and ObraDirecta handled the entire fit-out - structural work, kitchen installations, lighting and interior finishes. They delivered on time and on budget. Couldn't be happier.",
    service: "Commercial fit-out",
  },
  {
    name: "David Clarke",
    location: "Sitges",
    text: "Building our family home in Sitges with ObraDirecta was a smooth experience from start to finish. Clear communication, no hidden costs and a beautiful end result. Highly recommend them for any big project.",
    service: "Single-family home construction",
  },
];

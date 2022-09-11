import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "p51vax20",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "sk74zbN7Rrd5sFqJ2mleyjLUrBrBEflNXzVfLOfTus08bbECT5bjBVtRgBFYt8Mpes5FCs2XsH4NyfrEBHiNY69SHH6LqytQKxtqbDb5AMJRryrNPr2XJByM16KSkvH0s6vgJJl9gfNMSi080FMQhGCSWbkpdrCY2C9t6GdhUkYIL1Rs15Kz",
  useCdn: false,
});

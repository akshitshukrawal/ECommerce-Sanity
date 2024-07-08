import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'nt9majwq',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: 'skhrQhfzLKBKShW9MsEFiS9jJuJaDX0HeNpjHBIzGFHphhAo6qMcoFTZJ0cSlIaYXEpRA9axckNdg41UF9lyOiLdySWWoGzFGLl5qhJsDwl3EvFDt8AJOdAGbLIeyGV2PLPDteyPa80N3e3sncuX6XUn3Zouy9XcqHb7DPS2Ct4HGgGZpQ86'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);


//SANITY_TOKEN_ID="skAKjsn2xhsdgt319YbloNxXbO93y5GA5d1pqe7nIOGVWCOeFusohFMH6Jv2wmRXtZgBpT3azwgaI1HWRgnhKAyLj7se6Q7NUuCyNTVqS8XTruGRvkOL08TzROe5pM2JB1dWZPPY70zLdMImhtQBCAtd4vi8O3gmcPIS3v5JtOjKgPeZ4FRH"
// SANITY_PROJECT_ID="nt9majwq"
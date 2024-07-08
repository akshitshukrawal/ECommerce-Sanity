import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId : 'nt9majwq',
    dataset:'production',
    apiVersion:'2022-03-10',
    useCdn:true,
    token:'skhrQhfzLKBKShW9MsEFiS9jJuJaDX0HeNpjHBIzGFHphhAo6qMcoFTZJ0cSlIaYXEpRA9axckNdg41UF9lyOiLdySWWoGzFGLl5qhJsDwl3EvFDt8AJOdAGbLIeyGV2PLPDteyPa80N3e3sncuX6XUn3Zouy9XcqHb7DPS2Ct4HGgGZpQ86'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
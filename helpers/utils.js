export const myLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality || 75}`;

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const getFirstName = name => name.split(' ')[0];

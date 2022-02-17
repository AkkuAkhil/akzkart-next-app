export const myLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality || 75}`;

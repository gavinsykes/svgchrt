const isObject: (o: unknown) => boolean = (o) =>
  o && typeof o === 'object' && !Array.isArray(o);

export default isObject;

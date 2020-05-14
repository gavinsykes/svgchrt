const isObject: (o: any) => boolean = function(o) {
  return o && typeof o === "object" && !Array.isArray(o);
}

export default isObject;

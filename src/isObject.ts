const isObject: (o: any) => boolean = o => o && typeof o === "object" && !Array.isArray(o);

export default isObject;

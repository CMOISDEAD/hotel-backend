export const parseBoolean = (value: string | boolean): boolean => {
  if (typeof value === "boolean") return value;
  return value.toLowerCase() === "true";
};

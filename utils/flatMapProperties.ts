import { PropertyWithChildren } from "@/types/property";

export const flatMapProperties = (properties: PropertyWithChildren[]) => {
  if (!properties) return [];

  return properties.flatMap((property: PropertyWithChildren) => {
    const result: PropertyWithChildren[] = [property];

    if (property.children) {
      let current = property.children;
      while (current) {
        result.push(current);
        current = current.children!;
      }
    }

    return result;
  });
};
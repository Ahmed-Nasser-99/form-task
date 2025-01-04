import { PropertyWithOptionIds } from "@/types/option";
import { Property, PropertyWithChildren } from "@/types/property";

interface HandleFetchChildPropertyProps {
  data: Property[];
  selectedProperties: PropertyWithChildren[];
  tempSelectedPropertyWithChildOption: PropertyWithOptionIds | null;
  setSelectedProperties: (value: PropertyWithChildren[]) => void;
  setValue: (name: string, value: null | string) => void;
}

export const handleFetchChildProperty = ({
  data,
  selectedProperties,
  tempSelectedPropertyWithChildOption,
  setSelectedProperties,
  setValue,
}: HandleFetchChildPropertyProps) => {
  data?.map((item: Property) => {
    const result = findPropertyInArray(
      selectedProperties,
      Number(tempSelectedPropertyWithChildOption?.propertyId)
    );
    console.log(result);

    if (result) {
      // reset the value of the child property
      setValue(item?.name, null);

      const newProperties = [...selectedProperties];
      if ("parentIndex" in result && result.parentIndex !== undefined) {
        // Update child property
        newProperties[result.parentIndex].children = {
          ...(newProperties[result.parentIndex].children || {}),
          children: item,
        } as PropertyWithChildren;
      } else {
        // Update main property
        newProperties[result.index] = {
          ...newProperties[result.index],
          children: item,
        };
      }

      setSelectedProperties(newProperties);
    }
  });
};

// Helper function to find property in array including children
const findPropertyInArray = (
  properties: PropertyWithChildren[],
  targetId: number
) => {
  for (let i = 0; i < properties.length; i++) {
    if (properties[i].id === targetId) {
      return { property: properties[i], index: i };
    }
    if (properties[i].children && properties[i].children?.id === targetId) {
      return { property: properties[i].children, parentIndex: i };
    }
  }
  return null;
};

export type Option = {
  id: number | string;
  name: string;
  slug: string;
  parent: number | null;
  child: boolean;
};

export type PropertyWithOptionIds = {
  propertyId: number | string;
  optionId: number | string;
};


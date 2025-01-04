import { Option } from "./option";

export type Property = {
  id: number;
  name: string;
  options: Option[];
  other_value: string | null;
  value: string;
  parent: number | null;
  list: boolean;
  type: string | null;
  description: string | null;
  slug: string;
};

export type PropertyWithChildren = Property & { children?: PropertyWithChildren };



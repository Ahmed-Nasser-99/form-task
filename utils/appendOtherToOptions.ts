import { Option } from "@/types/option";

export const appendOtherInOptions = (options: Option[]) => {
  return [
    ...options,
    {
      id: "OTHER",
      name: "Other",
      slug: "other",
      parent: null,
      child: false,
    },
  ];
};
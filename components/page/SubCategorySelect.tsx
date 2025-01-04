import React from "react";
import Field from "../Field";
import { Control, Controller, FieldErrors } from "react-hook-form";
import StyledReactSelect from "../StyledReactSelect";
import { Category } from "@/types/category";

interface SubCategorySelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  category: {
    value: Category;
    label: string;
  };
}

const SubCategorySelect = ({
  control,
  errors,
  category,
}: SubCategorySelectProps) => {
  const subCategoryOptions = category?.value?.children?.map(
    (subCategory: Category) => ({
      value: subCategory,
      label: subCategory.name,
    })
  );
  return (
    <Field label="Sub Category" error={errors.subCategory}>
      <Controller
        control={control}
        name="subCategory"
        rules={{
          required: {
            message: "Sub Category is required",
            value: true,
          },
        }}
        render={({ field }) => (
          <StyledReactSelect
            options={subCategoryOptions}
            placeholder="Select a sub category"
            isDisabled={!category}
            isError={!!errors.subCategory}
            {...field}
          />
        )}
      />
    </Field>
  );
};

export default SubCategorySelect;

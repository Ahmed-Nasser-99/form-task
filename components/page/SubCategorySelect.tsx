import React from "react";
import Field from "../Field";
import { Control, Controller, FieldErrors } from "react-hook-form";
import StyledReactSelect from "../StyledReactSelect";
import { Category } from "@/types/category";
import { resetAllValuesExcept } from "@/utils/resetAllValuesExcept";

interface SubCategorySelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  category: {
    value: Category;
    label: string;
  };
  setValue: (name: string, value: any) => void;
  getValues: () => any;
}

const SubCategorySelect = ({
  control,
  errors,
  category,
  setValue,
  getValues,
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
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              // reset sub category on change the category
              resetAllValuesExcept({
                values: getValues(),
                setValue,
                except: ["subCategory", "category"],
              });
            }}
          />
        )}
      />
    </Field>
  );
};

export default SubCategorySelect;

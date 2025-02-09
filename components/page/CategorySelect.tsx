import React from "react";
import Field from "../Field";
import { Control, Controller, FieldErrors } from "react-hook-form";
import StyledReactSelect from "../StyledReactSelect";
import { Category } from "@/types/category";
import { resetAllValuesExcept } from "@/utils/resetAllValuesExcept";

interface CategorySelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  setValue: (name: string, value: any) => void;
  categoryOptions: {
    value: Category;
    label: string;
  }[];
  categoriesLoading: boolean;
  getValues: () => any;
}

const CategorySelect = ({
  control,
  errors,
  setValue,
  categoryOptions,
  categoriesLoading,
  getValues,
}: CategorySelectProps) => {
  return (
    <Field label="Category" error={errors.category}>
      <Controller
        control={control}
        name="category"
        rules={{
          required: {
            message: "Category is required",
            value: true,
          },
        }}
        render={({ field }) => (
          <StyledReactSelect
            options={categoryOptions}
            isLoading={categoriesLoading}
            id="category"
            placeholder="Select a category"
            isError={!!errors.category}
            {...field}
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              // reset sub category on change the category
              resetAllValuesExcept({
                values: getValues(),
                setValue,
                except: ["category"],
              });
            }}
          />
        )}
      />
    </Field>
  );
};

export default CategorySelect;

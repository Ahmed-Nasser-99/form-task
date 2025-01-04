"use client";

import { fetchCategories } from "@/api/fetchCategories";
import { fetchProperties } from "@/api/fetchProperties";
import { fetchPropertyChild } from "@/api/fetchPropertyChild";
import Field from "@/components/Field";
import CategorySelect from "@/components/page/CategorySelect";
import SubCategorySelect from "@/components/page/SubCategorySelect";
import { Category } from "@/types/category";
import StyledReactSelect from "@/components/StyledReactSelect";
import { Option, PropertyWithOptionIds } from "@/types/option";
import { PropertyWithChildren } from "@/types/property";
import { appendOtherInOptions } from "@/utils/appendOtherToOptions";
import { flatMapProperties } from "@/utils/flatMapProperties";
import { handleFetchChildProperty } from "@/utils/handleFetchChild";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { SingleValue } from "react-select";
import Modal from "@/components/Modal";
import ResultsTable from "@/components/page/ResultsTable";

export default function Home() {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  const category = watch("category");
  const subCategory = watch("subCategory");

  const [
    tempSelectedPropertyWithChildOption,
    setTempSelectedPropertyWithChildOption,
  ] = useState<PropertyWithOptionIds | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<
    PropertyWithChildren[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading: propertiesLoading } = useQuery({
    queryKey: ["properties", subCategory?.value.id],
    queryFn: () => fetchProperties(subCategory?.value.id),
    enabled: !!subCategory,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setSelectedProperties(data);
    },
  });
  useQuery({
    queryKey: [
      tempSelectedPropertyWithChildOption?.optionId,
      tempSelectedPropertyWithChildOption?.propertyId,
    ],
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchPropertyChild(Number(tempSelectedPropertyWithChildOption?.optionId)),
    enabled: !!tempSelectedPropertyWithChildOption,
    onSuccess: (data) =>
      handleFetchChildProperty({
        data,
        selectedProperties,
        tempSelectedPropertyWithChildOption,
        setSelectedProperties,
        setValue,
      }),
  });
  const allPropertiesData = flatMapProperties(selectedProperties);

  const onSubmit = () => {
    console.log("submit");
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
  });
  const categoryOptions = categories?.categories?.map((category: Category) => ({
    value: category,
    label: category.name,
  }));
  if (categoriesLoading) return <div>Loading...</div>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <CategorySelect
        control={control}
        errors={errors}
        setValue={setValue}
        categoryOptions={categoryOptions}
        categoriesLoading={categoriesLoading}
      />
      <SubCategorySelect
        control={control}
        errors={errors}
        category={category}
      />
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <ResultsTable values={getValues()} />
      </Modal>
      {propertiesLoading ? (
        <div>Loading...</div>
      ) : subCategory ? (
        <div className="flex flex-col gap-4">
          {allPropertiesData?.map((property: PropertyWithChildren) => {
            return (
              <div key={property.id} className="flex flex-col gap-2">
                <Field label={property.name}>
                  <Controller
                    control={control}
                    name={property.name}
                    render={({ field }) => (
                      <StyledReactSelect
                        isError={!!errors[property.name]}
                        options={appendOtherInOptions(property.options).map(
                          (option: Option) => ({
                            value: option,
                            label: option?.name,
                          })
                        )}
                        {...field}
                        onChange={(selectedOption) => {
                          if (
                            (
                              selectedOption as SingleValue<{
                                label: string;
                                value: Option;
                              }>
                            )?.value?.child
                          ) {
                            // set the temp selected property with child option to trigger the query
                            setTempSelectedPropertyWithChildOption({
                              propertyId: property?.id,
                              optionId: selectedOption?.value?.id,
                            });
                          }
                          // trigger the field to rerender if the user select other
                          trigger(property.name);
                          field.onChange(selectedOption);
                        }}
                      />
                    )}
                  />
                </Field>

                {getValues(property.name)?.value?.id === "OTHER" && (
                  <Field error={errors[`${property.name}-other`]}>
                    <input
                      type="text"
                      placeholder="Enter other value"
                      {...register(`${property.name}-other`, {
                        required: {
                          message: "Other value is required",
                          value: true,
                        },
                      })}
                      className={`border rounded-md p-2 shadow-none outline-none ${
                        errors[`${property.name}-other`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </Field>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>Select a category and sub category</div>
      )}
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

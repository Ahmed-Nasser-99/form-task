import React from "react";
import ReactSelect, { Props } from "react-select";

interface StyledReactSelectProps<T> extends Props<T> {
  isError: boolean;
}

const StyledReactSelect = <T,>({
  isError,
  ...props
}: StyledReactSelectProps<T>) => {
  return (
    <ReactSelect<T, boolean>
      options={props.options}
      className="invalid:border-red-500"
      styles={{
        control: (base) => ({
          ...base,
          minWidth: "400px",
          boxShadow: "none",
          border: `1px solid ${isError ? "red" : "lightGray"}`,
        }),
      }}
      {...props}
    />
  );
};

export default StyledReactSelect;

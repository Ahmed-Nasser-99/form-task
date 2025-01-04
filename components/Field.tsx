import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface FieldProps {
  label?: React.ReactNode;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  children: React.ReactNode;
  isOptional?: boolean;
}

const Field = ({ label, error, children }: FieldProps) => {
  return (
    <label className="flex flex-col gap-0">
      {label && <div>{label}</div>}
      {children}
      {error && (
        <div className="text-red-500">{error?.message?.toString()}</div>
      )}
    </label>
  );
};

export default Field;

interface ResetAllValuesExceptProps {
  values: any;
  setValue: (name: string, value: any) => void;
  except: string[];
}

export const resetAllValuesExcept = ({
  values,
  setValue,
  except,
}: ResetAllValuesExceptProps) => {
  return Object.keys(values)
    .filter((key) => !except.includes(key))
    .forEach((key) => setValue(key, null));
};

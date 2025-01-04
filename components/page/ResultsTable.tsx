import { Option } from "@/types/option";
import React from "react";

interface ResultsTableProps {
  values: {
    [key: string]: {
      value: Option;
    };
  };
}

const ResultsTable = ({ values }: ResultsTableProps) => {
  console.log(values);
  return (
    <table className="w-full mt-10">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left border border-gray-200 p-2">Property</th>
          <th className="text-left border border-gray-200 p-2">Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(values).map(([key, value]) => {
          return (
            <tr key={key}>
              <td className="border border-gray-200 p-2">{key}</td>
              <td className="border border-gray-200 p-2">
                {value?.value?.name === "Other"
                  ? (values?.[`${key}-other`] as unknown as string)
                  : value?.value?.name ?? "-"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultsTable;

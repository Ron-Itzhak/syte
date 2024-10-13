import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultiSelectProps {
  field: ControllerRenderProps<any, any>;
  options: string[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ field, options }) => {
  const selectedValues = Array.isArray(field.value) ? field.value : [];

  const handleSelectChange = (value: string) => {
    if (selectedValues.includes(value)) {
      field.onChange(selectedValues.filter((item) => item !== value));
    } else {
      field.onChange([...selectedValues, value]);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select locales" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem
            key={item}
            value={item}
            onClick={() => handleSelectChange(item)}
            className="capitalize flex items-center"
          >
            {item}
            {selectedValues.includes(item) && <CheckIcon className="h-4 w-4" />}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MultiSelect;

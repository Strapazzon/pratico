import { Box, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useFormContext } from "react-hook-form";

type FieldInputType =
  | "date"
  | "datetime-local"
  | "email"
  | "hidden"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export interface FieldFormProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: FieldInputType;
  required?: string | boolean;
  validate?: (value: string) => string | boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  width?: "full" | "half" | "third" | "quarter";
}

export const FieldForm: React.FC<FieldFormProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  required,
  validate = () => true,
  onChange = () => {},
  width = "full",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[`${name}`]?.message;

  const getWidth = () => {
    switch (width) {
      case "full":
        return "100%";
      case "half":
        return "50%";
      case "third":
        return "33.33%";
      case "quarter":
        return "25%";
      default:
        return "100%";
    }
  };

  return (
    <Box
      width={{
        initial: "100%",
        xs: "100%",
        md: getWidth(),
      }}
      px="1"
    >
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>
      <TextField.Root
        radius="large"
        size="2"
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required,
          validate,
          onChange,
        })}
      />

      <Box height="0.5rem">
        <Text as="div" size="1" color="red" mt="1">
          {errorMessage?.toString() ?? ""}
        </Text>
      </Box>
    </Box>
  );
};

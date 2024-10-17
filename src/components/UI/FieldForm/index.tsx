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

interface FieldFormProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: FieldInputType;
  required?: boolean;
  validate?: (value: string) => string | boolean;
  errorMessage?: string;
}

export const FieldForm: React.FC<FieldFormProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  required,
  validate = () => true,
  errorMessage,
}) => {
  const { register } = useFormContext();
  return (
    <Box>
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>
      <TextField.Root
        radius="large"
        size="2"
        type={type}
        required={required}
        placeholder={placeholder}
        {...register(name, {
          required,
          validate,
        })}
      />
      {errorMessage && (
        <Text as="div" size="1" color="red" mt="1">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

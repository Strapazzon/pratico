import { Box, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Notes } from "../Notes";

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
  | "week"
  | "notes";

export interface FieldFormProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: FieldInputType;
  required?: string | boolean;
  validate?: (value: string) => string | boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  width?: "full" | "half" | "third" | "quarter" | "auto";
  hidden?: boolean;
}

export const FieldForm: React.FC<FieldFormProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  required,
  validate = () => true,
  onChange = () => {},
  width = "third",
  hidden,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (hidden) {
    return null;
  }

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
      case "auto":
        return "auto";
      default:
        return "100%";
    }
  };

  if (type === "notes") {
    return (
      <Controller
        {...register(name, {
          required,
          validate,
          onChange,
        })}
        render={({ field }) => (
          <Notes content={field.value} onChange={field.onChange} />
        )}
      />
    );
  }

  return (
    <Box
      width={{
        initial: "100%",
        xs: "100%",
        md: getWidth(),
      }}
      px="1"
      pb="3"
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

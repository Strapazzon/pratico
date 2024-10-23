import { Box, Text, TextField } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

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
  | "component";

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
  render?: (field: ControllerRenderProps<FieldValues, string>) => ReactElement;
  defaultValue?: string;
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
  render = () => <></>,
  defaultValue,
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

  if (type === "component") {
    return (
      <Controller
        {...register(name, {
          required,
          validate,
          onChange,
        })}
        render={({ field }) => {
          return render(field);
        }}
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
          value: defaultValue,
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

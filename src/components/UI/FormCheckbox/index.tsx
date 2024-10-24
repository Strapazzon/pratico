import { Checkbox, Flex, Text } from "@radix-ui/themes";
import React, { forwardRef } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type CheckboxProps = {
  control?: Control<FieldValues>;
  name: string;
  label?: string;
};

export const FormCheckbox = forwardRef<HTMLButtonElement | null, CheckboxProps>(
  ({ name, control, label }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Flex wrap="nowrap" gap="1" align="center">
            <Checkbox
              mr="2"
              checked={field.value}
              onClick={() => field.onChange(!field.value)}
              ref={ref}
            />
            <Text as="label" size="2">
              {label}
            </Text>
          </Flex>
        )}
      />
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

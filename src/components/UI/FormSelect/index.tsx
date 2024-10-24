import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

type SelectOption = {
  label: string;
  value: string;
};

interface FormSelectProps extends Select.RootProps {
  label?: string;
  options?: SelectOption[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, ...props }) => {
  return (
    <Flex direction="column">
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>
      <Select.Root {...props}>
        <Select.Trigger />
        <Select.Content>
          {props.options?.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

FormSelect.displayName = "FormSelect";

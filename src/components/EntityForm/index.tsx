"use client";
import React, { useEffect } from "react";
import { FieldFormProps, FieldForm } from "@components/UI/FieldForm";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Button, Flex, Heading, Spinner } from "@radix-ui/themes";
import { Save } from "lucide-react";
import { Responsive } from "@radix-ui/themes/props";
import styled from "styled-components";

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background);
  z-index: 20;
  gap: var(--space-2);
  padding: var(--space-2) 0;
`;

type EntityFormProps<E extends FieldValues> = {
  configFields: Record<keyof E, Omit<FieldFormProps, "name">>;
  onSubmit?: (data: E) => void;
  isLoading?: boolean;
  submitLabel?: string;
  submitIcon?: React.ReactElement;
  defaultValues?: E;
  formTitle?: string;
  formIcon?: React.ReactElement;
  saveButtonSize?: Responsive<"1" | "2" | "3" | "4">;
  headingInputName?: keyof E;
};

export const EntityForm = <E extends FieldValues>({
  onSubmit = () => {},
  configFields,
  isLoading,
  submitLabel,
  submitIcon = <Save size="24" />,
  defaultValues,
  formIcon,
  formTitle,
  saveButtonSize = "3",
}: EntityFormProps<E>): React.ReactElement => {
  const form = useForm<E>();
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Flex
      direction="column"
      mb="6"
      px={{
        initial: "2",
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column">
            <Header>
              <Flex gap="2">
                {formIcon}
                <Heading size="6">{formTitle}</Heading>
              </Flex>

              <Button
                variant="solid"
                type="submit"
                size={saveButtonSize}
                disabled={isLoading || !isDirty}
              >
                <Spinner loading={isLoading}>{submitIcon}</Spinner>
                {submitLabel}
              </Button>
            </Header>
            <Flex wrap="wrap">
              {Object.entries(configFields).map(([key, config]) => (
                <FieldForm key={key} {...config} name={key} />
              ))}
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </Flex>
  );
};

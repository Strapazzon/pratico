"use client";
import React, { useEffect } from "react";
import { FieldFormProps, FieldForm } from "@components/UI/FieldForm";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Button, Flex, Spinner } from "@radix-ui/themes";
import { Save } from "lucide-react";
import { Responsive } from "@radix-ui/themes/props";
import { PageHeader } from "@components/UI/PageHeader";

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
  hiddenHeader?: boolean;
  formFooterRender?: (form: UseFormReturn<E>) => React.ReactElement;
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
  hiddenHeader,
  formFooterRender = () => <></>,
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
            {hiddenHeader ? null : (
              <PageHeader icon={formIcon} title={formTitle}>
                <Button
                  variant="solid"
                  type="submit"
                  size={saveButtonSize}
                  disabled={isLoading || !isDirty}
                >
                  <Spinner loading={isLoading}>{submitIcon}</Spinner>
                  {submitLabel}
                </Button>
              </PageHeader>
            )}
            <Flex wrap="wrap">
              {Object.entries(configFields).map(([key, config]) => (
                <FieldForm key={key} {...config} name={key} />
              ))}
            </Flex>
            {formFooterRender(form)}
          </Flex>
        </form>
      </FormProvider>
    </Flex>
  );
};

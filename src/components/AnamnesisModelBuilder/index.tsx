import { DraggableItem } from "@components/UI/DraggableItem";
import { FieldForm } from "@components/UI/FieldForm";
import { FormCheckbox } from "@components/UI/FormCheckbox";
import { FormSelect } from "@components/UI/FormSelect";
import { InputTags } from "@components/UI/InputTags";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import { Flex, Text, Button, Heading } from "@radix-ui/themes";
import { GripVertical, Plus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
`;

const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--gray-5);
`;

type FormData = AnamnesisModelEntity & {
  id: number;
  questions: {
    id: number;
    question: string;
    type: string;
    options: string[];
    required: boolean;
    optionalText: boolean;
  }[];
};

export const AnamnesisModelBuilder = ({}) => {
  const t = useTranslations("anamnesisModelBuilder");
  const { register, control, watch } = useFormContext<FormData>();

  const formQuestions = watch("questions");

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Heading>{t("questions")}</Heading>
        {questions.map((question, index) => (
          <DraggableItem
            key={question.id}
            id={question.id}
            index={index}
            moveItem={moveQuestion}
          >
            <Flex>
              <Flex direction="column" gap="4">
                <GripVertical scale="3" />
              </Flex>
              <QuestionCard>
                <FieldForm
                  label={`${index + 1}`}
                  name={`questions.${index}.question`}
                  defaultValue={question.question}
                  width="full"
                />

                <Flex
                  gap="3"
                  direction={{
                    initial: "column",
                    sm: "row",
                  }}
                >
                  <Flex
                    direction="column"
                    width={{
                      initial: "100%",
                      sm: "20%",
                    }}
                  >
                    <Controller
                      {...register(`questions.${index}.type`)}
                      render={({ field }) => (
                        <FormSelect
                          label={t("type")}
                          options={[
                            { label: t("typeText"), value: "text" },
                            { label: t("typeNumber"), value: "number" },
                            { label: t("typeDate"), value: "date" },
                            { label: t("typeRadio"), value: "radio" },
                            { label: t("typeCheckBox"), value: "checkbox" },
                          ]}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </Flex>
                  <Controller
                    {...register(`questions.${index}.options` as const)}
                    render={({ field }) => (
                      <InputTags
                        label={t("options")}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={
                          formQuestions?.[index].type !== "radio" &&
                          formQuestions?.[index].type !== "checkbox"
                        }
                      />
                    )}
                  />
                </Flex>
                <Flex gap="3">
                  <FormCheckbox
                    label={t("mandatory")}
                    {...register(`questions.${index}.required` as const)}
                  />

                  <FormCheckbox
                    label={t("optionalText")}
                    {...register(`questions.${index}.optionalText` as const)}
                  />
                </Flex>

                <Flex gap="3" justify="center">
                  <Button
                    variant="ghost"
                    type="button"
                    size="2"
                    color="red"
                    onClick={() => removeQuestion(index)}
                  >
                    <Text as="div" size="2" weight="bold">
                      {t("delete")}
                    </Text>
                    <Trash size="16" />
                  </Button>
                </Flex>
              </QuestionCard>
            </Flex>
          </DraggableItem>
        ))}
        <Button
          variant="solid"
          type="button"
          size="2"
          onClick={() => appendQuestion({} as FormData["questions"][number])}
        >
          <Plus size="24" />
          {t("addQuestion")}
        </Button>
      </Wrapper>
    </DndProvider>
  );
};

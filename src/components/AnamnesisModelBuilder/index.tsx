import { DraggableItem } from "@components/UI/DraggableItem";
import { InputTags } from "@components/UI/InputTags";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import {
  Checkbox,
  Flex,
  TextField,
  Text,
  Button,
  Select,
  Heading,
} from "@radix-ui/themes";
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

export const AnamnesisModelBuilder: React.FC = ({}) => {
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
                <GripVertical />
              </Flex>
              <QuestionCard>
                <Flex gap="2">
                  <Flex
                    direction="column"
                    width={{
                      initial: "100%",
                    }}
                  >
                    <Text as="div" size="2" mb="1" weight="bold">
                      {index + 1}
                    </Text>
                    <TextField.Root
                      type="text"
                      {...register(`questions.${index}.question` as const)}
                      defaultValue={question.question}
                    />
                  </Flex>
                </Flex>
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
                    <Text as="div" size="2" mb="1" weight="bold">
                      {t("type")}
                    </Text>

                    <Controller
                      {...register(`questions.${index}.type`, {
                        value: question.type,
                      })}
                      render={({ field }) => (
                        <Select.Root
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Select.Trigger />
                          <Select.Content>
                            <Select.Item value="text">
                              {t("typeText")}
                            </Select.Item>
                            <Select.Item value="number">
                              {t("typeNumber")}
                            </Select.Item>
                            <Select.Item value="date">
                              {t("typeDate")}
                            </Select.Item>
                            <Select.Item value="radio">
                              {t("typeRadio")}
                            </Select.Item>
                            <Select.Item value="checkbox">
                              {t("typeCheckBox")}
                            </Select.Item>
                          </Select.Content>
                        </Select.Root>
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
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Controller
                        {...register(`questions.${index}.required` as const)}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onClick={() => field.onChange(!field.value)}
                          />
                        )}
                      ></Controller>
                      {t("mandatory")}
                    </Flex>
                  </Text>

                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Controller
                        {...register(
                          `questions.${index}.optionalText` as const
                        )}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onClick={() => field.onChange(!field.value)}
                          />
                        )}
                      ></Controller>
                      {t("optionalText")}
                    </Flex>
                  </Text>
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

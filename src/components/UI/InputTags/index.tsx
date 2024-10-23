import { X } from "lucide-react";
import { Flex, TextField, Text } from "@radix-ui/themes";
import React, {
  forwardRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";
import styled from "styled-components";

interface InputTagsProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
}

const Tag = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-1);
  align-items: center;
  padding: var(--space-1) var(--space-1) var(--space-1) var(--space-2);
  border-radius: var(--radius-5);
  background-color: var(--accent-4);
  height: 1rem;
  color: var(--accent-9);

  &.disabled {
    background-color: var(--gray-3);
    color: var(--gray-9);
  }

  button {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    padding: var(--space-1);
    border-radius: 50%;
    background-color: transparent;
    border: none;
    color: var(--accent-9);

    &[disabled] {
      cursor: not-allowed;
      color: var(--gray-6);

      &:hover {
        background-color: transparent;
      }
    }

    &:hover {
      background-color: var(--accent-5);
    }
  }
`;

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange = () => null, label, disabled }, ref) => {
    const [tags, setTags] = useState<string[]>(value?.split(",") ?? []);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault();
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    };

    const removeTag = (indexToRemove: number) => {
      setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
      if (tags.length === 0) {
        onChange(undefined);
      } else {
        onChange(tags.toString());
      }
    }, [onChange, tags]);

    return (
      <Flex direction="column" width="100%">
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
        <TextField.Root
          ref={ref}
          radius="large"
          size="2"
          value={inputValue}
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={disabled}
        >
          <TextField.Slot>
            {tags.map((tag, index) => (
              <Tag key={index} className={disabled ? "disabled" : "enabled"}>
                {tag}
                <button onClick={() => removeTag(index)} disabled={disabled}>
                  <X size="12" />
                </button>
              </Tag>
            ))}
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    );
  }
);

InputTags.displayName = "InputTags";

import { Flex } from "@radix-ui/themes";
import React from "react";

type FormRowProps = {
  children: React.ReactNode;
};

export const FormRow: React.FC<FormRowProps> = ({ children }) => {
  return (
    <Flex
      direction={{
        initial: "column",
        xs: "column",
        sm: "row",
      }}
      align={{
        initial: "start",
        xs: "start",
        sm: "center",
      }}
      mb="2"
    >
      {children}
    </Flex>
  );
};

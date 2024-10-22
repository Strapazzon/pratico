"use client";
import React from "react";
import { TextureBackground } from "@components/UI/TextureBackground";
import { Flex } from "@radix-ui/themes";
import { Construction } from "lucide-react";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  color: var(--accent-7);
`;

const ForgotPasswordPage: React.FC = () => {
  return (
    <Wrapper
      p="4"
      justify="center"
      align="center"
      height="100%"
      direction="column"
    >
      <TextureBackground />
      <Construction size="512" />
    </Wrapper>
  );
};

export default ForgotPasswordPage;

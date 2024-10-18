import React from "react";
import { TextureBackground } from "@components/UI/TextureBackground";
import { Flex } from "@radix-ui/themes";
import { Construction } from "lucide-react";
import "./styles.scss";

const ForgotPasswordPage: React.FC = () => {
  return (
    <Flex
      p="4"
      justify="center"
      align="center"
      height="100%"
      direction="column"
      className="forgot-password-page"
    >
      <TextureBackground />
      <Construction size="512" />
    </Flex>
  );
};

export default ForgotPasswordPage;

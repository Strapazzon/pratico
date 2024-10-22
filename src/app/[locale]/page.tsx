"use client";
import { Link } from "@i18n/routing";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { TextureBackground } from "@components/UI/TextureBackground";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  color: var(--accent-10);
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

export default function Home() {
  const t = useTranslations("home");
  return (
    <Flex direction="column" gap="1" height="100vh">
      <TextureBackground />
      <Header>
        <Heading mb="2" size="6">
          {t("appName")}
        </Heading>
        <Flex gap="3">
          <Button variant="outline" asChild>
            <Link href="/auth/register">{t("register")}</Link>
          </Button>
          <Button variant="solid" asChild>
            <Link href="/auth/login">{t("login")}</Link>
          </Button>
        </Flex>
      </Header>
      <Flex
        direction="column"
        gap="1"
        justify="center"
        align="center"
        height="100%"
        p={{ initial: "2", md: "4" }}
      >
        <Heading mb="2" size="6" color="gray">
          {t("title")}
        </Heading>
        <Text>{t("subtitle")}</Text>
      </Flex>
    </Flex>
  );
}
